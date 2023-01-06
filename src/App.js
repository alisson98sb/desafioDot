import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([])
  const [listRemoved, setListRemoved] = useState([])

  function handleClick(event) {
    if(list.length === 0 ) setListRemoved([]);
  
    const newDot = {
      clientX : event.clientX,
      clientY : event.clientY
    }

    setList((prev) => [...prev, newDot])
  }
  
  function handleUndo(event) {
    event.stopPropagation()


    if(list.length === 0 ) return;

    const lastDot = list[list.length - 1];
    setListRemoved((prev)=> [...prev, lastDot])

    setList((prev)=> {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    })
  }

  function handleReDo(event){
    event.stopPropagation()

    if(listRemoved.length === 0 ) return;

    const lastDot = listRemoved[listRemoved.length - 1];
    setList((prev)=> [...prev, lastDot])
    
    setListRemoved((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    })
  }

  function handleReset(event) {
    event.stopPropagation()
    setListRemoved(list)
    setList([])
  }


  return (
    <div id="Page" onClick={handleClick}>
      {list.map((item) => (
        <span id="dot" key={item.clientX} style={{left: item.clientX, top: item.clientY} }/>
      ))}

      <div id='dotButtons'>
        <button onClick={handleUndo}>Desfazer</button>
        <button onClick={handleReDo}>Refazer</button>
        <button onClick={handleReset}>Zerar</button>
      </div>
    </div>
  );
}

export default App;
