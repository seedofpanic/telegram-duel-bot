import '../index';
import {bot} from '../game/bot';
import * as TelegramBot from 'node-telegram-bot-api';
import {getMessage} from './helpers';
import * as crypto from 'crypto';

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

    it('Первый игрок запрашивает приватный бой', () => {
        spyOn(crypto, 'randomBytes').and.returnValue('testhash');
        bot.me = {
            id: 1,
            is_bot: true,
            first_name: 'Bot',
            username: '@testbot'
        };
        bot.processUpdate(getMessage(1, '/invite'));

        expect(results).toEqual([
            {'chatId': '1', 'options': undefined, 'text': 'Дуэль создана, передайте ссылку своему оппоненту:'},
            {'chatId': '1', 'options': undefined, 'text': 'https://t.me/@testbot?start=testhash'}, {
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

    it('Второй игрок перешел по кривой ссылке', () => {
        bot.processUpdate(getMessage(2, '/start duel10'));

        expect(results).toEqual([{
            'chatId': '2',
            'options': undefined,
            'text': 'Ваша дуэль уже закончилась или была отменена, бросте новый вызов /вызов'
        }]);
    });

    it('Второй игрок перешел по ссылке', () => {
        bot.processUpdate(getMessage(2, '/start testhash'));

        expect(results).toEqual([{
            'chatId': '2',
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

    it('Ссылка на дуэль более не доступна', () => {
        bot.processUpdate(getMessage(2, '/start duel0'));

        expect(results).toEqual([{
            'chatId': '2',
            'options': undefined,
            'text': 'Ваша дуэль уже закончилась или была отменена, бросте новый вызов /вызов'
        }]);
    });

    it('Первый игрок сообщил что готов играть за Воина', () => {
        bot.processUpdate(getMessage(1,'/готов Воин'));

        expect(results).toEqual([{
            'chatId': '1', 'options': undefined, 'text': 'Ожидаем противника'
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

    it('Несколько раундов ударов', () => {
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));
    });

    it('Бой завершается успешно', () => {
        bot.processUpdate(getMessage(1, '/act ударить мечем'));
        bot.processUpdate(getMessage(2, '/act огненный шар'));

        expect(results).toEqual([
            {'chatId': '1', 'options': undefined, 'text': 'Вы собрались ударить ударить мечем'},
            {'chatId': '1', 'options': undefined, 'text': 'ожидаем противника'},
            {'chatId': '2', 'options': undefined, 'text': 'Вы собрались ударить огненный шар'},
            {'chatId': '1', 'options': undefined, 'text': 'Удар мечем наносит 11 урона' +
                '\nОгненный шар наносит 8 урона' +
                '\nОгненный шар накладывает эффек Горение' +
                '\nГорение наносит 4 урона'
            },
            {'chatId': '1', 'options': undefined, 'text': 'Ваш противник побежден, игра окончена'},
            {'chatId': '2', 'options': undefined, 'text': 'Удар мечем наносит 11 урона' +
                '\nОгненный шар наносит 8 урона' +
                '\nОгненный шар накладывает эффек Горение' +
                '\nГорение наносит 4 урона'
            },
            {'chatId': '2', 'options': undefined, 'text': 'Вы побеждены, игра окончена'}
        ]);
    });
});
