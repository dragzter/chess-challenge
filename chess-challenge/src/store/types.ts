import type {Piece} from "../utils/contants.ts";

export interface ChessPiece {
	id: string
	name: string
	possible_moves: number[][]
	alternate_moves?: number[][] // Black pawn moves down
	capture_moves?: number[][]
	alternate_capture_moves?: number[][]
	color?: string
}

export type Rank = string[]
export type File = number[]

export interface PieceInfo {
	piece: string;
	friendly: boolean;
	color: string
}

export interface FinalMoveList {
	moves: string[]
	capture_moves: string[]
}

export type ChessBoard = Record<string, Piece | null>