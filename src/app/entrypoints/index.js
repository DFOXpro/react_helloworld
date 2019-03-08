/**
 * @file This is the main JS file, it contains the main()
 * @author (DFOXpro) Daniel Zorro <dfoxpro+react@gmail.com>
 * @version 1.1.0
 * @namespace ZorroMusique
 */

import 'babel-polyfill' // for dynamic import
import {initMVC} from '../controllers_containers/pages/index.jsx'
import {_SearchController} from '../controllers_containers/_search_controller.js'
import {Album} from '../models/album.js'
import {Media} from '../models/media.js'
import {Playlist} from '../models/playlist.js'

/**
 * @name Main
 * @function
 * @memberOf ZorroMusique
 */
(()=>{
	let _getPlaylistData = async () => {
		// Load the data values
		const apiIndexData = await import('../../data_fixtures/api_index.json')
		// console.log('api_index data', apiIndexData, typeof(apiIndexData))
		let digestedData = {
			playlists: []
		}

		// let dataDigestStart = performance.now()
		_SearchController.resetSearchData()

		apiIndexData.playlists.forEach(playlist => {
			let _albums = []
			let _playlist = new Playlist(playlist, _albums)
			playlist.albums.forEach( album => {
				let _mediaList = []
				let _album = new Album(album, _mediaList, _playlist)
				album.tracks.forEach( media => {
					let _media = new Media(media, _album)
					_mediaList.push(_media)
				})
				_albums.push(_album)

				_SearchController.addSearchData(
					_album.tracks,
					Media.SEARCHABLE_ATTRIBUTE_LIST
				)
			})
			digestedData.playlists.push(_playlist)

			_SearchController.addSearchData(
				_playlist.albums,
				Album.SEARCHABLE_ATTRIBUTE_LIST
			)

		})
		_SearchController.addSearchData(
			digestedData.playlists,
			Playlist.SEARCHABLE_ATTRIBUTE_LIST
		)


		// console.log('data digested in', performance.now() - dataDigestStart)
		console.log('api_index digested', digestedData) // , apiIndexData)
		return digestedData
	}

	let fixFuckingChromeCSSBugs = () => {
		// WHY HERE AND NO IN CSS?: Because the intent design works flawlessly in all browsers but Chrome
		// and since css has no pure selector to X browsers this implementation is the more consistent
		console.log('fixFuckingChromeCSSImgBug')
		// the next code thanks to a long standing chrome bug, do you know how much I hate Google???
		// https://bugs.chromium.org/p/chromium/issues/detail?id=503000
		// and yeah I try to fix in css but there is no up2date stackoverflow or any other useful solution
		if (navigator.appVersion.indexOf("Chrome/") != -1) {
			let sheet = window.document.styleSheets[0]
			sheet.insertRule(
				// max-width ($ZM_PLAYER_HEIGHT/10)*8
				"#react_hook_player[status='MINIMIZE'] ._player_widget_img{max-width:3.2rem;}",
				sheet.cssRules.length
			)
			// chrome bug (again) under certain circustance the width get broken
			sheet.insertRule(
				// min-width $ZM_PLAYER_HEIGHT
				"._player_widget_controls{min-width: 4rem;}",
				sheet.cssRules.length
			)
		}
	}

	/*
	 * Start the platform with the react engine
	 * @memberOf ZorroMusique
	 */
	let main = async () => {
		// Init the react MVC
		const playlistsData = await _getPlaylistData()
		initMVC('react_hook_main', playlistsData)
		fixFuckingChromeCSSBugs()
	}
	main()
})()
