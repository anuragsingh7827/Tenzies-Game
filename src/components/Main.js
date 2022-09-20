import React, { useEffect, useState } from "react";
import Die from "./Die";
import styles from "./Main.module.css";
import {diceData} from "../diceData";
import Confetti from "./Confetti";
import unlockedDice from "../unlockedDice";
import lockedDice from "../lockedDice";
import { useStopwatch } from 'react-timer-hook';
import timer from "../imgs/timer.png"

const Main = () => {
    // localStorage.clear();
    const [dice,setDice] = useState(() => diceData());
    const [tenzies, setTenzies] = useState(false);
    const [rolls, setRolls] = useState(0);
    const [bestTime, setBestTime] = useState(() => JSON.parse(localStorage.getItem('bestTime')) || [])

    const {
        seconds,
        minutes,
        hours,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });


    useEffect(() => {
        const isLocked = dice.every(die => die.locked)
        const firstValue = dice[0].lockedDieUrl;
        const isSame = dice.every(die => die.lockedDieUrl === firstValue);

        if(isLocked && isSame){
            pause();
            const newBestTime = [{
                hours : hours,
                minutes: minutes,
                seconds: seconds
            }];

            if(bestTime.length === 0){
                setBestTime(newBestTime);
                localStorage.setItem('bestTime',JSON.stringify(newBestTime));
            }
            else if(bestTime[0].hours >= hours && 
                bestTime[0].minutes >= minutes && 
                bestTime[0].seconds >= seconds){
                setBestTime(newBestTime);
                localStorage.setItem('bestTime',JSON.stringify(newBestTime));
            }
            setTenzies(true);
        }else setTenzies(false);
    },[dice]);

    const lockHandle = (id) => {
        setDice(prevDice => {
            return prevDice.map(die => {
                return die.id === id ? {...die, locked: !die.locked} : die;
            });
        });
    }

    const allDie = dice.map(die => <Die key={die.id} die={die} lockHandle={lockHandle}/>)

    const rollDieHandle = () => {
        if(tenzies){
            setDice(() => diceData());
            setRolls(0);
            setTenzies(false);
            reset();
        }
        else{
            setRolls(prevRolls => prevRolls + 1);
            setDice(prevDice => {
                return prevDice.map(prevDie => {
                    const randomIndex = Math.floor(Math.random() * 6);
                    return prevDie.locked ? prevDie : {
                        ...prevDie,
                        unlockedDieUrl: unlockedDice[randomIndex],
                        lockedDieUrl: lockedDice[randomIndex]
                    }
                })
            });
        }
    }
    return (
        <main className={styles.game}>
            {tenzies && <Confetti/>}

            <h2 className={styles.title}>Tenzies</h2>

            <p className={styles.about}>
                Roll until all dice are the same. 
                Click each die to freeze it at its 
                current value between rolls.
            </p>

            {bestTime.length > 0 ?
            <div className={styles.container1}>
                <p>Best Playtime: </p>
                <p className={styles.timer}>
                    <span>{bestTime[0].hours < 10 ? `0${bestTime[0].hours}` : bestTime[0].hours} </span>:
                    <span> {bestTime[0].minutes < 10 ? `0${bestTime[0].minutes}` : bestTime[0].minutes} </span>:
                    <span> {bestTime[0].seconds < 10 ? `0${bestTime[0].seconds}` : bestTime[0].seconds}</span>
                </p>
            </div> : 
            <div className={styles.container1} style={{width: "80%"}}>
                <p>Best Playtime: </p>
                <p>Not played even once!</p>
            </div>}

            <div className={styles.container2}>
                <p>Number of rolls: {rolls}</p>
                
                <p className={styles.timer}>
                    <span>{hours < 10 ? `0${hours}` : hours} </span>:
                    <span> {minutes < 10 ? `0${minutes}` : minutes} </span>:
                    <span> {seconds < 10 ? `0${seconds}` : seconds}</span>
                </p>
                <img className={styles.timerIcon} src={timer} alt="timerIcon"/>
            </div>

            <div className={styles.grid}>
                {allDie}
            </div>

            <button className={styles.rollBtn} onClick={rollDieHandle}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

export default Main;