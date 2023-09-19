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