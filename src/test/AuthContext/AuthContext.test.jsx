/* eslint-disable no-shadow */
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAuth } from '../../hooks/AuthContext';
import reducer from '../../contexts/Auth/reducer';

describe('Box Card component', () => {
  it('Invoke useAuth hook with no context', () => {
    expect(() => renderHook(useAuth)).toThrowError(
      'useAuth must be used within a AuthProvider',
    );
  });
  it('Invoke dispatch with unkown action type', () => {
    expect(() => reducer({}, { type: 'unknown' })).toThrowError(
      'Unknown action type: unknown',
    );
  });
  it('Invoke dispatch with LOGIN action type', () => {
    expect(
      reducer(
        {},
        { type: 'LOGIN', payload: { user: 'test' }, token: 'testToken' },
      ),
    ).toStrictEqual({
      isAuthenticated: true,
      user: { user: 'test' },
      token: 'testToken',
    });
  });
  it('Invoke dispatch with LOGOUT action type', () => {
    expect(reducer({}, { type: 'LOGOUT' })).toStrictEqual({
      user: null,
      isAuthenticated: false,
      token: undefined,
    });
  });
});
