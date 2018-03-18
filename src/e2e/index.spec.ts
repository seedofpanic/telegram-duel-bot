import '../index';
import {bot} from '../game/bot';
import * as TelegramBot from 'node-telegram-bot-api';
import {getMessage} from './helpers';

bot.stopPolling();

describe('bot', () => {

    const results: {
        chatId: number;
        text: string;
        options: TelegramBot.SendMessageOptions;
    }[] = [];
    let chat1: TelegramBot.Chat;
    let chat2: TelegramBot.Chat;

    beforeAll(() => {
        spyOn(console, 'log').and.callFake(msg => results.push(msg));
        spyOn(bot, 'sendMessage').and.callFake((chatId, text, options) => {
            results.push({
                chatId,
                text,
                options,
            });
        });
        spyOn(Math, 'random').and.returnValue(0.5);
    });

    beforeEach(() => {
        chat1 = {
            id: 1,
            username: 'user 1',
            type: 'test',
        };
        chat2 = {
            id: 2,
            username: 'user 2',
            type: 'test',
        };
        results.length = 0;
    });

    it('Первый игрок сообщил что готов', () => {
        bot.processUpdate(getMessage(1, '/готов'));

        expect(results).toEqual([{
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/готов Варвар'},
                        {'text': '/готов Воин'},
                        {'text': '/готов Маг'},
                        {'text': '/готов Вампир'},
                    ]],
                    'one_time_keyboard': true
                }
            },
            'text': 'выберите персонажа'
        }]);
    });

    it('Первый игрок сообщил что готов играть за Воина', () => {
        bot.processUpdate(getMessage(1,'/готов Воин'));

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Ожидаем противника'
        }]);
    });

    it('Второй игрок сообщил что готов', () => {
        bot.processUpdate(getMessage(2, '/готов'));
        expect(results).toEqual([{
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/готов Варвар'},
                            {'text': '/готов Воин'},
                            {'text': '/готов Маг'},
                            {'text': '/готов Вампир'}
                        ]],
                    'one_time_keyboard': true
                }
            },
            'text': 'выберите персонажа'
        }]);
    });

    it('Второй игрок сообщил что готов играть за Мага', () => {
        bot.processUpdate(getMessage(2, '/готов Маг'));
        expect(results).toEqual([{
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act рассечь'},
                        {'text': '/act ударить мечем'}, {'text': '/act ударить щитом'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'Противник найден\nВоин vs Маг'
        }, {
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act огненный шар'}, {'text': '/act ледяная стрела'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'Противник найден\nВоин vs Маг'
        }]);
    });

    it('Первый игрок выбирает рассечь', () => {
        bot.processUpdate(getMessage(1, '/act рассечь'));

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Вы собрались ударить рассечь'
        }, {
            'chatId': '1', 'options': undefined, 'text': 'ожидаем противника'
        }]);
    });

    it('Второй игрок выбирает огненный шар', () => {
        bot.processUpdate(getMessage(2, '/act огненный шар'));

        expect(results).toEqual([{
            'chatId': '2', 'options': undefined, 'text': 'Вы собрались ударить огненный шар'
        }, {'chatId': '1', 'options': undefined, 'text': 'Рассечение наносит 11 урона' +
            '\nРассечение накладывает эффек Кровотечение' +
            '\nОгненный шар наносит 8 урона' +
            '\nОгненный шар накладывает эффек Горение' +
            '\nГорение наносит 4 урона' +
            '\nКровотечение наносит 6 урона'
        }, {
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act ударить мечем'}, {'text': '/act ударить щитом'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у вас осталось 90/100 здоровья\nу противника 55/70 здоровья'
        }, {'chatId': '2', 'options': undefined, 'text': 'Рассечение наносит 11 урона' +
            '\nРассечение накладывает эффек Кровотечение' +
            '\nОгненный шар наносит 8 урона' +
            '\nОгненный шар накладывает эффек Горение' +
            '\nГорение наносит 4 урона' +
            '\nКровотечение наносит 6 урона'
        }, {
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act огненный шар'}, {'text': '/act ледяная стрела'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у противника 90/100 здоровья\nу вас осталось 55/70 здоровья'
        }]);
    });

    it('Второй игрок выбирает огненный шар', () => {
        bot.processUpdate(getMessage(2, '/act огненный шар'));

        expect(results).toEqual([{
            'chatId': '2', 'options': undefined, 'text': 'Вы собрались ударить огненный шар'
        }, {
            'chatId': '2', 'options': undefined, 'text': 'ожидаем противника'
        }]);
    });

    it('Первый игрок выбирает ударить щитом', () => {
        bot.processUpdate(getMessage(1, '/act ударить щитом'));

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Вы собрались ударить ударить щитом'
        }, {'chatId': '1', 'options': undefined, 'text': 'Удар щитом наносит 9 урона' +
            '\nУдар щитом накладывает эффек Оглушение' +
            '\nОгненный шар наносит 8 урона' +
            '\nОгненный шар накладывает эффек Горение' +
            '\nГорение наносит 4 урона' +
            '\nГорение наносит 4 урона'
        }, {
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act рассечь'}, {'text': '/act ударить мечем'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у вас осталось 75/100 здоровья\nу противника 46/70 здоровья'
        }, {'chatId': '2', 'options': undefined, 'text': 'Удар щитом наносит 9 урона' +
            '\nУдар щитом накладывает эффек Оглушение' +
            '\nОгненный шар наносит 8 урона' +
            '\nОгненный шар накладывает эффек Горение' +
            '\nГорение наносит 4 урона' +
            '\nГорение наносит 4 урона'
        }, {
            'chatId': '2',
            'options': {},
            'text': 'у противника 75/100 здоровья\nу вас осталось 46/70 здоровья'
        }]);
    });

    it('Второй игрок выбирает ледяную стрелу', () => {
        bot.processUpdate(getMessage(2, '/act ледяная стрела'));

        expect(results).toEqual([{
            'chatId': '2', 'options': undefined, 'text': 'Действие уже выбрано'
        }]);
    });

    it('Первый игрок выбирает ударить щитом, но это действие не доступно', () => {
        bot.processUpdate(getMessage(1, '/act ударить щитом'));

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Действие ударить щитом сейчас не доступно'
        }]);
    });

    it('Первый игрок выбирает ударить мечем второй раз', () => {
        bot.processUpdate(getMessage(1, '/act ударить мечем'));

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Вы собрались ударить ударить мечем'
        }, {'chatId': '1', 'options': undefined, 'text': 'Удар мечем наносит 11 урона' +
            '\nГорение наносит 4 урона'
        }, {
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act рассечь'}, {'text': '/act ударить мечем'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у вас осталось 72/100 здоровья\nу противника 36/70 здоровья'
        }, {'chatId': '2', 'options': undefined, 'text': 'Удар мечем наносит 11 урона' +
            '\nГорение наносит 4 урона'
        }, {
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act огненный шар'}, {'text': '/act ледяная стрела'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у противника 72/100 здоровья\nу вас осталось 36/70 здоровья'
        }]);
    });
});
