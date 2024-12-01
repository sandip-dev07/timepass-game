import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FormData } from "@/types/index";

const initialState: FormData = {
  name: "",
  email: "",
  phone: "",
  plan: "arcade",
  billingCycle: "monthly",
  addons: {
    onlineService: false,
    largerStorage: false,
    customizableProfile: false,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
