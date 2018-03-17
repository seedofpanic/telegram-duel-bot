import * as TelegramBot from 'node-telegram-bot-api';

const mode = process.env['MODE'];

export const bot = new TelegramBot(process.env['TOKEN'], {polling: mode !== 'test'});
