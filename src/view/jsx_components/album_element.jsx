import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {MediaEl} from './media_element.jsx';
import {ZU_constructorHelper} from '../../logic/utils.js'
import '../../style/album.styl';
import DEFAULT_MEDIA_IMG from '../../assets/images/no_cover.jpg'

export class AlbumEl extends PureComponent {
	static propTypes = { // https://www.npmjs.com/package/prop-types#usage
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		description: PropTypes.string,
		cover: PropTypes.string, //.isRequired, useless with default states
		year: PropTypes.number.isRequired,
		tracks: PropTypes.array,
	};

	constructor (props) {
		// console.log('Playlist init', props);
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			['title', 'description', 'cover', 'year', 'tracks']
		);
	}

	state = {
		cover: DEFAULT_MEDIA_IMG,
		tracks: []
	}
	//
	// handleClick = (event) => {
	// 	console.log(event, this.state.title);
	// 	this.setState({content: 'Cambió algo'})
	// }
	render() {
		console.log('Playlist state', this.state);
		return (pug`
			details._album
				summary._album_title
					h3= this.state.title
				img(
					src= this.state.cover
				)
				p
					b Year:
					span=this.state.year
					br
					span= this.state.description
				each media, media_index in this.state.tracks
					MediaEl(
						...media
						key= media_index
					)
		`)
	}
}
