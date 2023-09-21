import user from "@/data/user"
import { NextResponse } from "next/server"



export async function GET() {
    try {
        // Get the user JSON from the static data
        const currentUser = user

        // Return the user
        return new NextResponse(JSON.stringify(currentUser), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong in the GET server" }), {
            status: 500
        })
    }
}

// PUT request to update the data base with the user answers
export async function PUT(request) {
    const body = await request.json()
    try {
        // deep copy the request data and return the same for simplicity (for static data)
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

