import {
  authUserReducer,
  login,
  initialState,
  update,
  register,
  logout,
  getUser
} from './authUser';

describe('проверка редьюсера слайса authUser', () => {
  test('login pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = authUserReducer(initialState, {
      type: login.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('login rejected', () => {
    const errorMessage = 'Ошибка входа';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = authUserReducer(initialState, {
      type: login.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('login fulfilled', () => {
    const mockLogin = {
      user: {
        email: 'ekatyashatunova@gmail.com',
        name: 'Екатерина'
      }
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      user: mockLogin
    };

    const newState = authUserReducer(initialState, {
      type: login.fulfilled.type,
      payload: mockLogin
    });

    expect(newState).toEqual(expectedState);
  });

  test('update pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = authUserReducer(initialState, {
      type: update.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('update rejected', () => {
    const errorMessage = 'Ошибка обновления';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = authUserReducer(initialState, {
      type: update.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('update fulfilled', () => {
    const mockUpdate = {
      user: {
        email: 'ekatyashatunova@gmail.com',
        name: 'Екатерина',
        password: ' '
      }
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      user: mockUpdate
    };

    const newState = authUserReducer(initialState, {
      type: login.fulfilled.type,
      payload: mockUpdate
    });

    expect(newState).toEqual(expectedState);
  });

  test('register pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = authUserReducer(initialState, {
      type: register.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('register rejected', () => {
    const errorMessage = 'Ошибка регистрации';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = authUserReducer(initialState, {
      type: register.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('register fulfilled', () => {
    const mockRegister = {
      user: {
        email: 'ekatyashatunova@gmail.com',
        name: 'Екатерина',
        password: ''
      }
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      user: mockRegister
    };

    const newState = authUserReducer(initialState, {
      type: login.fulfilled.type,
      payload: mockRegister
    });

    expect(newState).toEqual(expectedState);
  });

  test('logout pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = authUserReducer(initialState, {
      type: logout.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('logout rejected', () => {
    const errorMessage = 'Ошибка выхода';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = authUserReducer(initialState, {
      type: logout.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('logout fulfilled', () => {
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      user: null
    };

    const newState = authUserReducer(initialState, {
      type: logout.fulfilled.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('getUser pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = authUserReducer(initialState, {
      type: getUser.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('getUser rejected', () => {
    const errorMessage = 'Ошибка получения пользователя';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = authUserReducer(initialState, {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('getUser fulfilled', () => {});
});
