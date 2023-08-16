import { AppDispatchType } from "../store/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatchType>();
