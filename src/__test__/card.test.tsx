import { render, screen } from '@testing-library/react';
import { CardContent } from 'entities';
import { RadioButtons } from 'features/radio-buttons';



describe('Test CardContent component', () => {

    test('Test render CardContent', () => {
        const { getByTestId, getByRole } = render(
            <CardContent
                actions={<RadioButtons answers={[
                    { label: 'Individual', value: 'individual' },
                    { label: 'Company', value: 'company' }
                ]} />}
                question='Why' />)

        expect(getByTestId('card')).toBeInTheDocument();
        expect(getByRole('heading', { level: 1 })).toHaveTextContent('Why')

        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(2);
    });


    test("Test render component without props", () => {
        render(
            <CardContent actions={<RadioButtons answers={[]} />} question='' />)

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('');
        expect(screen.queryByRole('radio')).toBeNull();

    })

})