import {Action} from '../action';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';

export class HitAction extends Action {
    constructor(private minDamage: number,
                private maxDamage: number,
                private type: DamageTypes,
                private critChance = 0,
                private critMultipier: number,
                cooldown = 0,
                maxCharges = 1) {
        super(cooldown, maxCharges);
    }

    perform(player: Player, target: Player) {
        const targetResist = target.getResist(this.type);

        target.decreaseHp(this.calcDamage()
            * targetResist
            * this.getCrit(this.critChance * targetResist));

        super.perform();
    }

    protected calcDamage(): number {
        return Game.calcDamage(this.minDamage, this.maxDamage);
    }

    private getCrit(critChance: number): number {
        return critChance >= Math.random() ? this.critMultipier : 1;
    }
}