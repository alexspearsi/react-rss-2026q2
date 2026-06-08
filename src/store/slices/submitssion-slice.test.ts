import submissionsReducer, { addSubmission } from './submitssion-slice';

const sample = {
  name: 'John',
  age: 25,
  email: 'john@example.com',
  gender: 'male',
  termsAccepted: true as const,
  password: 'Password1!',
  country: 'Germany',
  image: 'data:image/png;base64,abc',
};

describe('submissionsSlice', () => {
  it('initial state has empty items array', () => {
    const state = submissionsReducer(undefined, { type: '@@INIT' });

    expect(state.items).toEqual([]);
  });

  it('addSubmission adds item and generates id and submittedAt', () => {
    const state = submissionsReducer(undefined, addSubmission(sample));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBeDefined();
    expect(state.items[0].submittedAt).toBeDefined();
    expect(state.items[0].name).toBe('John');
  });

  it('addSubmission prepends — newest item is first', () => {
    let state = submissionsReducer(undefined, addSubmission(sample));

    state = submissionsReducer(state, addSubmission({ ...sample, name: 'Jane' }));

    expect(state.items[0].name).toBe('Jane');
    expect(state.items[1].name).toBe('John');
  });

  it('stores all submissions (history)', () => {
    let state = submissionsReducer(undefined, addSubmission(sample));

    state = submissionsReducer(state, addSubmission(sample));
    state = submissionsReducer(state, addSubmission(sample));

    expect(state.items).toHaveLength(3);
  });

  it('each submission gets a unique id', () => {
    let state = submissionsReducer(undefined, addSubmission(sample));

    state = submissionsReducer(state, addSubmission(sample));

    expect(state.items[0].id).not.toBe(state.items[1].id);
  });
});
