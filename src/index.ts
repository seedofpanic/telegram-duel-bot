import {Game} from './game/game';
import {Combat} from './game/combat';
import {bot} from './game/bot';

const game = new Game();
let combatsCount = 0;
let combatsEnded = 0;

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
        player = game.addPlayer(chatId, msg.chat.username);
    }

    player.setCharacter(match[1]);

    if (player.currentCombat) {
        bot.sendMessage(chatId, 'Вы уже ожидаете противника, напишите /стоп для выхода из очереди');

        return;
    }

    if (game.combats.length === 0) {
        const combat = new Combat();

        game.combats.push(combat);
        player.currentCombat = combat;
        combat.addPlayer(player);
        bot.sendMessage(chatId, 'Ожидаем противника');
    } else {
        const combat: Combat = game.combats.shift();

        combatsCount++;
        combat.addPlayer(player);
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

bot.onText(/^\/act (.+)/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    const player = game.players[chatId];

    try {
        if (player.actions[match[1]].isAvailable()) {
            bot.sendMessage(chatId, 'Вы собрались ударить ' + match[1]);
        } else {
            bot.sendMessage(chatId, `Действие ${match[1]} сейчас не доступно`);

            return;
        }

        player.setAction(match[1]);

        if (player.currentCombat.allReady()) {
            player.currentCombat.perform();
            player.currentCombat.showResult();

            if (player.currentCombat.isEnded) {
                combatsEnded++;
            }
        } else {
            bot.sendMessage(chatId, 'ожидаем противника');
        }
    } catch (e) {
        console.log(e);
    }
});

bot.onText(/^\/start$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Приветствую на Арене! Пиши /готов и вступай в бой!');
});

bot.onText(/^\/инфо/, (msg) => {
    const chatId = msg.chat.id.toString();

    bot.sendMessage(chatId,
        `Боев сыграно ${combatsEnded} В данный момент идет ${combatsCount - combatsEnded} боев`);
});
