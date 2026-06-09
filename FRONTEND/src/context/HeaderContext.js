'use client'

import { createContext, useContext } from 'react';

export const HeaderContext = createContext(null);

export function useHeader() {
    return useContext(HeaderContext);
}