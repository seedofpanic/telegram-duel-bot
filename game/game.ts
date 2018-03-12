import {Player} from './player';
import {bot} from '../index';
import {Combat} from './combat';

const allowedCharacters: {[name: string]: boolean} = {
    'Варвар': true,
    'Воен': true,
    'Маг': true,
};

export class Game {

    players: {[name: string]: Player} = {};
    combats: Combat[] = [];

    showCharacters(chatId: string) {
        bot.sendMessage(chatId, 'выберите персонажа', this.getCharacters());
    }

    getCharacters() {
        return {reply_markup: {
                keyboard: [
                    Object.keys(allowedCharacters).map(character => {
                        return {text: '/готов ' + character}
                    })
                ],
                one_time_keyboard: true
            }};
    }

    isAllowedCharacter(character: string) {
        return allowedCharacters[character];
    }

    getPlayer(chatId: string) {
        return this.players[chatId];
    }

    addPlayer(chatId: string, character: string, username: string | undefined): Player {
        this.players[chatId] = new Player(chatId, character, username);

        return this.players[chatId];
    }
}