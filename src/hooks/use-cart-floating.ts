'use client';
import {createContext, useContext, useState} from 'react';

type CartFloatingContextType = {
    isCartFloatingOpen: boolean;
    openCartFloating: () => void;
    closeCartFloating: () => void;
}

