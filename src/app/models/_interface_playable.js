import {PlayerWidget} from './player_widget.js'

export class _InterfacePlayable {
	static play (playableList){
		console.log('_InterfacePlayable.play', playableList)
		PlayerWidget.play(playableList)
	}
}
