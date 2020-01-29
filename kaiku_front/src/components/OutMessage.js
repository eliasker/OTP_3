import React from 'react'

const OutMessage = ({ content }) => {
	return (
		<div class="out-container">
			<div class="out-message">
				<p>{content}</p>
				<span class="message-date"> 12.41, Tänään</span>
			</div>
		</div>
	)
}

export default OutMessage