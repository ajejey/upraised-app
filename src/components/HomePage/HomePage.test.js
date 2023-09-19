import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import HomePage from "./HomePage";
import { GlobalProvider } from "@/context/Provider";
import questions from "@/data/questions";
import { useRouter } from "next/navigation";
import useSWR from "swr";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}))

jest.mock('swr', () => ({
    __esModule: true,
    default: () => ({
        data: questions,
        error: null
    })
}))


describe("HomePage", () => {
    it("renders HomePage without crashing", async () => {
        const mockData = questions
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockData)
        }))

        render(
            <GlobalProvider>
                <HomePage />
            </GlobalProvider>
        );

        expect(screen.getByText("Upraised")).toBeInTheDocument();

        expect(screen.getByText("Quiz")).toBeInTheDocument();

        expect(screen.getByText("Start")).toBeInTheDocument();

    });
})