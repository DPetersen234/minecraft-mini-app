import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { setUpBoard, emptyCells } from '../game_logic/handlers'
import produce from 'immer'

import GameCell from './GameCell'


const GameBoard = () => {
   const setUpData =({ width: 10, height: 10, mines:10 })

   const GameDiv = styled.div`
        width: 50%;
        height: 75vh;
        border: 1px solid red;
        margin-left: 25%;
    `
    const BoardDiv = styled.div`
        
        display: grid;
        grid-template-columns: repeat(${setUpData.width}, 30px);
        grid-template-rows: repeat(${setUpData.height}, 30px);
        justify-content: center;
        border: 1px solid black;
        place-content: center center;
    `
    const [gameStatus, setGameStatus] = useState('Game On')
    const [grid, setGrid] = useState(()=> setUpBoard(setUpData))

    const onLeftClick = (event, x, y) =>{
        event.preventDefault();
        

        if(grid[x][y].isRevealed) return;
        const updatedGrid = produce(grid, (draft) =>{
            Object.assign(draft[x][y], {isRevealed:true})
            if(draft[x][y].isEmpty){
                emptyCells(setUpData.height, setUpData.width, x, y, draft)
            }
        })
        if(updatedGrid[x][y].isMine){
            return setGameStatus ('Game Over')
        }
        setGrid(updatedGrid)
    }
    const resetter = (e, setUpData) =>{
        e.preventDefault();
        setGameStatus('Game On')
        setGrid(setUpBoard(setUpData))
    }
    return (
        <GameDiv>
            <h2>Board</h2>
            <h3>{gameStatus}</h3>
            {gameStatus === 'Game Over' && <button onClick={(e)=> resetter(e, setUpData)}>New Game</button>}
            <BoardDiv>
                {grid.map((row, i) => row.map((column, n) => (
                    <GameCell onLClick= {(e, i, n)=> onLeftClick(e, i, n)} key ={`${i} - ${n}`} column ={column} i ={i} n={n}/>
                )))
                }
            </BoardDiv>
        </GameDiv>
    )
}
export default GameBoard