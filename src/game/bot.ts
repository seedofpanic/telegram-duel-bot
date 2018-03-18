import * as TelegramBot from 'node-telegram-bot-api';

const mode = process.env['MODE'];

export class Bot extends TelegramBot {
    me: TelegramBot.User;

    constructor() {
        super(process.env['TOKEN'], {polling: mode !== 'test'});

        if (mode !== 'test') {
            this.getMeSafe();
        }
    }

    private getMeSafe() {
        this.getMe()
            .catch(() => {
                setTimeout(() => {
                    this.getMeSafe();
                }, 5000);
            })
            .then(user => {
                this.me = user as TelegramBot.User;
            });
    }
}

export const bot = new Bot();
