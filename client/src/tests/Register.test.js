// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import Register from '../components/Register';

// describe('Registration Form', () => {
//   it('registers a new user', async () => {
//     const { getByPlaceholderText, getByText } = render(<Register />);

//     const usernameInput = getByPlaceholderText('Username');
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const registerButton = getByText('Register');

//     fireEvent.change(usernameInput, { target: { value: 'newuser' } });
//     fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(getByText('User registered successfully')).toBeInTheDocument();
//     });
//   });
// });