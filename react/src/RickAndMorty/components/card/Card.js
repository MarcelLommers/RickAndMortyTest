import React from 'react';

export default class Card extends React.Component {

	render () {
		const loading = this.props.loading
		const headContent = this.props.headContent
		const bodyContent = this.props.bodyContent

		let loadingContent = (
			<div className='card-content'>
				<span>Loading...</span>
			</div>
		)

		return (
			<div className={ this.props.className || 'card' }
				 onClick={ this.props.goToTarget }
			>
				{ headContent }
				{ loading ? loadingContent : bodyContent }
			</div>
		)
	}

}