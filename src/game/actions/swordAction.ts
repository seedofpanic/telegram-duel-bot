import {DamageTypes} from '../models/damageTypes';
import {HitAction} from './hitAction';

export class SwordAction extends HitAction {
    constructor() {
        super(5, 7, DamageTypes.CUTTING, 0.2, 2);
    }
}