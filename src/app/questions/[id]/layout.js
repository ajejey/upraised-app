import React from 'react'
import styles from './question.module.css'

function layout({ children }) {
    return (
        <div className='container'>

            {children}

        </div>
    )
}

export default layout