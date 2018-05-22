import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = ({ letter, feedback, onClick }) => (
    <div className="col-sm-1" onClick={() => onClick(letter)}>
        <span className={`btn ${feedback} letter`}>{ letter }</span>
    </div>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'btn-danger disabled',
        'btn-success',
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Letter