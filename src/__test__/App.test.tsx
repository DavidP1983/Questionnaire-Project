import { render, screen } from '@testing-library/react';
import App from 'app/App';

describe('App test', () => {
    test('Test render App', () => {
        render(<App />)

        expect(screen.getByText("Questionnaire")).toBeInTheDocument();
    });
})