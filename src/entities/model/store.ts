import { db } from 'shared/questionnaire';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


export interface IPrevQuestion {
    question: string;
    radioValue: string;
    title: string;
    answer: string;
}

interface IStore {
    radioValue: string;
    isActiveRadio: boolean;
    question: string;
    prevQuestion: IPrevQuestion[];
    getRadioValue: (value: string) => void;
    nextPage: () => void;
    prevPage: (elem: IPrevQuestion) => void;
    backToMainPage: () => void;
}


export const useFormState = create<IStore>()(persist(devtools((set, get) => ({
    radioValue: '',
    question: 'who',
    prevQuestion: [],
    isActiveRadio: false,
    getRadioValue: (value: string) => {
        set({ radioValue: value, isActiveRadio: true }, false, { type: "getRadioValue", payload: { value } })

    },
    nextPage: () => {
        const currentKey = get().question;
        const currentQuestion = db.map.get(currentKey);

        const selectedRadioValue = get().radioValue;
        const selectedAnswer = currentQuestion?.answers.find((answer) => answer.value === selectedRadioValue);

        set({
            isActiveRadio: false,
            question: selectedRadioValue,
            prevQuestion: [...get().prevQuestion,
            {
                question: get().question,
                radioValue: get().radioValue,
                title: currentQuestion?.title ?? "",
                answer: selectedAnswer?.label ?? ""

            }
            ]
        },
            false, {
            type: "nextPage", payload: {}
        })
    },
    prevPage: (elem) => {
        set({
            isActiveRadio: true,
            question: elem.question,
            radioValue: elem.radioValue
        },
            false, {
            type: "prevPage", payload: { payload: elem }
        })
    },
    backToMainPage: () => {
        set({
            question: 'who',
            prevQuestion: [],
            radioValue: ''
        },
            false, {
            type: "backToMainPage", payload: {}
        })
    }
}), { store: "formState", enabled: process.env.NODE_ENV === 'development' }), { name: 'useFormState', version: 1 }))


