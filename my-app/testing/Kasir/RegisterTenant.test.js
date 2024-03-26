// File: RegisterTenant.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterTenant from '../../src/app/kasir/[id]/register/page.jsx';

// Mock the supabase module

jest.mock("next/navigation", () => ({
    useRouter: () => ({
      params: { id: "exampleId" },
    }),
    useParams: jest.fn(),
  }));


describe('RegisterTenant Component', () => {
  
    it('handles form submission', async () => {
      render(<RegisterTenant />);
      
      // Mock user input
      userEvent.type(screen.getByPlaceholderText('Enter Username'), 'testuser');
      userEvent.type(screen.getByPlaceholderText('Enter Password'), 'testpassword');
      
      // Trigger form submission
      fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    });
  });