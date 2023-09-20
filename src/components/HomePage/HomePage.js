'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './homePage.module.css'
import useSWR from 'swr'
import { GlobalContext } from '@/context/Provider'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
            <div>
                <Image
                    src="/logo.png"
                    alt="upraised logo"
                    width={291}
                    height={70}
                />

            </div>
            <div className={styles.hero}>
                <span>Quiz</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="432" height="396" viewBox="0 0 432 396" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M216 396C335.294 396 432 307.352 432 198C432 88.6476 335.294 0 216 0C96.7065 0 0 88.6476 0 198C0 307.352 96.7065 396 216 396Z" fill="white" />
                </svg>
            </div>
            <div
                className='navButton'
                onClick={handleStartClick}
            >
                <pre></pre>
                <span>Start</span>
                <pre></pre>
            </div>
        </div>
    )
}

export default HomePage