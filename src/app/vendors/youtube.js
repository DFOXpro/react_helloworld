// f***ing private statics
function __isApiReady() {
	return typeof(YT)!== "undefined"
}
let _singleton_youtube_player_hook = ""
let _singleton_youtube_player_obj = null
let _singleton_youtube_player_states_handlers = {}
let __YT_STATUS_ENDED = Symbol('YT_STATUS_ENDED');
let __YT_STATUS_PLAYING = Symbol('YT_STATUS_PLAYING');
let __YT_STATUS_PAUSED = Symbol('YT_STATUS_PAUSED');
let __YT_STATUS_BUFFERING = Symbol('YT_STATUS_BUFFERING');
let __YT_STATUS_VIDEO_CUED = Symbol('YT_STATUS_VIDEO_CUED');

export class ZU_youtube {

	static STATUS_ENDED = __YT_STATUS_ENDED
	static STATUS_PLAYING = __YT_STATUS_PLAYING
	static STATUS_PAUSED = __YT_STATUS_PAUSED
	static STATUS_BUFFERING = __YT_STATUS_BUFFERING
	static STATUS_VIDEO_CUED = __YT_STATUS_VIDEO_CUED

	static init(youtube_player_hook) {
		_singleton_youtube_player_hook = youtube_player_hook
		if( !__isApiReady()){
			let tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			document.getElementsByTagName('body')[0].insertAdjacentElement('beforeend', tag)
		}
	}
	static playVideo(videoId) {
		return new Promise(function(resolve, reject) {
			function _asyncHandler(){
				_singleton_youtube_player_obj = new YT.Player(youtube_player_hook, {
					videoId: videoId,
					events: {
						onReady: (event) => {
							event.target.playVideo();
						},
						onStateChange: (event) => {
							// console.log('onStateChange', event);
							switch (event.data) {
								case 0: // (ended)
									console.log('ASD', _singleton_youtube_player_states_handlers);
									if(_singleton_youtube_player_states_handlers[__YT_STATUS_ENDED.description])
										_singleton_youtube_player_states_handlers[__YT_STATUS_ENDED.description]();
									break;
								case 1: // (playing)
									if(_singleton_youtube_player_states_handlers[__YT_STATUS_PLAYING.description])
										_singleton_youtube_player_states_handlers[__YT_STATUS_PLAYING.description]();
									break;
								// case 2: // (paused) // Not used handle outside
								// 	if(_singleton_youtube_player_states_handlers[__YT_STATUS_PAUSED.description])
								// 		_singleton_youtube_player_states_handlers[__YT_STATUS_PAUSED.description]();
								// 	break;
								case 3: // (buffering)
									if(_singleton_youtube_player_states_handlers[__YT_STATUS_BUFFERING.description])
										_singleton_youtube_player_states_handlers[__YT_STATUS_BUFFERING.description]();
									break;
								// case 5: // (video cued). // Not used
								// 	if(_singleton_youtube_player_states_handlers[__YT_STATUS_VIDEO_CUED.description])
								// 		_singleton_youtube_player_states_handlers[__YT_STATUS_VIDEO_CUED.description]();
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

	static setVideoStatusHandler(statusId, callback) {
		console.log('setVideoStatusHandler', statusId, callback);
		_singleton_youtube_player_states_handlers[statusId.description] = callback
	}
	static pauseVideo() {
		console.log('YT.pauseVideo')
		_singleton_youtube_player_obj.pauseVideo()
	}
	static resumeVideo() {
		console.log('YT.resumeVideo')
		_singleton_youtube_player_obj.playVideo()
	}
	static stopVideo() {
		console.log('YT.stopVideo', _singleton_youtube_player_obj, _singleton_youtube_player_hook);
		_singleton_youtube_player_obj && _singleton_youtube_player_obj.stopVideo()
		_singleton_youtube_player_states_handlers = {}
	}
}
