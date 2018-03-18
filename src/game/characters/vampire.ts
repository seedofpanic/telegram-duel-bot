import {Character} from '../character';
import {Action} from '../action';
import {DamageTypes} from '../models/damageTypes';
import {SwordAction} from '../actions/swordAction';
import {VampireBiteAction} from '../actions/vampireBiteAction';
import {RemoveEffectsAction} from '../actions/removeEffectsAction';
import {ShadowBoltAction} from '../actions/shadowBoltAction';

export class Vampire extends Character {
    getName(): string {
        return 'Вампир';
    }

    getHealthMax(): number {
        return 80;
    }

    getActions(): { [p: string]: Action } {
        return {
            'ударить мечем': new SwordAction(),
            'укус': new VampireBiteAction(),
            'уход в тень': new RemoveEffectsAction(),
            'поток тьмы': new ShadowBoltAction()
        };
    }

    getResists(): { [p: string]: number } {
        return {
            [DamageTypes.BLUNT]: 1.3,
            [DamageTypes.CUTTING]: 0.9,
            [DamageTypes.FIRE]: 0.7,
            [DamageTypes.FROST]: 0.7
        };
    }

}