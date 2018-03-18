import * as TelegramBot from 'node-telegram-bot-api';

let updateId = 0;

export function getMessage(chatId: number, text: string): TelegramBot.Update {
    updateId++;

    return {
        update_id: updateId,
        message: {
            message_id: updateId,
            date: 0,
            text,
            chat: {
                id: chatId,
                type: 'chat',
                username: 'username' + chatId,
            }
        }
    };
}