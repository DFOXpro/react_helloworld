import React, {PureComponent} from 'react'
import {createPortal} from 'react-dom'
	import {ZU_constructorHelper} from '../../utils.js'

import {PlayerWidget} from '../../models/player_widget.js'
import {PlayerWidgetEl} from '../../views_components/organisms/player.jsx'

// DAEMONIC PRIVATE STATICs ... do you know much I hate JS????
let __DOM_ELEMENT_CONTAINER_ID = 'react_hook_player'
let __EVENT_ID_SHOW = Symbol('EVENT_ID_SHOW')
function __domElementContainer() {
	return document.getElementById(__DOM_ELEMENT_CONTAINER_ID)
}
function __popPlayerEvent(eventNameSymbol, eventData) {
	// console.log('__popPlayerEvent', eventNameSymbol, eventData)
	__domElementContainer().dispatchEvent(
		new CustomEvent(eventNameSymbol.description, {detail: eventData})
	)
}

export class PlayerWidgetController extends PureComponent {

	// PRIVATE
	static #EVENT_STATUS_SHOW = __EVENT_ID_SHOW
	#DOM_ELEMENT_CONTAINER_ID = __DOM_ELEMENT_CONTAINER_ID
	#componentError = {}
	#changeStatus = (newStatus) => {
		// console.log('#changeStatus', newStatus)
		if(newStatus) this.setState({status: newStatus})
		__domElementContainer().setAttribute(
			'status',
			(newStatus? newStatus : this.state.status).description
		)
	}
	#addPlayerEvent = (eventNameSymbol, eventFunction) => {
		// console.log('#addPlayerEvent',eventNameSymbol, eventFunction)
		__domElementContainer().addEventListener(
			eventNameSymbol.description,
			(e) => {eventFunction(e.detail)}
		)
	}

	
	#_setPlayerSet = async (media) => {
		console.log('#_setPlayerSet', media)
		if(this.state.status === PlayerWidget.STATUS_CLOSE)
			this.$_DOMeventHandlers.$_handleMinimizeClick()
		this.setState({currentSongTittle: media.title})
		this.setState({currentAlbumCover: media.parent_album.cover})
	}
	#_setPlayerStop = async () => {
		// console.log('#_setPlayerStop')
		await this.setState({player_play: false})
		await this.setState({currentSongTittle: undefined})
		await this.setState({currentAlbumCover: undefined})
	}
	#_setPlayerLoading = () => {
		// console.log('#_setPlayerLoading')
		this.setState({player_loading: true})
		this.setState({player_play: false})
	}
	#_setPlayerPaused = () => {
		this.setState({player_loading: false})
		this.setState({player_play: false})
	}
	#_setPlayerPlaying = () => {
		this.setState({player_loading: false})
		this.setState({player_play: true})
	}

	#stopTrack = async () => {
		PlayerWidget.stop()
	}

	#resumeTrack = PlayerWidget.resumeTrack
	#pauseTrack = PlayerWidget.pause

	// GOD BLESSED STATICs
	static propTypes = PlayerWidget.PROPTYPES
	static show() {
		console.log('PlayerWidgetController.show')
		__popPlayerEvent(__EVENT_ID_SHOW)
	}

	static get isActive(){
		console.log('isActive')
		return !!(
			__domElementContainer().getAttribute('status') !== PlayerWidget.STATUS_CLOSE.description
		)
	}

	constructor (props) {
		super(props)
		// ZU_constructorHelper(
		// 	this.state,
		// 	props,
		// 	PlayerWidget.ATTRIBUTE_LIST
		// )
		this.#changeStatus()
		this.#addPlayerEvent(__EVENT_ID_SHOW, this.$_DOMeventHandlers.$_handleMinimizeClick)
		PlayerWidget.kill()
		PlayerWidget.setStatus_handler(PlayerWidget.STATUS_SET, this.#_setPlayerSet)
		PlayerWidget.setStatus_handler(PlayerWidget.STATUS_STOP, this.#_setPlayerStop)
		PlayerWidget.setStatus_handler(PlayerWidget.STATUS_PAUSED, this.#_setPlayerPaused)
		PlayerWidget.setStatus_handler(PlayerWidget.STATUS_PLAYING, this.#_setPlayerPlaying)
		PlayerWidget.setStatus_handler(PlayerWidget.STATUS_BUFFERING, this.#_setPlayerLoading)
	}


	state = {
		status: PlayerWidget.STATUS_MINIMIZE,
		// tracks: Media array
		// currentSongTittle: ''
		// currentTrack: 0
		// currentAlbumCover: ''
	}
	$_DOMeventHandlers = {
		$_handleOpenClick: () => {
			this.#changeStatus(PlayerWidget.STATUS_OPEN)
		},
		$_handleMinimizeClick: () => {
			this.#changeStatus(PlayerWidget.STATUS_MINIMIZE)
		},
		$_handleCloseClick: async () => {
			this.#changeStatus(PlayerWidget.STATUS_CLOSE)
			await this.#stopTrack()
			PlayerWidget.kill()
		},
		$_handlePlayClick: this.#resumeTrack,
		$_handlePauseClick: this.#pauseTrack
	}

	componentDidCatch(error, info) {
		console.log('componentDidCatch', error, info)
		this.setState({componentDidCatch: true})
		this.#componentError.error = error
		this.#componentError.info = info
	}

	render() {
		// console.log('PlayerWidgetController.render')
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
