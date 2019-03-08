import PropTypes from 'prop-types';
import {YoutubeBridge} from '../vendors/youtube_bridge.js'
import {_InterfacePlayerBridge} from '../vendors/_interface_player_bridge.js'

let __YOUTUBE_PLAYER_HOOK = 'youtube_player_hook'
let __currentMedia = null
let __currentPlayer = null
let __currentMediaList = []
let __status_handler = {}

let __getMediaVendorPlayer = media => {
	// console.log('__getMediaVendorPlayer', media)
	if(media.type === 'youtube') return YoutubeBridge
}
let __getCurrentVendorPlayer = () => {
	if(__currentPlayer)
		return __currentPlayer
	if(__currentMedia)
		__currentPlayer = __getMediaVendorPlayer(__currentMedia)
		return __currentPlayer
}
let __setCurrentVendorPlayerStatusHandler = status => {
	__getCurrentVendorPlayer().setStatusHandler(
		status,
		__status_handler[status]
	)
}

let __play = async (media) => {
		media = media || __currentMediaList.shift()
		console.log('_play', media)
		__currentMedia = media
		__status_handler[_InterfacePlayerBridge.STATUS_SET](media)
		__getCurrentVendorPlayer().init(__YOUTUBE_PLAYER_HOOK)
		await __getCurrentVendorPlayer().play(media.src)
		PlayerWidget.setStatus_handler(PlayerWidget.STATUS_ENDED, () => {
			console.log('#_playNextTrack', __currentMediaList)
			if(__currentMediaList.length) __play()
		})
		__setCurrentVendorPlayerStatusHandler(_InterfacePlayerBridge.STATUS_ENDED)
		__setCurrentVendorPlayerStatusHandler(_InterfacePlayerBridge.STATUS_PAUSED)
		__setCurrentVendorPlayerStatusHandler(_InterfacePlayerBridge.STATUS_PLAYING)
		__setCurrentVendorPlayerStatusHandler(_InterfacePlayerBridge.STATUS_BUFFERING)
	}

export class PlayerWidget {
	static STATUS_OPEN = Symbol('OPEN');
	static STATUS_MINIMIZE = Symbol('MINIMIZE');
	static STATUS_CLOSE = Symbol('CLOSE');

	static STATUS_SET = _InterfacePlayerBridge.STATUS_SET
	static STATUS_STOP = _InterfacePlayerBridge.STATUS_STOP
	static STATUS_ENDED = _InterfacePlayerBridge.STATUS_ENDED
	static STATUS_PAUSED = _InterfacePlayerBridge.STATUS_PAUSED
	static STATUS_PLAYING = _InterfacePlayerBridge.STATUS_PLAYING
	static STATUS_BUFFERING = _InterfacePlayerBridge.STATUS_BUFFERING

	static ATTRIBUTE_LIST = ['status', 'media', 'playlist']
	// static DEFAULT_STATUS = Symbol('MINIMIZE')

	static PROPTYPES = { // https://www.npmjs.com/package/prop-types#usage
		media: PropTypes.object,
		playlist: PropTypes.object,
		status: PropTypes.symbol
	};

	static setStatus_handler = (statusSymbol, callback) => {
		__status_handler[statusSymbol] = callback
	}

	static play = async mediaList => {
		console.log('PlayerWidget.play', mediaList)
		await PlayerWidget.stop()
		__currentMediaList = [...mediaList]
		__play()
	}

	static stop = async () => {
		console.log('PlayerWidget.stop', __currentMedia)
		if(__currentMedia)
			__getCurrentVendorPlayer().stop()
		__currentMedia = null
		__currentMediaList = []
		await __status_handler[_InterfacePlayerBridge.STATUS_STOP]()
	}

	static kill = () => {
		let player = __getCurrentVendorPlayer()
		// console.log('PlayerWidget.kill', player);
		if(player) player.kill()
	}
	static pause = () => {
		let player = __getCurrentVendorPlayer()
		if(player) player.pause()
	}
	static resumeTrack = async () => {
		let player = __getCurrentVendorPlayer()
		if(player) player.resume()
	}
}
