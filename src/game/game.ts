import {Player} from './player';
import {Combat} from './combat';
import {bot} from './bot';
import {capitalize} from '../../utils/capitalize';
import {randomBytes} from 'crypto';

export const allowedCharacters: {[name: string]: boolean} = {
    'варвар': true,
    'воин': true,
    'маг': true,
    'вампир': true,
};

export class Game {

    players: {[name: string]: Player} = {};
    combatsQueue: Combat[] = [];
    combatsInvites: {[name: string]: Combat} = {};
    combatsCount = 0;
    combatsEnded = 0;

    static calcDamage(minDamage: number, maxDamage: number) {
        return Math.ceil(Math.random() * (maxDamage - minDamage)) + minDamage;
    }

    startDuel(chatId: string, username: string, combatId: string | null) {
        let combat: Combat;

        if (combatId === null) {
            const newCombatId = randomBytes(8).toString('hex');

            combat = new Combat();

            this.combatsInvites[newCombatId] = combat;

            bot.sendMessage(chatId, 'Дуэль создана, передайте ссылку своему оппоненту:');
            bot.sendMessage(chatId, `https://t.me/${bot.me.username}?start=${newCombatId}`);
        } else {
            combat = this.combatsInvites[combatId];

            delete this.combatsInvites[combatId];
        }

        if (!combat) {
            bot.sendMessage(chatId, 'Ваша дуэль уже закончилась или была отменена, бросте новый вызов /вызов');

            return;
        }

        this.start(chatId, username, combat);
        this.showCharacters(chatId);
    }

    startCombat(chatId: string, username: string) {
        const combat = this.getCombatFromQueue();

        if (combat.isFull()) {
            this.combatsQueue.splice(this.combatsQueue.indexOf(combat));
        }

        this.start(chatId, username, combat);
        this.showCharacters(chatId);
    }

    showCharacters(chatId: string) {
        bot.sendMessage(chatId, 'выберите персонажа', this.getCharacters());
    }

    isAllowedCharacter(character: string) {
        return allowedCharacters[character.toLowerCase()];
    }

    getPlayer(chatId: string) {
        return this.players[chatId];
    }

    addPlayer(chatId: string, username: string | undefined): Player {
        this.players[chatId] = new Player(chatId, username);

        return this.players[chatId];
    }

    selectCharacter(chatId: string, character: string) {
        const player = this.getPlayer(chatId);

        if (!this.isAllowedCharacter(character)) {
            return;
        }

        if (!player.currentCombat) {
            this.startCombat(chatId, player.username);

            return;
        }

        player.setCharacter(character);

        const combat = player.currentCombat;

        if (combat.isReadyToStart()) {
            combat.start();
        } else {
            bot.sendMessage(chatId, 'Ожидаем противника');
        }
    }

    private getCharacters() {
        return {reply_markup: {
                keyboard: [
                    Object.keys(allowedCharacters).map(character => {
                        return {text: '/готов ' + capitalize(character)};
                    })
                ],
                one_time_keyboard: true
            }};
    }

    private start(chatId: string, username: string, combat: Combat) {
        let player = this.getPlayer(chatId);

        if (!player) {
            player = this.addPlayer(chatId, username);
        }

        if (player.currentCombat) {
            bot.sendMessage(chatId, 'Вы уже ожидаете противника, напишите /стоп для выхода из очереди');

            return;
        }

        player.currentCombat = combat;
        combat.addPlayer(player);
        this.combatsCount++;
    }

    private getCombatFromQueue(): Combat {
        if (this.combatsQueue.length > 0) {
            return this.combatsQueue[0];
        } else {
            const combat = new Combat();

            this.combatsQueue.push(combat);

            return combat;
        }
    }
}