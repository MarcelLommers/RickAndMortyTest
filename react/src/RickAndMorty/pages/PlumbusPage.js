import React from 'react';

import '../css/pages/PlumbusPage.scss';

export default class PlumbusPage extends React.Component {

	state = {
		videoResources: [
			{
				title: 'Plumbus: How do they they do it',
				embedUrl: 'https://www.youtube.com/embed/eMJk4y9NGvE'
			}
		]
	}

	render (props) {
		return (
			<div className='PlumbusPage'>
				<h1>
					{ this.state.videoResources[0].title }
				</h1>

				<iframe className='plumbus-video'
								title={ this.state.videoResources[0].title }
								src={ this.state.videoResources[0].embedUrl }
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
				>
				</iframe>
			</div>
		)
	}
}
