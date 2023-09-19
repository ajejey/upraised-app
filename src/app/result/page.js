'use client'
import React from 'react'
import styles from './result.module.css'
import { useRouter } from 'next/navigation'

function Result() {
    const router = useRouter()



    return (
        <div className={styles.pageContainer}>
            <h1>Your result</h1>
            <div>
                Graph
            </div>
            <div>
                Correct
            </div>
            <div>
                Incorrect
            </div>
            <button onClick={() => router.push('/')}>Start Again</button>
        </div>
    )
}

export default Result