import {BoardFile, BoardRank, Pawn} from "./contants.ts";
import type {PieceInfo} from "../store/types.ts";

export function getRankIndex(val: string) {
	return BoardRank.findIndex((r) => r === val)
}

export function getFileIndex(val: string) {
	return BoardFile.findIndex((f) => f === val)
}

export function pieceInfo(player: string, piece: string): PieceInfo {
	const info = {} as PieceInfo
	
	info.color = piece.includes("b") ? "black" : "white"
	info.friendly = player === info.color
	info.piece = piece.replace("b_", "").split(".")[0]
	
	return info
}

export function performableMoves(moveList: number[][], chessboard: Record<string, string | null>) {
	const openSquares = []
	for (let i = 0; i < moveList.length; i++) {
		const move = moveList[i]
		const square = move.map((m, index) => {
			return index === 0 ? BoardFile[m] : BoardRank[m]
		}).join("")
		
		const squareOnChessBoard = chessboard[square]
		if (!squareOnChessBoard) {
			openSquares.push(square)
		}
	}
	return openSquares
}

export function movesByPiece(piece: string, currentPosition: string) {
	const pieces: Record<string, () => number[][]> = {
		pawn: () => {
			const moves = Pawn.possible_moves
			const actualMoves = []
			
			const d = currentPosition.split("").map((coord: string, index: number) => {
				const arr = index === 0 ? BoardFile : BoardRank
				return arr.findIndex(v => v === coord)
			})
			
			for (let [x, y] of moves) {
				actualMoves.push([d[0] + x, d[1] + y])
			}
			
			return actualMoves
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
	
	
	return pieces[piece]()
}