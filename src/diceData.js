import diceUnlocked from "./unlockedDice.js";
import diceLocked from "./lockedDice.js";


export function diceData() {
    const arr = []
    for(let i = 1; i <= 10; i++){
        const randomIndex = Math.floor(Math.random() * 6);
        const die = {
            id: i,
            lockedDieUrl: diceLocked[randomIndex],
            unlockedDieUrl: diceUnlocked[randomIndex],
            locked: false
        }
        arr.push(die);
    }
    return arr;
}