/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BoxCard from '../components/BoxCard';

describe('Box Card component', () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('render the box properly', () => {
    const { getByTestId } = render(
      <BoxCard onClose={vi.fn()}>
        <h1 data-testid="test-content">Test Content</h1>
      </BoxCard>,
    );
    const card = getByTestId('box-card');
    const content = getByTestId('test-content');
    expect(card).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
  it('render the box properly', async () => {
    const { getByTestId } = render(
      <BoxCard>
        <h1 data-testid="test-content">Test Content</h1>
      </BoxCard>,
    );
    const card = getByTestId('box-card');
    const closeBtn = getByTestId('close-btn');
    expect(card).toBeInTheDocument();
    fireEvent.click(closeBtn);
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });
});
