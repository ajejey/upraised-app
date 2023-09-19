'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './homePage.module.css'
import useSWR from 'swr'
import { GlobalContext } from '@/context/Provider'

const fetcher = (url) => fetch(url).then((res) => res.json())

function HomePage() {
    const [start, setStart] = useState(false)
    const { data, error } = useSWR(start ? '/api/quiz' : null, fetcher)
    const { questions, setQuestions } = useContext(GlobalContext)

    console.log("quizQuestions", data)

    const handleStartClick = () => {
        setStart(true)
    }

    console.log("questions", questions)

    useEffect(() => {
        setQuestions(data)
    }, [data])


    return (
        <div className={styles.pageContainer}>
            <h1>Upraised</h1>
            <h3>Quiz</h3>
            <button onClick={handleStartClick}>Start</button>
        </div>
    )
}

export default HomePage