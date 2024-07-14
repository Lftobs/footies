// src/atoms.js
import { atom } from 'jotai';

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

export const cartAtom = atom(initialCart);

export const productAtom = atom([]);
