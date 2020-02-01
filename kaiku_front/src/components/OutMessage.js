import React from 'react'

const OutMessage = ({ content, username }) => {
	return (
		<div className="out-container">
			<div className="out-message">
				<p>{content}</p>
				<span className="message-date"> 12.41, Tänään</span>
			</div>
		</div>
	)
}

export default OutMessage