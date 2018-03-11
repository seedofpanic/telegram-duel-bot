import {Action} from '../action';
import {Player} from '../player';

export class Hit extends Action {
    constructor(public minDamage: number, public maxDamage: number) {
        super();
    }

    perform(player: Player, target: Player): void {
        target.decreaseHp(this.getDamage());
    }

    private getDamage(): number {
        return Math.ceil(Math.random() * (this.maxDamage - this.minDamage)) + this.minDamage;
    }
}