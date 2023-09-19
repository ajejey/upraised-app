'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './result.module.css'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context/Provider'

function Result() {
    const router = useRouter()
    const { questions, result } = useContext(GlobalContext)
    const [userPoints, setUserPoints] = useState(0)
    const [correct, setCorrect] = useState(0)
    // console.log("Final userData ", userData)
    // console.log("Final questions ", questions)
    // let userAnswers = userData.answers

    // const getPoints = () => {
    //     let finalPoints = 0
    //     let correctAnswers = 0
    //     for (let i = 0; i < questions.length; i++) {
    //         if (questions[i].answer === userAnswers[i].answer) {
    //             finalPoints += questions[i].points
    //             correctAnswers++
    //         }
    //     }
    //     setUserPoints(finalPoints)
    //     setCorrect(correctAnswers)

    // }

    // useEffect(() => {
    //     getPoints()
    // }, [])

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