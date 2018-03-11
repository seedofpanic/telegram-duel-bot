import * as TelegramBot from 'node-telegram-bot-api';
import {Game} from './game/game';
import {Player} from './game/player';

export const bot = new TelegramBot(process.env['TOKEN'], {polling: true});

const games: Game[] = [];
const players: {[name: string]: Player} = {};

bot.onText(/^\/готов\s*(.*)$/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    let player = players[chatId];

    if (!match[1]) {
        Game.showCharacters(chatId);

        return;
    }

    if (!Game.isAllowedCharacter(match[1])) {
        return;
    }

    if (!player) {
        player = new Player(chatId, match[1], msg.chat.username);
        players[chatId] = player;
    }

    if (player.game) {
        bot.sendMessage(chatId, 'Вы уже ожидаете противника, напишите /стоп для выхода из очереди');

        return;
    }

    if (games.length === 0) {
        const game = new Game();

        games.push(game);
        game.players[chatId] = player;
        player.game = game;
        bot.sendMessage(chatId, 'Ожидаем противника');
    } else {
        const game: Game = games.shift();

        game.players[chatId] = player;
        player.game = game;
        game.start();
    }
});

bot.onText(/^\/стоп$/, (msg) => {
    const chatId = msg.chat.id.toString();
    let player = players[chatId];

    games.splice(games.indexOf(player.game), 1);
    player.game = null;

    bot.sendMessage(chatId, 'Вы покинули очередь');
});

bot.onText(/^\/ударить (.+)/, (msg, match) => {
    const chatId = msg.chat.id.toString();
    let player = players[chatId];

    bot.sendMessage(chatId, 'Вы собрались ударить ' + match[1]);

    try {
        player.setAction(match[1]);

        if (player.game.allReady()) {
            player.game.perform();
            player.game.showResult();
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
            return null;
        }
    }, infoTexts);

    if (typeof result === 'string') {
        bot.sendMessage(chatId, result);
    }
});
