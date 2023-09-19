'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './question.module.css'
import { GlobalContext } from '@/context/Provider'
import { useRouter } from 'next/navigation'

function page({ params }) {
    const router = useRouter()
    const { questions, userData, setUserData, setResult } = useContext(GlobalContext)
    const [selectedOption, setSelectedOption] = useState(null); // State to track the selected option
    // console.log("params", params.id)
    // console.log("questions", questions)
    // console.log("userData ", userData)

    const handleNextClick = async (action) => {
        if (selectedOption !== null) {
            let userDataCopy = JSON.parse(JSON.stringify(userData))
            // Find the current question in userDataCopy
            let currentQuestion = userDataCopy.answers[parseInt(params.id) - 1]
            currentQuestion.answer = selectedOption

            // console.log("userDataCopy", userDataCopy)

            try {
                const response = await fetch('/api/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userDataCopy)
                })
                let updatedUser = await response.json()
                // console.log("updatedUser ", updatedUser)
                setUserData(updatedUser)
                if (action === 'next') {
                    router.push(`/questions/${parseInt(params.id) + 1}`)
                }
                if (action === 'finish') {
                    try {
                        const response = await fetch('/api/quiz', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedUser)
                        })
                        let result = await response.json()
                        console.log("Final result", result)
                        setResult(result)
                        router.push('/result')
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }

        } else {
            alert("Please select an option before moving to the next question.");
        }
    }

    // const handleFinishClick = () => {
    //     if (selectedOption !== null) {
    //         router.push('/result');
    //     } else {
    //         alert("Please select an option before moving to the next question.");
    //     }

    // }

    useEffect(() => {
        if (questions.length === 0) {
            router.push('/');
        }
    }, []);

    const handleOptionChange = (optionIndex) => {
        let selectedAnswer = questions[parseInt(params.id) - 1].options[optionIndex];
        setSelectedOption(selectedAnswer);
    };

    return (
        <div className={styles.pageContainer}>
            <h1>{params.id} / {questions?.length}</h1>
            <h2>{questions?.[params.id - 1]?.question}</h2>
            <div>
                {questions?.[params.id - 1]?.options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            name="options"
                            id={`option${index}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleOptionChange(index)}
                        />
                        <label htmlFor={`option${index}`}>{option}</label>
                    </div>
                ))}
            </div>
            {parseInt(params.id) === questions?.length
                ? <button onClick={() => handleNextClick('finish')}>Finish</button>
                : <button onClick={() => handleNextClick('next')}>Next </button>
            }
        </div>
    )
}

export default page
