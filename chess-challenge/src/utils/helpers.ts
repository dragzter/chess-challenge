import {BoardFile, BoardRank, type Piece} from "./contants.ts";
import type {ChessBoard, ChessPiece, PieceInfo} from "../store/types.ts";

export function getRankIndex(val: string) {
	return BoardRank.findIndex((r) => r === val)
}

export function getFileIndex(val: string) {
	return BoardFile.findIndex((f) => f === val)
}

export function pieceInfo(player: string, piece: Piece): PieceInfo {
	const info = {} as PieceInfo;
	
	info.color = piece.color;
	info.friendly = player === piece.color;
	info.piece = piece.type;
	
	return info;
}

export function getMoveType(chessPiece: ChessPiece, currentPlayer: string, moveType: string): number[][] {
	const _moveTypes: Record<string, () => number[][]> = {
		move: (): number[][] => (currentPlayer === "black" ? chessPiece.alternate_moves : chessPiece.possible_moves) as number[][],
		capture: (): number[][] => (currentPlayer === "black" ? chessPiece.alternate_capture_moves : chessPiece.capture_moves) as number[][],
	}
	
	return _moveTypes[moveType]()
}

/**
 * Provides Board coordinates for the current piece
 * @param moveList
 */
export function moveIndicesToBoardCoordinates(moveList: number[][]) {
	const openSquares = []
	for (let i = 0; i < moveList.length; i++) {
		const move = moveList[i]
		const square = move.map((m, index) => {
			return index === 0 ? BoardFile[m] : BoardRank[m]
		}).join("")
		
		openSquares.push(square)
	}
	return openSquares
}

export function canMoveToSquare(board: ChessBoard, availableMoves: string[]) {
	return availableMoves.filter((m) => {
		const square = board[m];
		return !square;
	});
}

/**
 * Provides indices for the x and y arrays
 * @param piece
 * @param currentPosition
 */
export function moveOrCaptureByPiece(piece: Piece, currentPosition: string, moveListArray: number[][]) {
	const pieces: Record<string, () => number[][]> = {
		pawn: () => {
			const moveList = moveListArray
			const moves = []
			
			const d = currentPosition.split("").map((coord: string, index: number) => {
				const arr = index === 0 ? BoardFile : BoardRank
				return arr.findIndex(v => v === coord)
			})
			
			for (let [x, y] of moveList) {
				moves.push([d[0] + x, d[1] + y])
			}
			
			return moves
		},
		knight: () => {
			return []
		},
		queen: () => {
			return []
		},
		king: () => {
			return []
		},
		rook: () => {
			return []
		},
		bishop: () => {
			return []
		},
	}
	
	return pieces[piece.type]()
}
