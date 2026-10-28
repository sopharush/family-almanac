import { createContext, useContext } from 'react';

/** Flips to true once the preloader has cleared, so hero intros don't play behind it. */
export const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);
