import {Character} from '../character';
import {Action} from '../action';
import {HitAction} from '../actions/hitAction';
import {DamageTypes} from '../models/damageTypes';

export class Barbarian extends Character {
    getHealthMax(): number {
        return 140;
    }

    getActions(): { [p: string]: Action } {
        return {
            'ударить рукой': new HitAction(5, 7, DamageTypes.BLUNT, 0.1, 1.5),
            'ударить ногой': new HitAction(3, 9, DamageTypes.BLUNT, 0.2, 3),
        };
    }

    getResists(): { [p: string]: number } {
        return {
            [DamageTypes.BLUNT]: 1.2,
            [DamageTypes.CUTTING]: 1.4,
            [DamageTypes.FIRE]: 1.5,
            [DamageTypes.FROST]: 1.1,
        };
    }
}