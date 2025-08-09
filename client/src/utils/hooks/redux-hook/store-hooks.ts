import type { AppDispatch, RootState } from "@/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useAppDisptach = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { useAppDisptach, useAppSelector };
