import React from 'react';
// import * as router from 'react-router';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NoProfile from '../../components/user-profile-card/NoProfile';

describe('Profile Page', () => {
  describe('NoProfile component', () => {
    it('should render without errors', () => {
      const { getByTestId } = render(<NoProfile />);
      // Add your assertions here
      expect(getByTestId('no-profile')).toBeInTheDocument();
    });
  });
});
