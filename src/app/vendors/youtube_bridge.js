import {_InterfacePlayerBridge} from './_interface_player_bridge.js'

// f***ing private statics
function __isApiReady() {
	return typeof(YT)!== "undefined"
}
let _singleton_youtube_player_hook = ""
let _singleton_youtube_player_obj = null
let _singleton_youtube_player_states_handlers = {}

export class YoutubeBridge {

	static init(youtube_player_hook) {
		_singleton_youtube_player_hook = youtube_player_hook
		if( !__isApiReady()){
			let tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			document.getElementsByTagName('body')[0].insertAdjacentElement('beforeend', tag)
		}
	}
	static play(videoId) {
		return new Promise(function(resolve, reject) {
			function _asyncHandler(){
				_singleton_youtube_player_obj = new YT.Player(_singleton_youtube_player_hook, {
					videoId: videoId,
					events: {
						onReady: (event) => {
							event.target.playVideo();
						},
						onStateChange: (event) => {
							// console.log('onStateChange', event);
							switch (event.data) {
								case 0: // (ended)
									if(_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_ENDED.description])
										_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_ENDED.description]();
									break;
								case 1: // (playing)
									console.log('YT.resume')
									if(_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_PLAYING.description])
										_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_PLAYING.description]();
									break;
								case 2: // (paused)
									console.log('YT.pause')
									if(_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_PAUSED.description])
										_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_PAUSED.description]();
									break;
								case 3: // (buffering)
									if(_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_BUFFERING.description])
										_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_BUFFERING.description]();
									break;
								// case 5: // (video cued). // Not used
								// 	if(_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_VIDEO_CUED.description])
								// 		_singleton_youtube_player_states_handlers[_InterfacePlayerBridge.STATUS_VIDEO_CUED.description]();
								// 	break;
								default:
									
							}
						},
					}
				})
				resolve()
			};
			if(_singleton_youtube_player_obj) {
				_singleton_youtube_player_obj.loadVideoById({
					videoId: videoId,
					startSeconds: 0
				});
				resolve()
			} else if(!__isApiReady()){
				window.onYouTubeIframeAPIReady = _asyncHandler
			}
			else _asyncHandler()
		})
	}

	static setStatusHandler(statusId, callback) {
		// console.log('setVideoStatusHandler', statusId, callback);
		_singleton_youtube_player_states_handlers[statusId.description] = callback
	}
	static pause() {
		_singleton_youtube_player_obj.pauseVideo()
	}
	static resume() {
		_singleton_youtube_player_obj.playVideo()
	}
	static stop() {
		console.log('YT.stop', _singleton_youtube_player_obj);
		_singleton_youtube_player_obj && _singleton_youtube_player_obj.stopVideo()
		_singleton_youtube_player_states_handlers = {}
	}

	static kill() {
		// console.log('YT.kill')
		_singleton_youtube_player_obj = null
	}
}
