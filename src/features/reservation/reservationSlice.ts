import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReservationState {
  step: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    specialRequests: string;
    occasion: string;
  };
  confirmationCode: string | null;
  isSubmitting: boolean;
}

const initialState: ReservationState = {
  step: 1,
  formData: {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
    occasion: '',
  },
  confirmationCode: null,
  isSubmitting: false,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<ReservationState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setConfirmationCode: (state, action: PayloadAction<string | null>) => {
      state.confirmationCode = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetReservation: () => initialState,
  },
});

export const { setStep, updateFormData, setConfirmationCode, setSubmitting, resetReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
