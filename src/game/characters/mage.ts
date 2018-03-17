import {Character} from '../character';
import {FrostArrowAction} from '../actions/frostArrowAction';
import {FireBallAction} from '../actions/fireBallAction';
import {DamageTypes} from '../models/damageTypes';
import {Action} from '../action';

export class Mage extends Character {
    getHealthMax(): number {
        return 70;
    }

    getActions(): { [p: string]: Action } {
        return {
            'огненный шар': new FireBallAction(5, 7, DamageTypes.FIRE, 0.3, 3),
            'ледяная стрела': new FrostArrowAction(3, 9, DamageTypes.FROST, 0.1, 1.5),
        };
    }

    getResists(): { [p: string]: number } {
        return {
            [DamageTypes.BLUNT]: 1.5,
            [DamageTypes.CUTTING]: 1.7,
            [DamageTypes.FIRE]: 0.5,
            [DamageTypes.FROST]: 0.5,
        };
    }
}