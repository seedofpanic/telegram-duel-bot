import './index';
import {bot} from './game/bot';
import * as TelegramBot from 'node-telegram-bot-api';

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
        spyOn(Math, 'random').and.returnValue(2);
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
        bot.processUpdate({update_id: 1, message: {text: '/готов', chat: chat1} as any});

        expect(results).toEqual([{
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/готов Варвар'}, {'text': '/готов Воин'}, {'text': '/готов Маг'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'выберите персонажа'
        }]);
    });

    it('Первый игрок сообщил что готов играть за Воина', () => {
        bot.processUpdate({update_id: 1, message: {text: '/готов Воин', chat: chat1} as any});

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Ожидаем противника'
        }]);
    });

    it('Второй игрок сообщил что готов', () => {
        bot.processUpdate({update_id: 1, message: {text: '/готов', chat: chat2} as any});
        expect(results).toEqual([{
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/готов Варвар'}, {'text': '/готов Воин'}, {'text': '/готов Маг'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'выберите персонажа'
        }]);
    });

    it('Второй игрок сообщил что готов играть за Мага', () => {
        bot.processUpdate({update_id: 1, message: {text: '/готов Маг', chat: chat2} as any});
        expect(results).toEqual([{
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act ударить мечем'}, {'text': '/act ударить щитом'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'Противник найден\nuser 1 vs user 2'
        }, {
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act огненный шар'}, {'text': '/act ледяная стрела'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'Противник найден\nuser 1 vs user 2'
        }]);
    });

    it('Первый игрок выбирает ударить мечем', () => {
        bot.processUpdate({update_id: 1, message: {text: '/act ударить мечем', chat: chat1} as any});

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Вы собрались ударить ударить мечем'
        }, {
            'chatId': '1', 'options': undefined, 'text': 'ожидаем противника'
        }]);
    });

    it('Второй игрок выбирает ледяную стрелу', () => {
        bot.processUpdate({update_id: 1, message: {text: '/act ледяная стрела', chat: chat2} as any});

        expect(results).toEqual([{
            'chatId': '2', 'options': undefined, 'text': 'Вы собрались ударить ледяная стрела'
        }, {
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act ударить щитом'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у вас осталось 84/100 здоровья\nу противника 48/70 здоровья'
        }, {
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act огненный шар'}, {'text': '/act ледяная стрела'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у противника 84/100 здоровья\nу вас осталось 48/70 здоровья'
        }]);
    });

    it('Второй игрок выбирает огненный шар', () => {
        bot.processUpdate({update_id: 1, message: {text: '/act огненный шар', chat: chat2} as any});

        expect(results).toEqual([{
            'chatId': '2', 'options': undefined, 'text': 'Вы собрались ударить огненный шар'
        }, {
            'chatId': '2', 'options': undefined, 'text': 'ожидаем противника'
        }]);
    });

    it('Первый игрок выбирает ударить щитом', () => {
        bot.processUpdate({update_id: 1, message: {text: '/act ударить щитом', chat: chat1} as any});

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Вы собрались ударить ударить щитом'
        }, {
            'chatId': '1',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act ударить мечем'}, {'text': '/act ударить щитом'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у вас осталось 73/100 здоровья\nу противника 19/70 здоровья'
        }, {
            'chatId': '2',
            'options': {
                'reply_markup': {
                    'keyboard': [[{'text': '/act огненный шар'}, {'text': '/act ледяная стрела'}]],
                    'one_time_keyboard': true
                }
            },
            'text': 'у противника 73/100 здоровья\nу вас осталось 19/70 здоровья'
        }]);
    });
});
