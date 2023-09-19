import user from "@/data/user"
import { NextResponse } from "next/server"



export async function GET() {
    try {
        const currentUser = user
        return new NextResponse(JSON.stringify(currentUser), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the GET server" }), {
            status: 500
        })
    }
}

export async function PUT(request) {
    const body = await request.json()
    try {
        const updatedUser = JSON.parse(JSON.stringify(body))
        return new NextResponse(JSON.stringify(updatedUser), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the PUT server" }), {
            status: 500
        })
    }

}

