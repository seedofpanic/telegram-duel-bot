import {Action} from '../action';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Combat} from '../combat';

export class RemoveEffectsAction extends Action {
    constructor(name: string) {
        super(name, 4, 2);
    }

    perform(combat: Combat, player?: Player, target?: Player) {
        player.effects.length = 0;
    }

    modifyIncomeDamage(damage: number, type: DamageTypes) {
        return damage * 0.25;
    }
}