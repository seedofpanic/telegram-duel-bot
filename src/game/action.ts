import {Player} from './player';

export class Action {
    charges: number;
    recharge = 0;

    constructor(private cooldown = 0, private maxCharges = 1) {
        this.charges = maxCharges;
    }

    isAvailable(): boolean {
        return this.charges > 0;
    }

    perform(player?: Player, target?: Player) {
        this.charges--;
    }

    tick() {
        if (this.charges >= this.maxCharges) {
            return;
        }

        if (this.recharge >= this.cooldown) {
            this.charges += 1;
            this.recharge = 0;
        } else {
            this.recharge++;
        }
    }
}