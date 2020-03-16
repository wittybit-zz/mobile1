import React from 'react';
import Node from './Node/Node';
import './Todo.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';



library.add(faLocationArrow)

var START_NODE_ROW = 2;
var START_NODE_COL = 4;
var FINISH_NODE_ROW = 11;
var FINISH_NODE_COL = 4;


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      items: [],
      currentItem: {
        text: '',
        key: ''

      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  componentDidMount() {
    const grid = getInitialGrid();

    this.setState({ grid });
  }


  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }
  clear() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++)
        if (document.getElementById(`node-${i}-${j}`).className === 'node node-visited' || document.getElementById(`node-${i}-${j}`).className === 'node node-shortest-path') {

          document.getElementById(`node-${i}-${j}`).className = 'node';

        }
    }
  }



  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }

  }

  visualizeDijkstra(sr, sc, er, ec) {
    const { grid } = this.state;
    const startNode = grid[sr][sc];
    const finishNode = grid[er][ec];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // document.querySelector(".node-start").classList.remove('node-start');
    // document.querySelector(`#node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).classList.add('node-start');
  }

  addItem(e) {
    e.preventDefault();
    this.clear();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
    this.componentDidMount();
    this.clear();

  }
  handleInput(e) {
    e.preventDefault();
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()

      }
    })

    // var products = {
    //   'sugar': [35, 4],
    //   'milk': [45, 4],
    //   'banana': [42, 13],
    //   'soap': [18, 3],
    //   'phone': [16, 13],
    //   'laptop': [23, 16],
    //   'socks': [32, 15],
    //   'pen': [12, 9]
    // };

    // if (products.hasOwnProperty(e.target.value)) {

    //   var targetCell = products[e.target.value];
    //   var targetRow = targetCell[1];
    //   var targetCol = targetCell[0];
    //   console.log(targetRow);
    //   console.log(targetCol);
    //   console.log(targetCell);


    // }

  }
  deleteItem(text) {
    this.clear();
    console.log(text);
    var products = {
      'sugar': [35, 4],
      'milk': [45, 4],
      'banana': [42, 13],
      'soap': [18, 3],
      'phone': [16, 13],
      'laptop': [23, 16],
      'socks': [32, 15],
      'pen': [12, 9]
    };
    if (products.hasOwnProperty(text)) {

      var targetCell = products[text];
      var targetRow = targetCell[1];
      var targetCol = targetCell[0];
      console.log("delete");
      console.log(targetRow);
      console.log(targetCol);
      console.log(targetCell);
      var FINISH_NODE_ROW = targetRow;
      var FINISH_NODE_COL = targetCol;
      this.visualizeDijkstra(START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);

    }


  }

  setUpdate(text, key) {
    console.log("items:" + this.state.items);
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        console.log(item.key + "    " + key)
        item.text = text;
      }
    })
    this.setState({
      items: items
    })



  }



  render() {
    const { grid } = this.state;
    return (
      <>
        <div className="outer">
          <div className="Todo">
            <header>
              <h1 className="top-head">Shopping List</h1>
              <form id="to-do-form" onSubmit={this.addItem}>
                <input type="text" placeholder="Enter Item" value={this.state.currentItem.text} onChange={this.handleInput}></input>
                <button className="add" type="submit">Add</button>
              </form>
              <p>{this.state.items.text}</p>
              <div className="container">
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate} />
              </div>
              <span className="instruction" >Searchable Items: sugar, milk, banana, soap, phone, laptop, socks, pen</span>

            </header>

          </div>
          {/* <button onClick={() => this.visualizeDijkstra(START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL)}>
          Visualize Dijkstra's Algorithm
        </button> */}
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        row={row}></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
var obj = {
  4: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18],
  5: [1, 14, 18],
  6: [1, 14, 15, 16, 18],
  7: [1, 16, 18],
  8: [1, 16, 18],
  9: [1, 16, 18],
  10: [1, 3, 4, 5, 6, 7, 10, 12, 16, 18],
  11: [1, 10, 12, 16, 18],
  12: [1, 10, 12, 16, 18],
  13: [1, 3, 4, 5, 6, 7, 10, 12, 16, 17, 18],
  14: [1, 18],
  15: [1, 18],
  16: [1, 3, 4, 5, 6, 7, 10, 12, 18],
  17: [1, 10, 12, 18],
  18: [1, 10, 12, 18],
  19: [1, 3, 4, 5, 6, 7, 10, 12, 18],
  20: [1, 18],
  21: [1, 18],
  22: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  23: [1, 10, 12, 18],
  24: [1, 10, 12, 18],
  25: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  26: [1, 18],
  27: [1, 18],
  28: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  29: [1, 10, 12, 18],
  30: [1, 10, 12, 18],
  31: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  32: [1, 18],
  33: [1, 18],
  34: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  35: [1, 10, 12, 18],
  36: [1, 10, 12, 18],
  37: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  38: [1, 18],
  39: [1, 18],
  40: [1, 3, 4, 5, 6, 7, 10, 12, 15, 16, 17, 18],
  41: [1, 10, 12, 18],
  42: [1, 10, 12, 18],
  43: [1, 10, 12, 18],
  44: [1, 18],
  45: [1, 18],
  46: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18],
  47: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
}
function createWall(obj, key, value) {
  return obj.hasOwnProperty(key) && obj[key].includes(value);
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: (createWall(obj, col, row)) ? true : false,
    previousNode: null,
  };
};




const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Todo;
