import myCurrentLocation, { message, name, getGreeting } from "./myModule";
import sum, { subtract } from "./math";

console.log(`Message: ${message}`);
console.log(`Name: ${name}`);
console.log(`My current location: ${myCurrentLocation}`);
console.log(getGreeting('Mateus'));

console.log(`Sum: 2+2=${sum(2, 2)}`);
console.log(`Subtract: 4-2=${subtract(4, 2)}`);

