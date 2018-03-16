import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';

export class FrostArrowAction extends HitAction {
    private mod = 1;

    perform(player: Player, target: Player) {
        this.mod = 1;

        target.effects = target.effects.filter(effect => {
            if (effect instanceof BurningDotEffect) {
                this.mod += 1;

                return false;
            }

            return true;
        });

        super.perform(player, target);
    }

    protected calcDamage(): number {
        return super.calcDamage() * this.mod;
    }
}