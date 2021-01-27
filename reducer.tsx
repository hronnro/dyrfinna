import { StateContext } from './globalState';
import { User } from './FirestoreModels';
export enum ActionType {
    SIGN_IN = 'Sign in',
    SIGN_OUT = 'Sign out',
}
export type Action = { type: ActionType.SIGN_IN, payload: User } | { type: ActionType.SIGN_OUT };
export const reducer = (state: StateContext, action: Action) => {
    switch (action.type) {
        case ActionType.SIGN_IN:
            return { ...state, user: action.payload };
        case ActionType.SIGN_OUT:
            return { ...state, user: null };
        default:
            throw new Error('Not among actions');
    }
};