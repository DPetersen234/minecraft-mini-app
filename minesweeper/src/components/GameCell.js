import React from "react"
import styled from "styled-components"
import { FaBomb, FaCheckSquare } from 'react-icons/fa'

const CellDiv = styled.div`
border: 1px solid grey;
background-color: darkgray;
`
const GameCell= ({column, i, n, onLClick})=> {
    const getVal =(cellData) =>{
        const {isMine, isRevealed, neighbors} = cellData
        if(!isRevealed) return <FaCheckSquare/>;
        if(isMine) return <FaBomb/>
        if(isRevealed) return ' '
        if(neighbors) return neighbors  
    }
 return(
    <CellDiv onClick={(e) => onLClick(e, i, n)} key={`${i} - ${n}`} data-dimension={`${i} - ${n}`}>
    {getVal(column)}
</CellDiv>
)}
export default GameCell