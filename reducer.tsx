import { StateContext } from "./globalState";
import { User } from "./FirestoreModels";
export enum ActionType {
  SIGN_IN = "Sign in",
  SIGN_OUT = "Sign out",
  USER_UPDATE = "User update",
}
export type Action =
  | { type: ActionType.SIGN_IN; payload: User }
  | { type: ActionType.USER_UPDATE; payload: User }
  | { type: ActionType.SIGN_OUT };
export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, user: action.payload };
    case ActionType.USER_UPDATE:
      return { ...state, user: action.payload };
    case ActionType.SIGN_OUT:
      return { ...state, user: null };
    default:
      throw new Error("Called non-existent action");
  }
};
