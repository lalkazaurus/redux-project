import { calculateTotalPrice, Product } from './card'

const cart: Product[] = [
    { id: 1, name: "Dell", price: 52, quantity: 17 },
    { id: 2, name: "Lenovo", price: 25, quantity: 2 },
    { id: 3, name: "Intel", price: 2, quantity: 1 }
]

console.log("Total price: " + calculateTotalPrice(cart))