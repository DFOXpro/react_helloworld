// f***ing private statics
function __isApiReady(){
	return typeof(YT)!== "undefined"
}

export class ZU_youtube {
	static init(){
		if( !__isApiReady()){
			let tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			document.getElementsByTagName('body')[0].insertAdjacentElement('beforeend', tag)
		}
	}
	static playVideo(youtube_player_hook, videoId){
		let player;
		function _asyncHandler(){
			player = new YT.Player(youtube_player_hook, {
				height: '0',
				width: '0',
				videoId: videoId,
				events: {
					onReady: function(event) {
						event.target.playVideo();
					}//,
				// 	'onStateChange': onPlayerStateChange
				}
			})
		};
		if(!__isApiReady()){
			window.onYouTubeIframeAPIReady=_asyncHandler
		}
		else _asyncHandler()

	}

	// 5. The API calls this function when the player's state changes.
	//		The function indicates that when playing a video (state=1),
	//		the player should play for six seconds and then stop.
	// let done = false;
	// function onPlayerStateChange(event) {
	// 	if (event.data == YT.PlayerState.PLAYING && !done) {
	// 		setTimeout(stopVideo, 6000);
	// 		done = true;
	// 	}
	// }
	// function stopVideo() {
	// 	player.stopVideo();
	// }
}