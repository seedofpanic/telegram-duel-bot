import {Player} from './player';
import {bot} from './bot';

export class Combat {
    players: {[name: string]: Player} = {};
    isEnded = false;

    get playersArr(): Player[] {
        return Object.keys(this.players).map(key => this.players[key]);
    }

    allReady(): boolean {
        return Object.keys(this.players).every(id => {
            return !!this.players[id].action;
        });
    }

    perform() {
        const ids = Object.keys(this.players);

        this.players[ids[0]].perform(this.players[ids[1]]);
        this.players[ids[1]].perform(this.players[ids[0]]);

        this.isEnded = Object.keys(this.players).some(key => this.players[key].isDead);
    }

    showResult() {
        Object.keys(this.players).forEach(id => {
            if (this.isEnded) {
                bot.sendMessage(id, this.getDeadResult(id));
            } else {
                bot.sendMessage(id, this.getRoundResult(id), this.getActions(this.players[id]));
            }
        });
    }

    getRoundResult(myId: string): string {
        return Object.keys(this.players).map(key => {
            const player = this.players[key];

            if (myId === player.chatId.toString()) {
                return `у вас осталось ${Math.ceil(player.health)}/${Math.ceil(player.healthMax)} здоровья`;
            } else {
                return `у противника ${Math.ceil(player.health)}/${Math.ceil(player.healthMax)} здоровья`;
            }
        }).join('\n');
    }

    getDeadResult(myId: string): string {
        return Object.keys(this.players)
            .map(id => {
                if (this.players[id].isDead) {
                    if (myId === id) {
                        return 'Вы побеждены, игра окончена';
                    } else {
                        return 'Ваш противник побежден, игра окончена';
                    }
                }
            }).join('\n');
    }

    getVsMessage(): string {
        const players = this.playersArr;

        return `${players[0].getName()} vs ${players[1].getName()}`;
    }

    getActions(player: Player) {
        if (player.action) {
            return {};
        }

        return {reply_markup: {
                keyboard: [
                    Object.keys(player.actions)
                        .filter(action => player.actions[action].isAvailable())
                        .map(action => ({text: '/act ' + action}))
                ],
                one_time_keyboard: true
            }};
    }

    start() {
        Object.keys(this.players).forEach(chatId => {
            bot.sendMessage(chatId, 'Противник найден\n' + this.getVsMessage(),
                this.getActions(this.players[chatId]));
        });
    }

    addPlayer(player: Player) {
        this.players[player.chatId] = player;
    }
}