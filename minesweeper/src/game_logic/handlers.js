export const mineBuilder =(data =[], height, width, mines) =>{
    let minesGenerated = 0;
    while (minesGenerated <= mines){
        let randNum = Math.floor(Math.random() * width)
        let randNum2 = Math.floor(Math.random() * height)
    if(!data[randNum][randNum2].isMine){
        data[randNum][randNum2].isMine = true;
        minesGenerated ++   
    }
}
return data
}

export const getAdjacentSpace = (i=0, n=0, data=0, height=0, width=0) =>{
    let neighbors =[];
    const surroundings = [
        [-1,-1],
        [-1,0],
        [-1,1],
        [0,-1],
        [0,1],
        [1,-1],
        [1,0],
        [1,1]
    ]
   surroundings.forEach(([x,y])=>{
    const newX = i + x;
    const newY = n + y;
    if(newX >=0 && newX < width && newY >= 0 && newY < height){
        neighbors.push(data[newX][newY])
    }
   }) 
   return neighbors
}

export const makeAdjacentSpaces = (data=[], height=0, width=0) =>{
    let dataCopy = data;
    for(let i = 0; i < width; i++){
        for(let n = 0; n < width; n++){
            let numMines = 0
            const area = getAdjacentSpace(data[i][n].x, data[i][n].y, data, height, width)
            area.map((value) =>{
                if (value.isMine){
                    return numMines++
                }
                return 0

            })
            if(!numMines){
                dataCopy[i][n].isEmpty = true;
            }
            dataCopy[i][n].neighbors = numMines;
        }
    }
    return dataCopy
}

export const setUpBoard= (setUpData)=> {
    const {width:w, height:h, mines:m} = setUpData
    const board = (Array(w).fill().map((_, indexH) =>
        Array(h).fill().map((_, indexW) => (
            {
                x: indexH,
                y: indexW,
                isMine: false,
                neighbors: 0,
                isEmpty: false,
                isRevealed: false
            })
        )))
    
    let minesArray = mineBuilder(board, h, w, m);
    let neighborsArray = makeAdjacentSpaces(minesArray, h, w);
    return neighborsArray
}

export const emptyCells= (h, w, x, y, data)=>{
    let neighbors = getAdjacentSpace(h, w, x, y, data);
    neighbors.map((cell)=>{
        if(!cell.isRevealed &&(cell.isEmpty || !cell.isMine)){
            Object.assign(data[cell.x][cell.y], {isRevealed:true});
        if(cell.isEmpty){
            emptyCells(h, w, cell.x, cell.y, data)
        }
        }
        return null;
    })
}