import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';

test('renders form and submits correctly', () => {
  const mockAddBug = jest.fn();

  render(<BugForm onAddBug={mockAddBug} />);

  const titleInput = screen.getByPlaceholderText(/bug title/i);
  const descInput = screen.getByPlaceholderText(/bug description/i);
  const submitBtn = screen.getByRole('button', { name: /report bug/i });

  fireEvent.change(titleInput, { target: { value: 'Sample Bug' } });
  fireEvent.change(descInput, { target: { value: 'Bug description' } });
  fireEvent.click(submitBtn);

  expect(mockAddBug).toHaveBeenCalledWith(
    expect.objectContaining({
      title: 'Sample Bug',
      description: 'Bug description'
    })
  );
});
