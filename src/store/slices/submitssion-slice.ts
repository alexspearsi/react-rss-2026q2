import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { FormSubmission } from '../../types/form.types';

type NewSubmission = Omit<FormSubmission, 'id' | 'submittedAt'>;

interface SubmissionsState {
  items: FormSubmission[];
}

const initialState: SubmissionsState = {
  items: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: {
      prepare(payload: NewSubmission) {
        return {
          payload: {
            ...payload,
            id: nanoid(),
            submittedAt: Date.now(),
          } satisfies FormSubmission,
        };
      },
      reducer(state, action: PayloadAction<FormSubmission>) {
        state.items.unshift(action.payload);
      },
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;
