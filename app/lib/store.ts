import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from '@/app/lib/redux/auth/authSlice'
// Define a RootState type
export type RootState = ReturnType<typeof store.getState>;

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Export the store
export default store;

// Export a custom useDispatch hook with correct type
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Export a custom useSelector hook with correct type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;