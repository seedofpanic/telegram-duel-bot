import {Player} from './player';

export abstract class Effect {
    constructor(private roundsCount: number) {
    }

    tick(player: Player): boolean {
        this.roundsCount--;

        return this.roundsCount > 0;
    }
}