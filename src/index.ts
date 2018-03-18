import {Game} from './game/game';
import {Combat} from './game/combat';
import {bot} from './game/bot';

const game = new Game();

bot.onText(/^\/готов\s*(.*)$/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    const username = msg.chat.username;

    if (match[1]) {
        game.selectCharacter(chatId, match[1]);
    } else {
        game.startCombat(chatId, username);
    }
});

bot.onText(/^\/(invite|вызов)/, (msg) => {
    const chatId = msg.chat.id.toString();
    const username = msg.chat.username;

    game.startDuel(chatId, username, null);
});

bot.onText(/^\/стоп$/, (msg) => {
    const chatId = msg.chat.id.toString();
    const player = game.players[chatId];

    game.combatsQueue.splice(game.combatsQueue.indexOf(player.currentCombat), 1);
    player.currentCombat = undefined;

    bot.sendMessage(chatId, 'Вы покинули очередь');
});

bot.onText(/^\/act (.+)/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    const player = game.players[chatId];
    const combat = player.currentCombat;

    try {
        if (player.action) {
            bot.sendMessage(chatId, 'Действие уже выбрано');

            return;
        }

        if (player.actions[match[1]] && player.actions[match[1]].isAvailable()) {
            bot.sendMessage(chatId, 'Вы собрались ударить ' + match[1]);
        } else {
            bot.sendMessage(chatId, `Действие ${match[1]} сейчас не доступно`);

            return;
        }

        player.setAction(match[1]);

        if (combat.allReady()) {
            combat.perform();
            combat.showResult();

            if (combat.isEnded) {
                game.combatsEnded++;
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

bot.onText(/^\/start (.*?)$/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    const username = msg.chat.username;

    game.startDuel(chatId, username, match[1] || null);
});

bot.onText(/^\/инфо/, (msg) => {
    const chatId = msg.chat.id.toString();

    bot.sendMessage(chatId,
        `Боев сыграно ${game.combatsEnded} В данный момент идет ${game.combatsCount - game.combatsEnded} боев`);
});
