import {Player} from './player';
import {DamageTypes} from './models/damageTypes';
import {HitAction} from './actions/hitAction';
import {Combat} from './combat';

describe('Player', () => {
    let player: Player;
    const action = new HitAction('', 0, 0, DamageTypes.CUTTING);

    beforeEach(() => {
        player = new Player('1', 'testname');
        player.setCharacter('воин');
        player.currentCombat = new Combat();
    });

    describe('decreaseHp', () => {
        it('normal damage', () => {
            player.health = 30;
            player.resists[DamageTypes.CUTTING] = 1;

            player.decreaseHp(action, 10);

            expect(player.health).toBe(20);
        });

        it('health never goes lower than 0', () => {
            player.health = 5;
            player.resists[DamageTypes.CUTTING] = 1;

            player.decreaseHp(action, 10);

            expect(player.health).toBe(0);
        });

        it('when health goes to 0, player isDead', () => {
            player.health = 5;
            player.resists[DamageTypes.CUTTING] = 1;
            player.isDead = false;

            player.decreaseHp(action, 10);

            expect(player.isDead).toBe(true);
        });
    });
});