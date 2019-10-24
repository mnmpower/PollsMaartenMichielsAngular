import {Poll} from '../Models/poll.model';
import {Stem} from '../Models/stem.model';

export class Dashboard {
  beheerderPolls: Poll[];
  uitgenodigdePolls: Poll[];
  uitgebrachteStemmen: Stem[];
}
