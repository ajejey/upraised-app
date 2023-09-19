import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from "./HomePage";
import { GlobalProvider } from "@/context/Provider";
import questions from "@/data/questions";

describe("HomePage", () => {
    it("renders HomePage without crashing", () => {

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