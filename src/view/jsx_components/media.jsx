import React from 'react';
import '../../style/media.styl';

export default class Media extends React.Component {
	render() {
		return (pug`
._media
	img(
		src=""
		alt=""
		height="2em"
		width="4em"
	)
	h3._media_title asd
	p._media_content qwe
`)
	}
}
