import {Game} from './game/game';
import {Combat} from './game/combat';
import {bot} from './game/bot';

const game = new Game();

bot.onText(/^\/готов\s*(.*)$/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    let player = game.getPlayer(chatId);

    if (!match[1]) {
        game.showCharacters(chatId);

        return;
    }

    if (!game.isAllowedCharacter(match[1])) {
        return;
    }

    if (!player) {
        player = game.addPlayer(chatId, match[1], msg.chat.username);
    }

    if (player.currentCombat) {
        bot.sendMessage(chatId, 'Вы уже ожидаете противника, напишите /стоп для выхода из очереди');

        return;
    }

    if (game.combats.length === 0) {
        const combat = new Combat();

        game.combats.push(combat);
        game.players[chatId] = player;
        player.currentCombat = combat;
        bot.sendMessage(chatId, 'Ожидаем противника');
    } else {
        const combat: Combat = game.combats.shift();

        combat.players[chatId] = player;
        player.currentCombat = combat;
        combat.start();
    }
});

bot.onText(/^\/стоп$/, (msg) => {
    const chatId = msg.chat.id.toString();
    const player = game.players[chatId];

    game.combats.splice(game.combats.indexOf(player.currentCombat), 1);
    player.currentCombat = undefined;

    bot.sendMessage(chatId, 'Вы покинули очередь');
});

bot.onText(/^\/ударить (.+)/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    const player = game.players[chatId];

    bot.sendMessage(chatId, 'Вы собрались ударить ' + match[1]);

    try {
        player.setAction(match[1]);

        if (player.currentCombat.allReady()) {
            player.currentCombat.perform();
            player.currentCombat.showResult();
        } else {
            bot.sendMessage(chatId, '\nожидаем противника');
        }
    } catch (e) {
        console.log(e);
    }
});

const infoTexts: any = {
    'ударить': {
        'рукой': 'рукой: усойчив, ногой: нормально',
        'ногой': 'рукой: не устойчив, ногой: нормально',
    }
};

bot.onText(/^\/инфо (.+)/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    const path = match[1].split(' ');

    if (path.length > 16) {
        return;
    }

    const result = path.reduce((res, sub) => {
        if (res) {
            return res[sub];
        } else {
            return undefined;
        }
    }, infoTexts);

    if (typeof result === 'string') {
        bot.sendMessage(chatId, result);
    }
});
