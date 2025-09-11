import { render, screen } from '@testing-library/react';
import { questionnaireResult } from 'features/questionnaire-result/lib/result';
import { ResultUI } from 'features/questionnaire-result/ui';
import { db } from 'shared/questionnaire';
import { FormContent } from '../pages/ui/form-content/form-content';

// Полностью подменяем компонент ResultUI, поскольку компонент это ф-ия, то она возвращает нам элемент jest.fn(() => <div data-testid="result" />)
jest.mock("features/questionnaire-result/ui", () => ({
    ResultUI: jest.fn(() => <div data-testid="result" />)
}));



// Мокаем данные с db для проверки работоспособности компонента без данных или с данными, который ма сами будет подставлять
jest.mock('shared/questionnaire', () => ({
    db: {
        map: {
            get: jest.fn()
        }
    }
}));



describe("Form-Content-test", () => {

    beforeEach(() => {
        jest.clearAllMocks();  // Поскольку мы взяли за основу моковую db, то перед каждым текстом где у нас есть db мы отменяем поведение мока, так как каждый из них работает со своими данными
    })


    test('Test Render FormContent', () => {
        (db.map.get as jest.Mock).mockReturnValueOnce({ title: "Who are you", answer: [] })
        const { getByText, getByRole } = render(<FormContent />);

        const mainText = getByRole('heading', { level: 1 })
        const question = getByText(/Who are you/)

        expect(mainText).toBeInTheDocument();
        expect(question).toBeInTheDocument();
    });


    test("Test RadioButton quantity", () => {
        (db.map.get as jest.Mock).mockReturnValueOnce({
            title: '',
            answers: ['no', 'yes']
        })
        render(<FormContent />);
        const radios = screen.getAllByRole('radio')
        expect(radios).toHaveLength(2);
        expect(radios[0]).toHaveAttribute('value', 'no');
        expect(radios[1]).toHaveAttribute('value', 'yes');
    });


    test('Test NextButton presents', () => {
        const { getByTestId } = render(<FormContent />);

        const btn = getByTestId('btn')
        expect(btn).toBeInTheDocument();
    });



    // Если resultContent возвращает нам ResultUI, то отображаем вместо CardContent -> ResultUI
    test('Test resultContent if key includes in provided array', () => {

        // ---  Моковые данные, имитация данных передаваемые в questionnaireResult  --- //
        const summary = [{ question: "What is the company's turnover?", radioValue: "decline", title: "What is the company's turnover?", answer: ">=10000$" }];
        const { title } = db.map.get("decline") ?? { title: "", answers: [] }
        const result = questionnaireResult({ key: "decline", title, summary });

        const { getByTestId } = render(result);
        expect(getByTestId('result')).toBeInTheDocument();
        expect(ResultUI).toHaveBeenCalledWith({
            status: 'error',
            title,
            summary
        }, {})
    })

    test('Test resultContent if null', () => {
        const summary = [{ question: "Who are you", radioValue: "company", title: "Who are you", answer: "company" }];
        const { title } = db.map.get("company") ?? { title: "", answers: [] }
        const result = questionnaireResult({ key: "company", title, summary });

        expect(result).toBeNull();
        const { getByTestId } = render(<FormContent />)
        expect(getByTestId('form-content')).toBeInTheDocument();
    });


    test('Test if FormContent render during empty form db.map', () => {
        (db.map.get as jest.Mock).mockReturnValueOnce(undefined)
        render(<FormContent />)

        expect(screen.getByTestId("form-content")).toBeInTheDocument();

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('');
        // expect(screen.queryByRole('radio')).toBeNull(); - в данном случае проверяем на отсутствие элементов, если у нас нет данных т.е. undefined, то предполагаем, что на странице чего-то может и не быть
        expect(screen.queryAllByRole('radio')).toHaveLength(0);  // данный тест более надежный, потому что если вдруг где-то рендерится лишний radio, тест всё равно упадёт
    });

})