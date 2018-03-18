import {Action} from './action';
import {DamageTypes} from './models/damageTypes';
import {Combat} from './combat';
import {Effect} from './effect';
import {Character} from './character';
import {Mage} from './characters/mage';
import {Warrior} from './characters/warrior';
import {Barbarian} from './characters/barbarian';
import {Vampire} from './characters/vampire';
import {HitAction} from './actions/hitAction';

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

    constructor(public chatId: string, public username: string) {
    }

    setAction(action: string) {
        this.action = this.actions[action];
    }

    decreaseHp(action: HitAction | Effect, damage: number) {
        if (this.health > damage) {
            this.health -= damage;
        } else {
            this.health = 0;
            this.isDead = true;
        }

        this.currentCombat.battleLog.push(`${action.name} наносит ${Math.ceil(damage)} урона`);
    }

    increaseHp(action: Action | Effect, heal: number) {
        if (this.health + heal > this.healthMax) {
            this.health = this.healthMax;
        } else {
            this.health += heal;
        }

        this.currentCombat.battleLog.push(`${action.name} восстанавливает ${Math.ceil(heal)} здоровья`);
    }

    getResist(type: DamageTypes): number {
        return this.resists[type] || 1;
    }

    addEffect(action: Action | Effect, effect: Effect) {
        this.effects.push(effect);
        this.currentCombat.battleLog.push(`${action.name} накладывает эффек ${effect.name}`);
    }

    getName() {
        return this.character.getName();
    }

    perform(target: Player) {
        this.action.perform(this.currentCombat, this, target);

        Object.keys(this.actions).forEach(key => {
            this.actions[key].tick();
        });

        this.action = undefined;
    }

    tick() {
        this.effects.forEach(effect => {
            effect.tick(this);
        });
    }

    setCharacter(characterName: string) {
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
            case 'вампир':
                this.character = new Vampire();
                break;
            default:
                throw new Error('Unexpected character name');
        }

        this.healthMax = this.character.getHealthMax();
        this.health = this.healthMax;
        this.actions = this.character.getActions();
        this.resists = this.character.getResists();
    }
}