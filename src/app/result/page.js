'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './result.module.css'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context/Provider'

function Result() {
    const router = useRouter()
    const { questions, result } = useContext(GlobalContext)


    return (
        <div className={styles.pageContainer}>
            <h1>Your result</h1>
            <div>
                Graph : {result.finalPoints}
            </div>
            <div>
                Correct : {result.correctAnswers}
            </div>
            <div>
                Incorrect : {questions.length - result.correctAnswers}
            </div>
            <button onClick={() => router.push('/')}>Start Again</button>
        </div>
    )
}

export default Result