'use client'
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import styles from './question.module.css'
import { GlobalContext } from '@/context/Provider'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function page({ params }) {
    const router = useRouter()
    const { questions, userData, setUserData, setResult } = useContext(GlobalContext)
    const [selectedOption, setSelectedOption] = useState(null); // State to track the selected option
    const [startTime, setStartTime] = useState(null);
    // console.log("params", params.id)
    // console.log("questions", questions)
    console.log("userData ", userData)

    const draw = {
        hidden: { pathLength: ((parseInt(params.id) - 1) / questions?.length), opacity: 0 },
        visible: (i) => {
            const delay = 0;
            const completed = (parseInt(params.id) / questions?.length)
            return {
                pathLength: completed,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

    const handleNextClick = async (action) => {
        // Check if an option is selected
        if (selectedOption !== null) {
            const timeToAnswer = new Date() - startTime;

            // Create a copy of the userData object
            let userDataCopy = JSON.parse(JSON.stringify(userData));

            // Find the current question in userDataCopy and update selectedOption and timeToAnswer
            let currentQuestion = userDataCopy.answers[parseInt(params.id) - 1];
            currentQuestion.answer = selectedOption;
            currentQuestion.timeToAnswer = timeToAnswer;
            try {
                // Update the user data on the server
                const response = await fetch('/api/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userDataCopy)
                });
                let updatedUser = await response.json();
                setUserData(updatedUser);

                // Redirect to the next question if action is 'next'
                if (action === 'next') {
                    router.push(`/questions/${parseInt(params.id) + 1}`);
                }

                // Finish the quiz if action is 'finish'
                if (action === 'finish') {
                    try {
                        // Submit the quiz results to the server
                        const response = await fetch('/api/quiz', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedUser)
                        });
                        let result = await response.json();
                        console.log("Final result", result);
                        setResult(result);
                        router.push('/result');
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Please select an option.");
        }
    }

    useEffect(() => {
        if (questions.length === 0) {
            router.push('/');
        }
        setStartTime(new Date());

        return () => {
            setStartTime(null);
        }
    }, []);

    const handleOptionChange = (optionIndex) => {
        console.log("optionIndex", optionIndex)
        let selectedAnswer = questions[parseInt(params.id) - 1].options[optionIndex];
        setSelectedOption(selectedAnswer);
    };

    return (
        <div className={styles.questionsBackground}>
            <div className={styles.pageContainer}>
                <div className={styles.progress}>
                    <motion.svg layoutId='progressSvg' width="218" height="218" viewBox="0 0 218 218" initial="hidden" animate="visible">
                        {/* Rotate the circles by -90 degrees  */}
                        <g transform="rotate(-90, 109, 109)">
                            <motion.circle cx="109" cy="109" r="90" stroke="#F3F4FA" strokeWidth="15" fill="transparent" />
                            <motion.circle variants={draw} custom={1} strokeLinecap="round" cx="109" cy="109" r="90" stroke="#44B77B" strokeWidth="15" fill="transparent" />
                        </g>
                    </motion.svg>
                    <div>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.questionNumber}>{params.id}</motion.span>
                        <span className={styles.totalQuestions}>/{questions?.length}</span>
                    </div>
                </div>
                <h2 className={styles.questionText}>{questions?.[params.id - 1]?.question}</h2>

                {questions?.[params.id - 1]?.image && <Image src={questions?.[params.id - 1]?.image} alt="question" width={400} height={400} />}

                <div className={styles.optionsContainer}>
                    {questions?.[params.id - 1]?.options.map((option, index) => (
                        <label key={index} htmlFor={`option${index}`} className={styles.option} style={{ border: selectedOption === option ? "4.444px solid #44B77B" : "none", backgroundColor: selectedOption === option ? "white" : "#F3F4FA" }}>
                            <input
                                type="radio"
                                name="options"
                                id={`option${index}`}
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleOptionChange(index)}
                            />
                            <span className={styles.checkmark}></span>
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>
                {parseInt(params.id) === questions?.length
                    ? <div
                        className='navButton'
                        onClick={() => handleNextClick('finish')}
                    >
                        <pre></pre>
                        <span>Finish</span>
                        <span>
                            <Image alt="right-arrow" src="/right-arrow.png" width={20} height={20} />
                        </span>
                    </div>
                    : <div
                        className='navButton'
                        onClick={() => handleNextClick('next')}
                    >
                        <pre></pre>
                        <span>Next</span>
                        <span>
                            <Image alt="right-arrow" src="/right-arrow.png" width={20} height={20} />
                        </span>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default page
