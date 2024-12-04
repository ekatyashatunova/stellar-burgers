import { expect, describe, test } from '@jest/globals';
import { store } from './store';
import { rootReducer } from './store';

describe('state', () => {
  it('should return correct state', () => {
    const initState = store.getState();
    const expState = rootReducer(undefined, { type: ' ' });
    expect(initState).toEqual(expState);
  });
});
