import React, {PureComponent} from 'react';
import {createPortal} from 'react-dom';
import {ZU_constructorHelper} from '../utils.js'
import {ZU_youtube} from '../vendors/youtube.js'

import {PlayerWidget} from '../models/player.js';
import {PlayerWidgetEl} from '../views_components/player_widget_element.jsx';

// DAEMONIC PRIVATE STATICs ... do you know much I hate JS????
let __DOM_ELEMENT_CONTAINER_ID = 'react_hook_player';
let __EVENT_ID_SHOW = Symbol('EVENT_ID_SHOW');
let __EVENT_ID_PLAY_TRACKS = Symbol('EVENT_ID_PLAY_TRACKS');
function __domElementContainer() {
	return document.getElementById(__DOM_ELEMENT_CONTAINER_ID);
};
function __popPlayerEvent(eventNameSymbol, eventData) {
	__domElementContainer().dispatchEvent(
		new CustomEvent(eventNameSymbol.description, {detail: eventData})
	);
};

export class PlayerWidgetController extends PureComponent {

	// PRIVATE
	static #EVENT_STATUS_SHOW = __EVENT_ID_SHOW
	#DOM_ELEMENT_CONTAINER_ID = __DOM_ELEMENT_CONTAINER_ID
	#componentError = {};
	#changeStatus = (newStatus) => {
		// console.log('#changeStatus', newStatus);
		if(newStatus) this.setState({status: newStatus});
		__domElementContainer().setAttribute(
			'status',
			(newStatus? newStatus : this.state.status).description
		)
	}
	#addPlayerEvent = (eventNameSymbol, eventFunction) => {
		__domElementContainer().addEventListener(
			eventNameSymbol.description,
			(e) => {eventFunction(e.detail)}
		);
	};
	#playTrack = (track) => {
		console.log('#playTrack',track);
		this.setState({currentTrack: track});
		this.setState({currentSongTittle: track.title});
		if(track.type === 'youtube'){
			ZU_youtube.init();
			ZU_youtube.playVideo('youtube_player_hook', track.src)
		}
	}
	#playTracks = data => {
		console.log('#playTracks', data.tracks);
		this.#playTrack(data.tracks.pop())
		this.setState({tracks: data.tracks});
		
	}

	#getCurrentTrack = () => {
		let currentTrack = this.state.tracks.pop()
		this.setState({tracks: currentTrack});
		return currentTrack
	}


	// GOD BLESSED STATICs
	static propTypes = PlayerWidget.PROPTYPES;
	static show() {
		__popPlayerEvent(__EVENT_ID_SHOW)
	}
	static playTracks(newTracks) {
		// console.log('PlayerWidgetController.playTracks', newTracks);
		__popPlayerEvent(__EVENT_ID_PLAY_TRACKS, {tracks: newTracks})
	}

	static get isActive(){
		console.log('isActive');
		return !!(
			__domElementContainer().getAttribute('status') !== PlayerWidget.STATUS_CLOSE.description
		)
	}

	constructor (props) {
		super(props);
		// ZU_constructorHelper(
		// 	this.state,
		// 	props,
		// 	PlayerWidget.ATTRIBUTE_LIST
		// );
		this.#changeStatus();
		this.#addPlayerEvent(__EVENT_ID_SHOW, this.$_DOMeventHandlers.minimizeClick);
		this.#addPlayerEvent(__EVENT_ID_PLAY_TRACKS, this.#playTracks);

	}


	state = {
		status: PlayerWidget.STATUS_MINIMIZE,
		// tracks: Media array
		// currentSongTittle
		// currentTrack
	}
	$_DOMeventHandlers = {
		$_handleOpenClick: () => {
			this.#changeStatus(PlayerWidget.STATUS_OPEN)
		},
		$_handleMinimizeClick: () => {
			this.#changeStatus(PlayerWidget.STATUS_MINIMIZE)
		},
		$_handleCloseClick: () => {
			this.#changeStatus(PlayerWidget.STATUS_CLOSE)
		}
	}

	componentDidCatch(error, info) {
		console.log('componentDidCatch', error, info);
		this.setState({componentDidCatch: true})
		this.#componentError.error = error
		this.#componentError.info = info
	}

	render() {
		// console.log('PlayerWidgetController.render', __domElementContainer());
		return (createPortal(pug`
			if this.state.componentDidCatch
				img.loading(src = '../../assets/images/loading.png')
				h4 :( Algo malo pasó
				// p
				// 	span= this.#componentError.error
				// 	span= this.#componentError.info
			if this.state.status !== PlayerWidget.STATUS_CLOSE
				PlayerWidgetEl(
					...this.state
					...this.$_DOMeventHandlers
				)
					#youtube_player_hook
		`, __domElementContainer()
		))
	}
}
