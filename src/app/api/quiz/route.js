import questions from "@/data/questions"
import { NextResponse } from "next/server"



export const GET = async (req, res) => {

    try {
        // Get all the questions from the static data
        const quizQuestions = questions

        // Return response with the questions
        return new NextResponse(JSON.stringify(quizQuestions), {
            status: 200
        })
    } catch (error) {
        // Return error response
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the GET server" }), {
            status: 500
        })
    }
}


export async function POST(request) {
    const userData = await request.json()
    // Get answers from the user data
    let userAnswers = userData.answers
    try {
        let finalPoints = 0
        let correctAnswers = 0

        // Calculate points and correct answers.
        const getPoints = () => {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].answer === userAnswers[i].answer) {
                    finalPoints += questions[i].points
                    correctAnswers++
                }
            }
        }
        getPoints()

        // Return response with final points and correct answers
        return new NextResponse(JSON.stringify({ finalPoints, correctAnswers }), {
            status: 200
        })
    } catch (error) {
        // Return error response
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the POST server" }), {
            status: 500
        })
    }
}