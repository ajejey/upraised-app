'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './result.module.css'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context/Provider'
import Image from 'next/image'

function Result() {
    const router = useRouter()
    const { questions, result } = useContext(GlobalContext)


    return (
        <div className={styles.questionsBackground}>
            <div className={styles.pageContainer}>
                <h1>Your result</h1>
                <div>
                    Graph : {result.finalPoints}
                </div>
                <div className={styles.optionsContainer}>
                    <div className={`${styles.option} ${styles.correct} ${styles.optionText}`}>
                        
                            <Image src="/correct.svg" alt="correct" width={32} height={32} />
                        
                        <span>
                            {result.correctAnswers}
                        </span>
                        <span >
                            Correct
                        </span>
                    </div>
                    <div className={`${styles.option} ${styles.incorrect} ${styles.optionText}`}>
                        
                            <Image src="/incorrect.svg" alt="incorrect" width={32} height={32} />
                        
                        <span>{questions.length - result.correctAnswers}</span>
                        <span>
                            Incorrect
                        </span>
                    </div>
                </div>

                <div
                    className='navButton'
                    onClick={() => router.push('/')}
                >
                    <pre></pre>
                    <span>Start Again</span>
                    <pre></pre>
                </div>
                {/* <button onClick={() => router.push('/')}>Start Again</button> */}
            </div>
        </div>
    )
}

export default Result