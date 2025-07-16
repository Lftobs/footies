// src/atoms.js
import { atom } from 'jotai';

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

console.log(initialCart)

const initialCartNo = initialCart.length || 0

export const cartAtom = atom(initialCart);

export const cartNo = atom(initialCartNo)

export const productAtom = atom([]);
