'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './homePage.module.css'
import useSWR from 'swr'
import { GlobalContext } from '@/context/Provider'
import { useRouter } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json())

function HomePage({ user }) {
    const router = useRouter()
    const [start, setStart] = useState(false)
    const { data: questionsData, error } = useSWR(start ? '/api/quiz' : null, fetcher)
    const { questions, setQuestions, userData, setUserData } = useContext(GlobalContext)

    console.log("quizQuestions", questionsData)

    const handleStartClick = () => {
        setStart(true)
    }

    console.log("questions", questions)

    useEffect(() => {
        if (questionsData) {
            setUserData(user)
            setQuestions(questionsData)
            router.push(`/questions/${questionsData[0].id}`)
        }
    }, [questionsData])


    return (
        <div className={styles.pageContainer}>
            <h1>Upraised</h1>
            <h3>Quiz</h3>
            <button className='navButton' onClick={handleStartClick}>Start</button>
        </div>
    )
}

export default HomePage