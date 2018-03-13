import {Player} from './player';

export abstract class Action {
    abstract perform(player: Player, target: Player): void;
}