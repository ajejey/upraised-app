import questions from "@/data/questions"
import { NextResponse } from "next/server"



export const GET = async (req, res) => {

    try {
        const quizQuestions = questions

        return new NextResponse(JSON.stringify(quizQuestions), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the GET server" }), {
            status: 500
        })
    }
}


export async function POST(request) {
    const userData = await request.json()
    let userAnswers = userData.answers
    try {
        let finalPoints = 0
        let correctAnswers = 0
        const getPoints = () => {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].answer === userAnswers[i].answer) {
                    finalPoints += questions[i].points
                    correctAnswers++
                }
            }
        }
        getPoints()
        return new NextResponse(JSON.stringify({ finalPoints, correctAnswers }), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the POST server" }), {
            status: 500
        })
    }
}