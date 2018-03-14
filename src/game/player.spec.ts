import {Player} from './player';
import {DamageTypes} from './models/damageTypes';

describe('Player', () => {
    let player: Player;

    beforeEach(() => {
        player = new Player('1', 'воин', 'testname');
    });

    describe('decreaseHp', () => {
        it('with no resist', () => {
            player.health = 30;
            player.resists[DamageTypes.CUTTING] = 1;

            player.decreaseHp(10, DamageTypes.CUTTING);

            expect(player.health).toBe(20);
        });

        it('with 0.7 resist', () => {
            player.health = 30;
            player.resists[DamageTypes.CUTTING] = 0.7;

            player.decreaseHp(10, DamageTypes.CUTTING);

            expect(player.health).toBe(23);
        });

        it('health never goes lower than 0', () => {
            player.health = 5;
            player.resists[DamageTypes.CUTTING] = 1;

            player.decreaseHp(10, DamageTypes.CUTTING);

            expect(player.health).toBe(0);
        });

        it('when health goes to 0, player isDead', () => {
            player.health = 5;
            player.resists[DamageTypes.CUTTING] = 1;
            player.isDead = false;

            player.decreaseHp(10, DamageTypes.CUTTING);

            expect(player.isDead).toBe(true);
        });
    });
});