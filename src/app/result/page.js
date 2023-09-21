'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './result.module.css'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context/Provider'
import Image from 'next/image'
import { motion } from 'framer-motion';



function Result() {
    const router = useRouter()
    const { questions, result } = useContext(GlobalContext)

    const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0)

    const grayBackground = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 0;
            const completed = 0.66;
            return {
                pathLength: completed,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    }

    const indicator = {
        hidden: {
            opacity: 0,
            rotate: 0,
            originX: "240",
            originY: "240"

        },
        visible: {
            opacity: 1,
            rotate: (result.finalPoints / totalPoints) * 180,
            originX: "240",
            originY: "240",
            transition: {
                rotate: { delay: 0.5, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: 0.5, duration: 0.01 }
            }
        }
    }

    const range = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 0;
            const completed = 0.5;
            return {
                pathLength: completed,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    }

    console.log("result", result.finalPoints)

    return (
        <div className={styles.questionsBackground}>
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>Your result</h1>
                {/* Result SVG with animation */}
                <div className={styles.progress}>
                    <motion.svg initial="hidden" animate="visible" width="100%" height="100%" viewBox="0 0 500 500">
                        <g transform="rotate(150, 240, 240)">
                            <motion.circle variants={grayBackground} cx="230" cy="240" r="180" strokeWidth="100" fill="transparent" stroke="#EBEDF5" />
                        </g>
                        <g transform="rotate(-90, 240, 240)">
                            <motion.polygon variants={indicator} points="240,42.5 330,237.5 160,237.5" fill="#333333" strokeLinejoin="round" />
                        </g>
                        <circle cx="250" cy="240" r="145" stroke="#fff" fill="#fff" />
                        <g transform="rotate(180, 240, 240)">
                            <motion.circle variants={range} cx="230" cy="240" r="230" fill="transparent" strokeWidth="20" stroke="url(#paint0_linear_86_5)" strokeLinecap="round" />
                        </g>
                        <circle cx="250" cy="240" r="130" stroke='#EBEDF5' strokeWidth="5" fill="transparent" />
                        <defs>
                            <linearGradient id="paint0_linear_86_5" x1="490" y1="10" x2="10" y2="10" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FF3B3F" />
                                <stop offset="0.479043" stop-color="#FFD033" />
                                <stop offset="1" stop-color="#44B77B" />
                            </linearGradient>
                        </defs>
                    </motion.svg>
                    <div>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.questionNumber}>
                            {result.finalPoints !== undefined ? (result.finalPoints * 100)/100 : 0}%
                        </motion.span>
                    </div>
                    {/* Graph : {result.finalPoints} */}
                </div>
                <div className={styles.optionsContainer}>
                    <div className={`${styles.option} ${styles.correct} ${styles.optionText}`}>
                        <Image src="/correct.svg" alt="correct" width={32} height={32} />
                        <span>
                            {result.correctAnswers !== undefined ? result.correctAnswers : 0}
                        </span>
                        <span >
                            Correct
                        </span>
                    </div>
                    <div className={`${styles.option} ${styles.incorrect} ${styles.optionText}`}>
                        <Image src="/incorrect.svg" alt="incorrect" width={32} height={32} />
                        <span>{result.correctAnswers !== undefined ? questions.length - result.correctAnswers : 0}</span>
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
            </div>
        </div>
    )
}

export default Result