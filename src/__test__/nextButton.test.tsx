import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import { NextButton } from 'features/next-button';




const nextPageMock = jest.fn();
const prevPageMock = jest.fn();

const mockState = {
    isActiveRadio: true,
    prevQuestion: [{}],
    nextPage: nextPageMock,
    prevPage: prevPageMock
}


jest.mock("entities/model/store", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFormState: (selector?: any) => {
        return selector ? selector(mockState) : mockState
    }
}));


beforeEach(() => {
    jest.clearAllMocks();
})


describe("Test NextButton Component", () => {

    test("Test render component", () => {
        const { getAllByRole } = render(<NextButton />);

        const text = ["Prev Question", "Next Question"]
        const btn = getAllByRole('button');

        text.forEach((text, i) => {
            expect(btn[i]).toHaveTextContent(text)
        })
    });

    test("Test buttons in action", async () => {
        const showNextQuestion = jest.fn();
        render(<Button onClick={showNextQuestion} />);

        const btn = screen.getByRole('button');
        await userEvent.click(btn);
        expect(showNextQuestion).toHaveBeenCalledTimes(1)

    });



    test('Test button in action if isActiveRadio = true', async () => {
        mockState.isActiveRadio = true;
        render(<NextButton />)

        const btn = screen.getByText('Next Question')
        await userEvent.click(btn);
        expect(nextPageMock).toHaveBeenCalledTimes(1);
    })



    test('Test button in action if isActiveRadio = false', async () => {
        mockState.isActiveRadio = false;
        render(<NextButton />)

        const btn = screen.getByText('Next Question')
        await userEvent.click(btn);
        expect(nextPageMock).not.toHaveBeenCalled();
    })


    test("Test prev button when elem exist", async () => {
        mockState.prevQuestion = [
            {
                question: "who",
                radioValue: "company",
                title: "Who are you",
                answer: "Company"
            }
        ]

        render(<NextButton />)
        const btn = screen.getByText('Prev Question')
        await userEvent.click(btn);
        expect(prevPageMock).toHaveBeenCalledTimes(1);
        expect(prevPageMock).toHaveBeenCalledWith({
            question: "who",
            radioValue: "company",
            title: "Who are you",
            answer: "Company"
        })
    });


    test("Test prev button when elem empty", async () => {
        mockState.prevQuestion = []

        render(<NextButton />)
        const btn = screen.getByText('Prev Question')
        await userEvent.click(btn);
        expect(prevPageMock).not.toHaveBeenCalled();
    });


});