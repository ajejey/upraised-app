let user = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    correctAnswers: 0,
    totalPoints: 0,
    answers: [
        {
            id: 1,
            question: 'What is your favorite color?',
            answer: '',
            options: ['Red', 'Blue', 'Green', 'Yellow'],
            timeToAnswer: 0
        },
        {
            id: 2,
            question: 'What is your favorite animal?',
            answer: '',
            options: ['Dog', 'Cat', 'Tiger', 'Lion'],
            timeToAnswer: 0
        },
        {
            id: 3,
            question: 'What is your favorite food?',
            answer: '',
            options: ['Pizza', 'Burger', 'Pasta', 'Sandwich'],
            timeToAnswer: 0
        },
        {
            id: 4,
            question: 'What is your favorite movie?',
            answer: '',
            options: ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'The Matrix'],
            timeToAnswer: 0
        }
    ]
}

export default user