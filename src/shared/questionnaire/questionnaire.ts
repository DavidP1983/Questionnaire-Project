import { TQuestions } from "shared/types";


const questions: string[] = ["who", "company", "decline", "accepted", "individual", "junior", "older"]
const response: TQuestions[] = [
    {
        title: "Who are you",
        answers: [
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' }
        ]
    },
    {
        title: "What is the company's turnover?",
        answers: [
            { label: '<10000$', value: 'decline' },
            { label: '>=10000$', value: 'accepted' }
        ]
    },
    {
        title: "Insufficient company turnover",
        answers: []
    },
    {
        title: "Application accepted",
        answers: []
    },
    {
        title: "How old are you?",
        answers: [
            { label: '<18', value: 'junior' },
            { label: '>=18', value: 'older' }
        ]
    },
    {
        title: "You are under 18. Credit is not possible",
        answers: []
    },
    {
        title: "What is your income?",
        answers: [
            { label: '<1000$', value: 'decline' },
            { label: '>=1000$', value: 'accepted' }
        ]
    },

]

export const map: Map<string, TQuestions> = new Map();

questions.forEach((item, i) => {
    map.set(item, response[i])
})