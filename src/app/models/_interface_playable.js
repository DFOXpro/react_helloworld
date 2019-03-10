import {PlayerWidget} from './player_widget.js'
import {ZU_IntanceMethodHelper} from '../utils.js'

/**
 * Interface for classes that should be played.
 *
 * @interface
 * @class
 */
export class _InterfacePlayable {
	static play (playableList){
		console.log('_InterfacePlayable.play', playableList)
		PlayerWidget.play(playableList)
	}

	/**
	 * @TO_BE_OVERRIDE
	 * @method
	 */
	play = ZU_IntanceMethodHelper
}
