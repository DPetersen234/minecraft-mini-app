import GameBoard from "./components/GameBoard";
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: cornflowerblue;
  justify-content: center;
  text-align: center;
  border: 1px solid green;

`
function App() {
  return (
    <Container className="App">
      <h1>MineSweeper</h1>
      <GameBoard/>
    </Container>
  );
}

export default App;
