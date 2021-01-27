import React, { useContext, useState, useReducer } from 'react';
import { reducer, Action } from './reducer';
import { User } from './FirestoreModels';
export interface StateContext {
    user: User | null;
}
export interface Store {
    state: StateContext;
    dispatch?: React.Dispatch<Action>;
}

const defaultState: StateContext = { user: null };
const myContext = React.createContext({ state: defaultState });
export const useStateContext = () => useContext(myContext);
export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return <myContext.Provider value={{ state, dispatch }} children={children} />;
};