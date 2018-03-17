import {Character} from '../character';
import {Action} from '../action';
import {Sword} from '../actions/swordHitAction';
import {HitAction} from '../actions/hitAction';
import {DamageTypes} from '../models/damageTypes';

export class Warrior extends Character {
    getHealthMax(): number {
        return 100;
    }

    getActions(): { [p: string]: Action } {
        return {
            'ударить мечем': new Sword(5, 7, DamageTypes.CUTTING, 1),
            'ударить щитом': new HitAction(3, 9, DamageTypes.BLUNT, 0, 1),
        };
    }

    getResists(): { [p: string]: number } {
        return {
            [DamageTypes.BLUNT]: 1.3,
            [DamageTypes.CUTTING]: 0.9,
            [DamageTypes.FIRE]: 1.2,
            [DamageTypes.FROST]: 1.1,
        };
    }
}