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
	// console.log('__popPlayerEvent', eventNameSymbol, eventData);
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
		// console.log('#addPlayerEvent',eventNameSymbol, eventFunction);
		__domElementContainer().addEventListener(
			eventNameSymbol.description,
			(e) => {eventFunction(e.detail)}
		);
	};

	#currentTrack = null
	#currentTracks = []
	#_setPlayerLoading = () => {
		console.log('#_setPlayerLoading');
		this.setState({player_loading: true});
		this.setState({player_play: false});
	}
	#_setPlayerPaused = () => {
		console.log('#pauseTrack', this.#currentTrack);
		if(
			this.#currentTrack &&
			this.#currentTrack.type === 'youtube'
		) ZU_youtube.pauseVideo()
		this.setState({player_loading: false});
		this.setState({player_play: false});
	}
	#_setPlayerPlaying = () => {
		this.setState({player_loading: false});
		this.setState({player_play: true});
	}
	#playTrack = async (track) => {
		track = track || this.#currentTracks.pop()
		console.log('#playTrack', track);
		this.#currentTrack = track
		this.setState({currentSongTittle: track.title});
		if(track.type === 'youtube'){
			ZU_youtube.init('youtube_player_hook');
			await ZU_youtube.playVideo(track.src)
			ZU_youtube.setVideoStatusHandler(
				ZU_youtube.STATUS_PLAYING,
				this.#_setPlayerPlaying
			)
			ZU_youtube.setVideoStatusHandler(
				ZU_youtube.STATUS_BUFFERING,
				this.#_setPlayerLoading
			)
		}
	}
	#queueNextTracks = async () => {
		console.log('#queueNextTracks');
		let _queueNextTracks = () => {
			console.log('#queueNextTracks', this.#currentTracks);
			if(this.#currentTracks.length)
				this.#playTrack()
		}
		if(this.#currentTrack.type === 'youtube'){
			ZU_youtube.setVideoStatusHandler(
				ZU_youtube.STATUS_ENDED,
				_queueNextTracks
			);
		}
	}
	#resumeTrack = async () => {
		if(
			this.#currentTrack &&
			this.#currentTrack.type === 'youtube'
		) ZU_youtube.resumeVideo()
	}
	#pauseTrack = this.#_setPlayerPaused
	#stopTrack = async () => {
		console.log('#stopTrack', this.#currentTrack);
		if(
			this.#currentTrack &&
			this.#currentTrack.type === 'youtube'
		) {
			ZU_youtube.stopVideo();
			this.#currentTrack = null;
			this.#currentTracks = undefined;
		}
		await this.setState({currentSongTittle: undefined});
		await this.setState({currentAlbum: undefined})
	}
	
	#playTracks = async data => {
		console.log('#playTracks', data);
		this.#currentTracks = data.tracks;
		await this.#stopTrack();
		await this.#playTrack();
		this.#queueNextTracks();
		this.setState({currentAlbum: data.album});
		if(this.state.status === PlayerWidget.STATUS_CLOSE)
			this.$_DOMeventHandlers.$_handleMinimizeClick();
	}

	// GOD BLESSED STATICs
	static propTypes = PlayerWidget.PROPTYPES;
	static show() {
		console.log('PlayerWidgetController.show')
		__popPlayerEvent(__EVENT_ID_SHOW)
	}
	static playTracks(newTracksAlbum) {
		newTracksAlbum = {
			tracks: [...newTracksAlbum.tracks],
			album: {...newTracksAlbum.album}
		}
		console.log('PlayerWidgetController.playTracks', newTracksAlbum);
		__popPlayerEvent(__EVENT_ID_PLAY_TRACKS, newTracksAlbum)
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
		this.#addPlayerEvent(__EVENT_ID_SHOW, this.$_DOMeventHandlers.$_handleMinimizeClick);
		this.#addPlayerEvent(__EVENT_ID_PLAY_TRACKS, this.#playTracks);
	}


	state = {
		status: PlayerWidget.STATUS_MINIMIZE,
		// tracks: Media array
		// currentSongTittle
		// currentTrack
		// currentAlbum
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
			this.#stopTrack();
		},
		$_handlePlayClick: this.#resumeTrack,
		$_handlePauseClick: this.#_setPlayerPaused
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
