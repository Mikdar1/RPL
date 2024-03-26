import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MengelolaPembayaran from '../../src/app/kasir/[id]/mengelola_pembayaran/page.jsx';

// Mocking the useParams hook
jest.mock("next/navigation", () => ({
    useRouter: () => ({
      params: { id: "exampleId" },
    }),
    useParams: jest.fn(),
  }));

describe('MengelolaPembayaran', () => {
  it('renders loading message when pesanan is null', () => {
    render(<MengelolaPembayaran />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
  });