import {TelegramBotWithLogs} from './logs';
import * as TelegramBot from 'node-telegram-bot-api';

export let bot: TelegramBot;

if (process.env['DEBUG']) {
    bot = new TelegramBotWithLogs(process.env['TOKEN'], {polling: true});
} else {
    bot = new TelegramBot(process.env['TOKEN'], {polling: true});
}