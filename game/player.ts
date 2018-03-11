import {Action} from './action';
import {Hit} from './actions/hit';
import {Game} from './game';
import {DamageTypes} from './models/damageTypes';

export class Player {
    game: Game;
    helthMax: number;
    helth: number;
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

    constructor(public chatId: string, character: string, public username: string) {
        this.character = character.toLowerCase();

        switch (this.character) {
            case 'варвар':
                this.helthMax = 140;
                this.availableActions = {
                    'ударить рукой': new Hit(5, 7, DamageTypes.BLUNT),
                    'ударить ногой': new Hit(3, 9, DamageTypes.BLUNT),
                };
                this.resists[DamageTypes.BLUNT] = 1.2;
                this.resists[DamageTypes.CUTTING] = 1.4;
                this.resists[DamageTypes.FIRE] = 1.5;
                this.resists[DamageTypes.FROST] = 1.1;
                break;
            case 'воен':
                this.helthMax = 100;
                this.availableActions = {
                    'ударить мечем': new Hit(5, 7, DamageTypes.CUTTING),
                    'ударить щитом': new Hit(3, 9, DamageTypes.BLUNT),
                };
                this.resists[DamageTypes.BLUNT] = 1.3;
                this.resists[DamageTypes.CUTTING] = 0.9;
                this.resists[DamageTypes.FIRE] = 1.2;
                this.resists[DamageTypes.FROST] = 1.1;
                break;
            case 'маг':
                this.helthMax = 70;
                this.availableActions = {
                    'огненный шар': new Hit(5, 7, DamageTypes.FIRE),
                    'ледяная стрела': new Hit(3, 9, DamageTypes.FROST),
                };
                this.resists[DamageTypes.BLUNT] = 1.5;
                this.resists[DamageTypes.CUTTING] = 1.7;
                this.resists[DamageTypes.FIRE] = 0.5;
                this.resists[DamageTypes.FROST] = 0.5;
                break;
        }

        this.helth = this.helthMax;
    }

    setAction(action: string) {
        this.action = this.availableActions[action];
    }

    decreaseHp(damage: number) {
        if (this.helth > damage) {
            this.helth -= damage;
        } else {
            this.helth = 0;
            this.isDead = true;
        }
    }

    getStatus(): string {
        const percent = this.helth / this.helthMax;

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
        return this.resists[type];
    }
}