import * as TelegramBot from 'node-telegram-bot-api';

export class TelegramBotWithLogs extends TelegramBot {
    constructor(token: string, options?: TelegramBot.ConstructorOptions) {
        super(token, options);
    }

    onText(regexp: RegExp, callback: ((msg: TelegramBot.Message, match: RegExpExecArray | null) => void)): void {
        try {
            this.log({msg: `onText: ${regexp.source}`});
            super.onText(regexp, (msg, match) => {
                this.log({msg: `onText: ${regexp.source}`});
                this.log({msg: `Message`, data: msg});
                this.log({msg: `Match`, data: match});

                try {
                    callback(msg, match);
                } catch (e) {
                    this.error({msg: `onText: ${regexp.source}`, data: e});
                }
            });
        } catch (e) {
            this.error({msg: `onText: ${regexp.source}`, data: e});
        }
    }

    sendMessage(chatId: number | string, text: string,
                options?: TelegramBot.SendMessageOptions): Promise<TelegramBot.Message | Error> {
        this.log({msg: `sendMessage: ${chatId}`});
        this.log({msg: `text:`, data: text});
        this.log({msg: `options:`, data: options});

        return super.sendMessage(chatId, text, options);
    }

    log({msg, data}: {msg: string, data?: any}) {
        console.log(msg);

        if (data) {
            console.log(JSON.stringify(data));
        }
    }

    error({msg, data}: {msg: string, data?: any}) {
        console.error(msg);

        if (data) {
            console.log(data);
        }
    }
}