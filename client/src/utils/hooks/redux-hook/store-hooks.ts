import type { AppDispatch, RootState } from "@/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { useAppDispatch, useAppSelector };
