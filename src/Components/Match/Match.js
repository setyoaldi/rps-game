import React, { useState, useEffect } from 'react';
import styles from './Match.module.scss';
import { RPSMove } from '../../Constants';
import MoveButton from '../MoveButton/MoveButton';

import rock from '../../assets/images/icon-rock.svg';
import scissors from '../../assets/images/icon-scissors.svg';
import paper from '../../assets/images/icon-paper.svg';
import Button from '../Button/Button';

const Match = ({ playerMove, CPUMove, selectCPUMove, setPoints, getResult, playAgainHandler }) => {

    const [win, setWin] = useState(0);
    const [showPlayAgainBtn, setShowPlayAgainBtn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (playerMove) {
                let cpuMove = selectCPUMove();
                console.log("CPU choose:", cpuMove);
            }
        }, 300);
        return () => { };
    }, [selectCPUMove, playerMove]);

    useEffect(() => {
        if (playerMove && CPUMove) {
            let result = getResult();
            console.log(result);
            setPoints(p => p + result);
            setWin(result);
            setShowPlayAgainBtn(true);
        }
        return () => {
        };
    }, [playerMove, CPUMove, getResult, setPoints]);

    // TODO Fix decoration border vittoria
    return (
        <div className={styles.Match}>
            <div className={styles.selectedMoves}>
                <div className={styles.pick}>
                    <div className={win > 0 ? styles.winner : null}>
                        {playerMove === RPSMove.paper ? <MoveButton img={paper} moveType={RPSMove.paper} onClick={() => null}></MoveButton> : null}
                        {playerMove === RPSMove.scissors ? <MoveButton img={scissors} moveType={RPSMove.scissors} onClick={() => null}></MoveButton> : null}
                        {playerMove === RPSMove.rock ? <MoveButton img={rock} moveType={RPSMove.rock} onClick={() => null}></MoveButton> : null}
                    </div>
                    <h4 className={styles.pickLabel}>You picked</h4>
                </div>
                <div className={styles.pick}>
                    <div className={win < 0 ? styles.winner: null}>
                        {!CPUMove ? <div className={styles.emptyMove}></div> : null}
                        {CPUMove === RPSMove.paper ? <MoveButton img={paper} moveType={RPSMove.paper} onClick={() => null}></MoveButton> : null}
                        {CPUMove === RPSMove.scissors ? <MoveButton img={scissors} moveType={RPSMove.scissors} onClick={() => null}></MoveButton> : null}
                        {CPUMove === RPSMove.rock ? <MoveButton img={rock} moveType={RPSMove.rock} onClick={() => null}></MoveButton> : null}
                    </div>
                    <h4 className={styles.pickLabel}>The house picked</h4>
                </div>
            </div>
            <div className={styles.resultSection}>
                {win > 0 ? <h1 className={styles.resultLabel}>You Win</h1> : null}
                {win < 0 ? <h1 className={styles.resultLabel}>You Lose</h1> : null}
                {showPlayAgainBtn ? <Button text="Play Again" customCss={win === 0 ? [styles.playAgainBtn, styles.pair] : [styles.playAgainBtn]} onClickHandler={playAgainHandler}></Button> : null}
            </div>
        </div >
    );
}

export default Match;
