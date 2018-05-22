
import React from 'react'
import PropTypes from 'prop-types'

import './GuessLetter.css'

const GuessLetter = ({ letter }) => (
    <div className="col-sm-1">
        <span className={`${letter !== ' ' ? 'btn btn-default letter disabled' : ''}`}>{ letter }</span>
    </div>
)

GuessLetter.propTypes = {
    letter: PropTypes.string.isRequired
}

export default GuessLetter