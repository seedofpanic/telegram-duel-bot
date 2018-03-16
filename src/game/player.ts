import {Action} from './action';
import {DamageTypes} from './models/damageTypes';
import {Combat} from './combat';
import {Effect} from './effect';
import {Character} from './character';
import {Mage} from './characters/mage';
import {Warrior} from './characters/warrior';
import {Barbarian} from './characters/barbarian';

export class Player {
    currentCombat: Combat;
    healthMax: number;
    health: number;
    action: Action;
    isDead: boolean;
    actions: {[name: string]: Action};
    resists: {[name: string]: number};
    effects: Effect[] = [];
    character: Character;

    constructor(public chatId: string, characterName: string, public username: string) {
        switch (characterName.toLowerCase()) {
            case 'варвар':
                this.character = new Barbarian();
                break;
            case 'воин':
                this.character = new Warrior();
                break;
            case 'маг':
                this.character = new Mage();
                break;
            default:
                throw new Error('Unexpected character name');
        }

        this.healthMax = this.character.getHealthMax();
        this.health = this.healthMax;
        this.actions = this.character.getActions();
        this.resists = this.character.getResists();
    }

    setAction(action: string) {
        this.action = this.actions[action];
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

    getResist(type: DamageTypes): number {
        return this.resists[type] || 1;
    }

    addEffect(effect: Effect) {
        this.effects.push(effect);
    }

    getName() {
        return this.username || 'Интересная личность';
    }

    perform(target: Player) {
        this.action.perform(this, target);
        Object.keys(this.actions).forEach(key => {
            this.actions[key].tick();
        });
        this.effects.forEach(effect => {
            effect.tick(this);
        });
        this.action = undefined;
    }
}