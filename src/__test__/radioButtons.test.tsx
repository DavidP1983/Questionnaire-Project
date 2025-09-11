import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const getRadioValueMock = jest.fn();

jest.mock('entities/model/store', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFormState: (selector?: any) => {
        const state = {
            radioValue: "",
            getRadioValue: getRadioValueMock
        }
        return selector ? selector(state) : state
    }
}))


import { RadioButtons } from 'features/radio-buttons';



describe('Test RadioButton behavior', () => {

    test("Test RadioButton render", () => {
        render(<RadioButtons answers={[
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' }]} />)
    });

    test('Test getRadioValue function call', async () => {
        const { getAllByRole } = render(<RadioButtons answers={[
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' }]} />);

        const radioButton = getAllByRole('radio')
        await userEvent.click(radioButton[1]);
        expect(getRadioValueMock).toHaveBeenCalledTimes(1);
        expect(getRadioValueMock).toHaveBeenCalledWith('company')
        expect(radioButton[1]).toHaveAttribute("value", 'company')
        expect(radioButton[0]).not.toBeChecked();
    });
})
