import {Player} from './player';
import {Combat} from './combat';
import {bot} from './bot';
import {capitalize} from '../../utils/capitalize';

const allowedCharacters: {[name: string]: boolean} = {
    'варвар': true,
    'воен': true,
    'маг': true,
};

export class Game {

    players: {[name: string]: Player} = {};
    combats: Combat[] = [];

    showCharacters(chatId: string) {
        bot.sendMessage(chatId, 'выберите персонажа', this.getCharacters());
    }

    isAllowedCharacter(character: string) {
        return allowedCharacters[character.toLowerCase()];
    }

    getPlayer(chatId: string) {
        return this.players[chatId];
    }

    addPlayer(chatId: string, character: string, username: string | undefined): Player {
        this.players[chatId] = new Player(chatId, character, username);

        return this.players[chatId];
    }

    private getCharacters() {
        return {reply_markup: {
                keyboard: [
                    Object.keys(allowedCharacters).map(character => {
                        return {text: '/готов ' + capitalize(character)};
                    })
                ],
                one_time_keyboard: true
            }};
    }
}