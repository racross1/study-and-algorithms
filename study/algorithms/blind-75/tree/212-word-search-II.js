// Given an m x n board of characters and a list of strings words, return all words on the board.

// Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

// Example 1:


// Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]
// Example 2:


// Input: board = [["a","b"],["c","d"]], words = ["abcb"]
// Output: []

//organize words in prefix trie
//backtracking DFS for each node


var findWords = function(board, words) {
    let res = [];
  
    const root = buildTrie(words);
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        dfs(root, row, col, board, res);
      }
    }
    return res;
  
  };
  
    function dfs(node, row, col, board, res) {
        if (node.end) {
        res.push(node.end);
        node.end = null;   // make sure only print one time for each word
      }
  
      if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return;
      if (!node[board[row][col]]) return;
  
      const c = board[row][col];
      board[row][col] = '#';  // mark visited
      dfs(node[c], row + 1, col, board, res); // up
      dfs(node[c], row - 1, col, board, res); // down
      dfs(node[c], row, col + 1, board, res); // right
      dfs(node[c], row, col - 1, board, res); // left
      board[row][col] = c;  // reset - back track
    }
  
  function buildTrie(words) {
      const root = {};
      for (let w of words) {
        let pointer = root; // here 'pointer' just a reference, that we use to go down from root till last child node
                            // and when we rich last child node - this is the end of the world
                            // and instead of setting "node.end = true", we set "node.end = word"
        for (let c of w) {
          if (!pointer[c]) pointer[c] = {}; // if we already have such node, lets ignore it creating and just move the pointer
          pointer = pointer[c];
        }
        pointer.end = w; 
      }
      return root;
    }

    let board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]

    console.log(findWords(board, words))