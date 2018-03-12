import * as TelegramBot from 'node-telegram-bot-api';
import * as Stream from 'stream';

export class TelegramBotWithLogs extends TelegramBot {
    parent: TelegramBot;

    startPolling(options?: TelegramBot.StartPollingOptions): Promise<any> {
        return ;
    }

    stopPolling(): Promise<any> {
        return undefined;
    }

    isPolling(): boolean {
        return undefined;
    }

    openWebHook(): Promise<any> {
        return undefined;
    }

    closeWebHook(): Promise<any> {
        return undefined;
    }

    hasOpenWebHook(): boolean {
        return undefined;
    }

    getMe(): Promise<TelegramBot.User | Error> {
        return undefined;
    }

    setWebHook(url: string, options?: TelegramBot.SetWebHookOptions): Promise<any> {
        return undefined;
    }

    deleteWebHook(): Promise<boolean | Error> {
        return undefined;
    }

    getWebHookInfo(): Promise<TelegramBot.WebhookInfo | Error> {
        return undefined;
    }

    getUpdates(options?: TelegramBot.GetUpdatesOptions): Promise<TelegramBot.Update[] | Error> {
        return undefined;
    }

    processUpdate(update: TelegramBot.Update): void {
    }

    answerInlineQuery(inlineQueryId: string, results: TelegramBot.InlineQueryResult[], options?: TelegramBot.AnswerInlineQueryOptions): Promise<boolean | Error> {
        return undefined;
    }

    forwardMessage(chatId: number | string, fromChatId: number | string, messageId: number | string, options?: TelegramBot.ForwardMessageOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendPhoto(chatId: number | string, photo: string | Stream | Buffer, options?: TelegramBot.SendPhotoOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendAudio(chatId: number | string, audio: string | Stream | Buffer, options?: TelegramBot.SendAudioOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendDocument(chatId: number | string, doc: string | Stream | Buffer, options?: TelegramBot.SendDocumentOptions, fileOpts?: any): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendSticker(chatId: number | string, sticker: string | Stream | Buffer, options?: TelegramBot.SendStickerOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendVideo(chatId: number | string, video: string | Stream | Buffer, options?: TelegramBot.SendVideoOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendVideoNote(chatId: number | string, videoNote: string | Stream | Buffer, options?: TelegramBot.SendVideoNoteOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendVoice(chatId: number | string, voice: string | Stream | Buffer, options?: TelegramBot.SendVoiceOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendChatAction(chatId: number | string, action: string): Promise<boolean | Error> {
        return undefined;
    }

    kickChatMember(chatId: number | string, userId: string): Promise<boolean | Error> {
        return undefined;
    }

    unbanChatMember(chatId: number | string, userId: string): Promise<boolean | Error> {
        return undefined;
    }

    restrictChatMember(chatId: number | string, userId: string, options?: TelegramBot.RestrictChatMemberOptions): Promise<boolean | Error> {
        return undefined;
    }

    promoteChatMember(chatId: number | string, userId: string, options?: TelegramBot.PromoteChatMemberOptions): Promise<boolean | Error> {
        return undefined;
    }

    exportChatInviteLink(chatId: number | string): Promise<string | Error> {
        return undefined;
    }

    setChatPhoto(chatId: number | string, photo: string | Stream | Buffer): Promise<boolean | Error> {
        return undefined;
    }

    deleteChatPhoto(chatId: number | string): Promise<boolean | Error> {
        return undefined;
    }

    setChatTitle(chatId: number | string, title: string): Promise<boolean | Error> {
        return undefined;
    }

    setChatDescription(chatId: number | string, description: string): Promise<boolean | Error> {
        return undefined;
    }

    pinChatMessage(chatId: number | string, messageId: string): Promise<boolean | Error> {
        return undefined;
    }

    unpinChatMessage(chatId: number | string): Promise<boolean | Error> {
        return undefined;
    }

    answerCallbackQuery(options?: TelegramBot.AnswerCallbackQueryOptions): Promise<boolean | Error> {
        return undefined;
    }

    editMessageText(text: string, options?: TelegramBot.EditMessageTextOptions): Promise<TelegramBot.Message | boolean | Error> {
        return undefined;
    }

    editMessageCaption(caption: string, options?: TelegramBot.EditMessageCaptionOptions): Promise<TelegramBot.Message | boolean | Error> {
        return undefined;
    }

    editMessageReplyMarkup(replyMarkup: TelegramBot.InlineKeyboardMarkup, options?: TelegramBot.EditMessageReplyMarkupOptions): Promise<TelegramBot.Message | boolean | Error> {
        return undefined;
    }

    getUserProfilePhotos(userId: number | string, options?: TelegramBot.GetUserProfilePhotosOptions): Promise<TelegramBot.UserProfilePhotos | Error> {
        return undefined;
    }

    sendLocation(chatId: number | string, latitude: number, longitude: number, options?: TelegramBot.SendLocationOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendVenue(chatId: number | string, latitude: number, longitude: number, title: string, address: string, options?: TelegramBot.SendVenueOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    sendContact(chatId: number | string, phoneNumber: string, firstName: string, options?: TelegramBot.SendContactOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    getFile(fileId: string): Promise<TelegramBot.File | Error> {
        return undefined;
    }

    getFileLink(fileId: string): Promise<string | Error> {
        return undefined;
    }

    downloadFile(fileId: string, downloadDir: string): Promise<string | Error> {
        return undefined;
    }

    removeTextListener(regexp: RegExp): TelegramBot.TextListener | null {
        return undefined;
    }

    onReplyToMessage(chatId: number | string, messageId: number | string, callback: (msg: TelegramBot.Message) => void): number {
        return undefined;
    }

    removeReplyListener(replyListenerId: number): TelegramBot.ReplyListener {
        return undefined;
    }

    getChat(chatId: number | string): Promise<TelegramBot.Chat | Error> {
        return undefined;
    }

    getChatAdministrators(chatId: number | string): Promise<TelegramBot.ChatMember[] | Error> {
        return undefined;
    }

    getChatMembersCount(chatId: number | string): Promise<number | Error> {
        return undefined;
    }

    getChatMember(chatId: number | string, userId: string): Promise<TelegramBot.ChatMember | Error> {
        return undefined;
    }

    leaveChat(chatId: number | string): Promise<boolean | Error> {
        return undefined;
    }

    sendGame(chatId: number | string, gameShortName: string, options?: TelegramBot.SendGameOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    setGameScore(userId: string, score: number, options?: TelegramBot.SetGameScoreOptions): Promise<TelegramBot.Message | boolean | Error> {
        return undefined;
    }

    getGameHighScores(userId: string, options?: TelegramBot.GetGameHighScoresOptions): Promise<TelegramBot.GameHighScore[] | Error> {
        return undefined;
    }

    deleteMessage(chatId: number | string, messageId: string, options?: any): Promise<boolean | Error> {
        return undefined;
    }

    sendInvoice(chatId: number | string, title: string, description: string, payload: string, providerToken: string, startParameter: string, currency: string, prices: TelegramBot.LabeledPrice[], options?: TelegramBot.SendInvoiceOptions): Promise<TelegramBot.Message | Error> {
        return undefined;
    }

    answerShippingQuery(shippingQueryId: string, ok: boolean, options?: TelegramBot.AnswerShippingQueryOptions): Promise<boolean | Error> {
        return undefined;
    }

    answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, options?: TelegramBot.AnswerPreCheckoutQueryOptions): Promise<boolean | Error> {
        return undefined;
    }

    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    on(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    once(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
        return undefined;
    }

    removeAllListeners(event?: string | symbol): this;
    removeAllListeners(event?: string | symbol): this;
    removeAllListeners(event?: string | symbol): this {
        return undefined;
    }

    setMaxListeners(n: number): this;
    setMaxListeners(n: number): this;
    setMaxListeners(n: number): this {
        return undefined;
    }

    getMaxListeners(): number {
        return undefined;
    }

    listeners(event: string | symbol): Function[] {
        return undefined;
    }

    rawListeners(event: string | symbol): Function[] {
        return undefined;
    }

    emit(event: string | symbol, ...args: any[]): boolean {
        return undefined;
    }

    eventNames(): Array<string | symbol> {
        return undefined;
    }

    listenerCount(type: string | symbol): number {
        return undefined;
    }

    constructor(token: string, options?: TelegramBot.ConstructorOptions) {
        super(token, options);
        this.parent = new TelegramBot(token, options);
    }

    onText(regexp: RegExp, callback: ((msg: TelegramBot.Message, match: RegExpExecArray | null) => void)): void {
        try {
            this.log({msg: `onText: ${regexp.source}`});
            this.parent.onText(regexp, (msg, match) => {
                this.log({msg: `onText: ${regexp.source}`});
                this.log({msg: `Message`, data: msg});
                this.log({msg: `Match`, data: match});

                callback(msg, match);
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

        return this.parent.sendMessage(chatId, text, options);
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