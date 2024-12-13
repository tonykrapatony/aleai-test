import { render, screen } from '@testing-library/react';
import ThankYou from '@/app/thank-you/page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ThankYou Page', () => {
  it('renders thank you message and link', () => {
    render(<ThankYou />);

    expect(screen.getByText('Thank You')).toBeInTheDocument();
    expect(screen.getByText('Assignment submitted successfully!')).toBeInTheDocument();

    const link = screen.getByText('To main page');
    expect(link).toHaveAttribute('href', '/');
  });
});
