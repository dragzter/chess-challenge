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

export const Knight: ChessPiece = {
	possible_moves: [[2, 1], [2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2], [-2, -1], [-2, 1]],
	name: "Knight",
	id: "knight"
}

export const Pawn: ChessPiece = {
	possible_moves: [[0, 1], [0, 2]],
	alternate_moves: [[0, -1], [0, -2]],
	name: "Pawn",
	id: "pawn"
}

export const Bishop: ChessPiece = {
	possible_moves: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
	name: "Bishop",
	id: "bishop"
}

export const Rook: ChessPiece = {
	possible_moves: [[1, 0], [-1, 0], [0, 1], [0, -1]],
	name: "Rook",
	id: "rook"
}

export const Queen: ChessPiece = {
	possible_moves: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
	name: "Queen",
	id: "queen"
}

export const King: ChessPiece = {
	possible_moves: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
	name: "King",
	id: "king"
}

// This is the starting state of the board
export const StartGamePieceState: Record<string, string> = {
	a2: Pieces.white.pawn,
	b2: Pieces.white.pawn,
	c2: Pieces.white.pawn,
	d2: Pieces.white.pawn,
	e2: Pieces.white.pawn,
	f2: Pieces.white.pawn,
	g2: Pieces.white.pawn,
	h2: Pieces.white.pawn,
	a1: Pieces.white.rook,
	b1: Pieces.white.knight,
	c1: Pieces.white.bishop,
	d1: Pieces.white.queen,
	e1: Pieces.white.king,
	f1: Pieces.white.bishop,
	g1: Pieces.white.knight,
	h1: Pieces.white.rook,
	a7: Pieces.black.pawn,
	b7: Pieces.black.pawn,
	c7: Pieces.black.pawn,
	d7: Pieces.black.pawn,
	e7: Pieces.black.pawn,
	f7: Pieces.black.pawn,
	g7: Pieces.black.pawn,
	h7: Pieces.black.pawn,
	a8: Pieces.black.rook,
	b8: Pieces.black.knight,
	c8: Pieces.black.bishop,
	d8: Pieces.black.queen,
	e8: Pieces.black.king,
	f8: Pieces.black.bishop,
	g8: Pieces.black.knight,
	h8: Pieces.black.rook,
};


