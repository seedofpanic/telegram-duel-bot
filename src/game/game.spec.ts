import {Game} from './game';
import {bot} from './bot';

describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game  = new Game();

        spyOn(bot, 'sendMessage');
    });

    it('showCharacters показывает доступных персонажей', () => {
        game.showCharacters('1');

        expect(bot.sendMessage).toBeCalledWith('1', 'выберите персонажа',
            {
                'reply_markup': {
                    'keyboard': [[{'text': '/готов Варвар'}, {'text': '/готов Воин'}, {'text': '/готов Маг'}]],
                    'one_time_keyboard': true
                }
            });
    });

    describe('isAllowedCharacter проверяет доступность персонажей по названию', () => {
        it('Варвар доступен', () => {
            expect(game.isAllowedCharacter('Варвар')).toBe(true);
            expect(game.isAllowedCharacter('варвар')).toBe(true);
        });

        it('Воин доступен', () => {
            expect(game.isAllowedCharacter('Воин')).toBe(true);
            expect(game.isAllowedCharacter('воин')).toBe(true);
        });

        it('Маг доступен', () => {
            expect(game.isAllowedCharacter('Маг')).toBe(true);
            expect(game.isAllowedCharacter('маг')).toBe(true);
        });

        it('Ёжик не доступен', () => {
            expect(game.isAllowedCharacter('Ёжик')).toBeFalsy();
            expect(game.isAllowedCharacter('ёжик')).toBeFalsy();
        });
    });

    describe('addPlayer', () => {
        it('Верно добавляет пользователя в игру', () => {
            const player = game.addPlayer('1', 'Воин', 'test');

            expect(game.players['1']).toBe(player);
        });
    });

    describe('getPlayer', () => {
        it('Если пользователь есть в игре, возвращает его', () => {
            const player = game.addPlayer('1', 'Воин', 'test');

            expect(game.getPlayer('1')).toBe(player);
        });

        it('Если пользователя нет в игре, возвращает undefined', () => {
            expect(game.getPlayer('1')).toBeUndefined();
        });
    });
});