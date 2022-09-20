import React from "react";
import styles from "./Die.module.css";

const Die = (props) => {
    return (
        <p className={props.die.locked ? `${styles.die} ${styles.locked}` : `${styles.die}`}
            onClick={() => props.lockHandle(props.die.id)}>
            {props.die.locked ? <img className={styles.dieFace} 
                                    src={props.die.lockedDieUrl}
                                    alt="diceImg"/> :
                                <img className={styles.dieFace} 
                                    src={props.die.unlockedDieUrl} 
                                    alt="diceImg"/>}
        </p>
    )
}

export default Die;