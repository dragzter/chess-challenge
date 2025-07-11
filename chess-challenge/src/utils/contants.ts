import type {ChessPiece} from "../store/types.ts";

export const Color = {
	black: "black",
	white: "white"
}

export const BoardFile = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const BoardRank = [1, 2, 3, 4, 5, 6, 7, 8]
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

export const Knight: ChessPiece = {
	possible_moves: [],
	name: "Knight",
	id: "knight"
}

export const Pawn: ChessPiece = {
	possible_moves: [],
	name: "Pawn",
	id: "pawn"
}

export const Bishop: ChessPiece = {
	possible_moves: [],
	name: "Bishop",
	id: "bishop"
}

export const Rook: ChessPiece = {
	possible_moves: [],
	name: "Rook",
	id: "rook"
}

export const Queen: ChessPiece = {
	possible_moves: [],
	name: "Queen",
	id: "queen"
}

export const King: ChessPiece = {
	possible_moves: [],
	name: "King",
	id: "king"
}

export const Chessboard: Record<string, unknown> = {}
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

for (let i = 0; i < BoardRank.length; i++) {
	for (let y = 0; y < BoardFile.length; y++) {
		const square = `${BoardFile[y]}${BoardRank[i]}`
		Chessboard[square] = StartGamePieceState[square] || null
	}
}

console.log(Chessboard)