import React from 'react';
import { render } from '@testing-library/react';
import App from '../root';

test('renders submit button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/submit/i);
  expect(linkElement).toBeInTheDocument();
});
