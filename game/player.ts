import {Action} from './action';
import {Hit} from './actions/hit';
import {Game} from './game';

export class Player {
    game: Game;
    helthMax: number;
    helth: number;
    availableActions: {[name: string]: Action};
    action: Action;
    isDead: boolean;
    character: string;

    constructor(public chatId: string, character: string, public username: string) {
        this.character = character.toLowerCase();

        switch (this.character) {
            case 'варвар':
                this.helthMax = 140;
                this.availableActions = {
                    'ударить рукой': new Hit(5, 7),
                    'ударить ногой': new Hit(3, 9),
                };
                break;
            case 'воен':
                this.helthMax = 100;
                this.availableActions = {
                    'ударить мечем': new Hit(5, 7),
                    'ударить щитом': new Hit(3, 9),
                };
                break;
            case 'маг':
                this.helthMax = 70;
                this.availableActions = {
                    'огненный шар': new Hit(5, 7),
                    'ледяная стрела': new Hit(3, 9),
                };
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
}