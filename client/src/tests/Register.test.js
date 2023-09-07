// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import Register from '../components/Register'; // Replace with the correct path to your Register component

// describe('Registration Form', () => {
//   it('registers a new user', async () => {
//     // Render the Register component
//     const { getByPlaceholderText, getByText } = render(<Register />);

//     // Fill out the registration form fields
//     const usernameInput = getByPlaceholderText('Username');
//     const emailInput = getByPlaceholderText('Email');
//     const passwordInput = getByPlaceholderText('Password');
//     const registerButton = getByText('Register');

//     fireEvent.change(usernameInput, { target: { value: 'newuser' } });
//     fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     // Simulate a form submission
//     fireEvent.click(registerButton);

//     // Wait for the registration process to complete
//     await waitFor(() => {
//       // Assert that a success message or confirmation message appears
//       expect(getByText('User registered successfully')).toBeInTheDocument();
//     });

//     // You can add additional assertions if needed
//   });
// });
