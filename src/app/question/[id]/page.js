'use client'
import React, { useContext, useEffect } from 'react'
import styles from './question.module.css'
import { GlobalContext } from '@/context/Provider'
import { useRouter } from 'next/navigation'

function page({ params }) {
    const router = useRouter()
    const { questions, setQuestions } = useContext(GlobalContext)
    console.log("params", params.id)
    console.log("questions", questions)

    const handleNextClick = () => {
        router.push(`/question/${parseInt(params.id) + 1}`)
    }

    const handleFinishClick = () => {
        router.push('/result')
    }

    useEffect(() => {
        if (questions.length === 0) {
            router.push('/')
        }
    }, [])

    return (
        <div className={styles.pageContainer}>
            <h1>{params.id} / {questions?.length}</h1>
            <h2>{questions?.[params.id - 1]?.question}</h2>
            <div>
                {questions?.[params.id - 1]?.options.map((option, index) => (
                    <div key={index}>{option}</div>
                ))}
            </div>
            {parseInt(params.id) + 1 < questions?.length
                ? <button onClick={handleNextClick}>Next </button>
                : <button onClick={handleFinishClick}>Finish</button>
            }

        </div>
    )
}

export default page