import 'babel-polyfill' // for dynamic import
import {initMVC} from '../controllers_containers/index_controller.jsx'
import {_SearchController} from '../controllers_containers/_search_controller.js'
import {Album} from '../models/album.js'
import {Media} from '../models/media.js'
import {Playlist} from '../models/playlist.js'

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

	let main = async () => {
		// Init the react MVC
		const playlistsData = await _getPlaylistData()
		initMVC('react_hook_main', playlistsData)
	}
	main()
})()
