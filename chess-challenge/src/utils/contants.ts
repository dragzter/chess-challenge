import type {ChessPiece} from "../store/types.ts";

export const BoardFile = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const BoardRank = ["1", "2", "3", "4", "5", "6", "7", "8"]

// These pieces were borrowed form chess.com strictly for this exercise and will be deleted
// immediately after.
export const Pieces = {
	white: {
		pawn: "pawn.png",
		rook: "rook.png",
		bishop: "bishop.png",
		knight: "knight.png",
		queen: "queen.png",
		king: "king.png"
	},
	black: {
		pawn: "b_pawn.png",
		rook: "b_rook.png",
		bishop: "b_bishop.png",
		knight: "b_knight.png",
		queen: "b_queen.png",
		king: "b_king.png"
	}
}

/**
 * Coordinate Graph
 * ----------------
 * The goal is to translate xy coordinates to board
 * coordinates and perform spot checks on the squares.
 *
 * Movement Example of a Knight piece:
 *
 * 								(Y)
 * 								(+)
 * 								^
 * 								|
 * 								|
 * 								|
 * 								|
 * (-) <---(-2)--(0)--------> (+)  (X)
 * [-2,-1]->o		(-1)  EXAMPLE:
 * 								|		Knight moves to b3 (given [0,0] is d4)
 * 								|
 * 								|
 * 								V
 * 					  		(-)
 *
 *
 * This is what we're really doing.
 * 								(Y)
 * 								(+)
 * 								^
 * 								8
 * 								7
 *								6
 * 								5
 * (-) <a--b--c--(d4)--e--f--g--h> (+)  (X)
 * 								3
 * 								2
 * 								1
 * 								V
 * 					  		(-)
 *
 * given [-2,-1]
 * x: [a,b,c,d,e,f,g,h] - Find index, sum coordinate array.
 * So if we're on d4 (x = 3, y = 3)
 * x = 3 - 2 / x=1 so x[1] = b (index 1 - 0 indexed)
 * y = 3 - 1 / y=2 so y[2] = 3 (index 2 - 0 indexed)
 * new position = b3
 *
 * y: [1,2,3,4,5,6,7,8]
 *
 * Piece: [[x,y], [...]]  -> number[][]
 * -----------------
 * Knight: [2,1], [2,-1], [1,2], [-1,2], [1,-2], [-1,-2], [-2,-1], [-2,1] (static check because
 * knight can jump over pieces.
 * Pawn: [0,1], [0,2] or black pawns [0,-1], [0,-2]
 * Bishop:  [1, 1], [1, -1], [-1, 1],[-1, -1] -> repeat until square is blocked, discontinue checks
 * Queen: [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1] (repeat)
 * King: [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1] (single)
 * Rook: [1, 0], [-1, 0], [0, 1], [0, -1] (repeat)
 */

const Knight: ChessPiece = {
	possible_moves: [[2, 1], [2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2], [-2, -1], [-2, 1]],
	name: "Knight",
	id: "knight"
}

const Pawn: ChessPiece = {
	possible_moves: [[0, 1], [0, 2]],
	alternate_moves: [[0, -1], [0, -2]],
	capture_moves: [[1, 1], [-1, 1]],
	alternate_capture_moves: [[1, -1], [-1, -1]],
	name: "Pawn",
	id: "pawn"
}

const Bishop: ChessPiece = {
	possible_moves: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
	name: "Bishop",
	id: "bishop"
}

const Rook: ChessPiece = {
	possible_moves: [[1, 0], [-1, 0], [0, 1], [0, -1]],
	name: "Rook",
	id: "rook"
}

const Queen: ChessPiece = {
	possible_moves: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
	name: "Queen",
	id: "queen"
}

const King: ChessPiece = {
	possible_moves: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
	name: "King",
	id: "king"
}

export function getPieceDefinition(pieceName: string) {
	return {
		pawn: Pawn,
		rook: Rook,
		knight: Knight,
		king: King,
		queen: Queen,
		bishop: Bishop
	}[pieceName]
}

// This is the starting state of the board
export type Piece = {
	id: string;
	type: string;
	color: 'white' | 'black';
	image: string;
	moves: string[] // store moves as board coordinates d3, e2 etc
};

export const StartGamePieceState: Record<string, Piece> = {
	a2: {
		id: 'wp-a2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	b2: {
		id: 'wp-b2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	c2: {
		id: 'wp-c2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	d2: {
		id: 'wp-d2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	e2: {
		id: 'wp-e2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	f2: {
		id: 'wp-f2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	g2: {
		id: 'wp-g2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	h2: {
		id: 'wp-h2', type: 'pawn', color: 'white', image: Pieces.white.pawn,
		moves: []
	},
	
	a1: {
		id: 'wr-a1', type: 'rook', color: 'white', image: Pieces.white.rook,
		moves: []
	},
	b1: {
		id: 'wn-b1', type: 'knight', color: 'white', image: Pieces.white.knight,
		moves: []
	},
	c1: {
		id: 'wb-c1', type: 'bishop', color: 'white', image: Pieces.white.bishop,
		moves: []
	},
	d1: {
		id: 'wq-d1', type: 'queen', color: 'white', image: Pieces.white.queen,
		moves: []
	},
	e1: {
		id: 'wk-e1', type: 'king', color: 'white', image: Pieces.white.king,
		moves: []
	},
	f1: {
		id: 'wb-f1', type: 'bishop', color: 'white', image: Pieces.white.bishop,
		moves: []
	},
	g1: {
		id: 'wn-g1', type: 'knight', color: 'white', image: Pieces.white.knight,
		moves: []
	},
	h1: {
		id: 'wr-h1', type: 'rook', color: 'white', image: Pieces.white.rook,
		moves: []
	},
	
	a7: {
		id: 'bp-a7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	b7: {
		id: 'bp-b7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	c7: {
		id: 'bp-c7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	d7: {
		id: 'bp-d7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	e7: {
		id: 'bp-e7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	f7: {
		id: 'bp-f7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	g7: {
		id: 'bp-g7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	h7: {
		id: 'bp-h7', type: 'pawn', color: 'black', image: Pieces.black.pawn,
		moves: []
	},
	
	a8: {
		id: 'br-a8', type: 'rook', color: 'black', image: Pieces.black.rook,
		moves: []
	},
	b8: {
		id: 'bn-b8', type: 'knight', color: 'black', image: Pieces.black.knight,
		moves: []
	},
	c8: {
		id: 'bb-c8', type: 'bishop', color: 'black', image: Pieces.black.bishop,
		moves: []
	},
	d8: {
		id: 'bq-d8', type: 'queen', color: 'black', image: Pieces.black.queen,
		moves: []
	},
	e8: {
		id: 'bk-e8', type: 'king', color: 'black', image: Pieces.black.king,
		moves: []
	},
	f8: {
		id: 'bb-f8', type: 'bishop', color: 'black', image: Pieces.black.bishop,
		moves: []
	},
	g8: {
		id: 'bn-g8', type: 'knight', color: 'black', image: Pieces.black.knight,
		moves: []
	},
	h8: {
		id: 'br-h8', type: 'rook', color: 'black', image: Pieces.black.rook,
		moves: []
	},
};

