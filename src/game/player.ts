import {Action} from './action';
import {DamageTypes} from './models/damageTypes';
import {Combat} from './combat';
import {Effect} from './effect';
import {HitAction} from './actions/hitAction';

export class Player {
    currentCombat: Combat;
    healthMax: number;
    health: number;
    availableActions: {[name: string]: Action};
    action: Action;
    isDead: boolean;
    character: string;
    resists = {
        [DamageTypes.BLUNT]: 1,
        [DamageTypes.CUTTING]: 1,
        [DamageTypes.PIRCING]: 1,
        [DamageTypes.FIRE]: 1,
        [DamageTypes.FROST]: 1,
    };
    effects: Effect[];

    constructor(public chatId: string, character: string, public username: string) {
        this.character = character.toLowerCase();

        switch (this.character) {
            case 'варвар':
                this.healthMax = 140;
                this.availableActions = {
                    'ударить рукой': new HitAction(5, 7, DamageTypes.BLUNT),
                    'ударить ногой': new HitAction(3, 9, DamageTypes.BLUNT),
                };
                this.resists[DamageTypes.BLUNT] = 1.2;
                this.resists[DamageTypes.CUTTING] = 1.4;
                this.resists[DamageTypes.FIRE] = 1.5;
                this.resists[DamageTypes.FROST] = 1.1;
                break;
            case 'воин':
                this.healthMax = 100;
                this.availableActions = {
                    'ударить мечем': new HitAction(5, 7, DamageTypes.CUTTING),
                    'ударить щитом': new HitAction(3, 9, DamageTypes.BLUNT),
                };
                this.resists[DamageTypes.BLUNT] = 1.3;
                this.resists[DamageTypes.CUTTING] = 0.9;
                this.resists[DamageTypes.FIRE] = 1.2;
                this.resists[DamageTypes.FROST] = 1.1;
                break;
            case 'маг':
                this.healthMax = 70;
                this.availableActions = {
                    'огненный шар': new HitAction(5, 7, DamageTypes.FIRE),
                    'ледяная стрела': new HitAction(3, 9, DamageTypes.FROST),
                };
                this.resists[DamageTypes.BLUNT] = 1.5;
                this.resists[DamageTypes.CUTTING] = 1.7;
                this.resists[DamageTypes.FIRE] = 0.5;
                this.resists[DamageTypes.FROST] = 0.5;
                break;
        }

        this.health = this.healthMax;
    }

    setAction(action: string) {
        this.action = this.availableActions[action];
    }

    decreaseHp(damage: number, damageType: DamageTypes) {
        const pureDamage = damage * this.getResist(damageType);

        if (this.health > pureDamage) {
            this.health -= pureDamage;
        } else {
            this.health = 0;
            this.isDead = true;
        }
    }

    increaseHp(heal: number) {
        if (this.health + heal > this.healthMax) {
            this.health = this.healthMax;
        } else {
            this.health += heal;
        }
    }

    getStatus(): string {
        const percent = this.health / this.healthMax;

        if (percent > 0.9) {
            return 'чувствует себя отлично';
        } else if (percent > 0.8) {
            return 'чувствует поцарапан';
        } else if (percent > 0.5) {
            return 'потрепан';
        } else if (percent > 0.2) {
            return 'пошатывается';
        } else if (percent > 0) {
            return 'смертельно ранен';
        }
    }

    getResist(type: DamageTypes): number {
        return this.resists[type] || 1;
    }

    addEffect(effect: Effect) {
        this.effects.push(effect);
    }
}