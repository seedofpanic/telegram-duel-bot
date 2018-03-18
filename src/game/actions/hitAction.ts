import {Action} from '../action';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';
import {Combat} from '../combat';

export class HitAction extends Action {
    constructor(name: string,
                private minDamage: number,
                private maxDamage: number,
                private type: DamageTypes,
                private critChance = 0,
                private critMultipier = 1,
                cooldown = 0,
                maxCharges = 1) {
        super(name, cooldown, maxCharges);
    }

    perform(combat: Combat, player?: Player, target?: Player) {
        const targetResist = target.getResist(this.type);

        target.decreaseHp(this, this.calcDamage()
            * targetResist
            * this.getCrit(this.critChance * targetResist));

        super.perform(combat);
    }

    protected calcDamage(): number {
        return Game.calcDamage(this.minDamage, this.maxDamage);
    }

    private getCrit(critChance: number): number {
        return critChance >= Math.random() ? this.critMultipier : 1;
    }
}