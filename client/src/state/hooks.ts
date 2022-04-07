// Core
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from "react-redux";
import { select } from "redux-saga/effects";

// Instruments
import { AppDispatch, RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function* appSelect<TSelected>(
    selector: (state: RootState) => TSelected,
): Generator<any, TSelected, TSelected> {
    return yield select(selector);
}
