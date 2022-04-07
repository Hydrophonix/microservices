// Instruments
import { RootState } from "../../src/state/store";

export type TestRootState = Partial<Omit<RootState, "router">>;
