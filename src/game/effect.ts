import {Player} from './player';

export abstract class Effect {
    constructor(public name: string, private roundsCount: number) {
    }

    tick(player: Player): boolean {
        this.roundsCount--;

        if (this.roundsCount <= 0) {
            player.effects.splice(player.effects.indexOf(this));
        }

        return this.roundsCount > 0;
    }
}