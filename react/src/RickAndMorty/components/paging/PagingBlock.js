import React from 'react';

import '../../css/paging/PagingBlock.scss';

export default class PagingBlock extends React.Component {

	state = {
	}

	constructor (props) {
		super(props);

		this.loadPrev = props.loadPrev
		this.loadNext = props.loadNext
	}

	render () {

		const currentPage = this.props.currentPage
		const listInfo = this.props.listInfo

		return (
			<div
				className='paging-block'
			>
				<button
					className='nav-button'
					disabled={ !listInfo.prev }
					onClick={ this.loadPrev }
				>
					{ '<' }
				</button>

				<span
					className='paging-display'
				>
					{ currentPage + ' / ' + listInfo.pages }
				</span>

				<button
					className='nav-button'
					disabled={ !listInfo.next }
					onClick={ this.loadNext }
				>
					{ '>' }
				</button>
			</div>
		)
	}
}