export interface ChessPiece {
	id: string
	name: string
	possible_moves: number[][]
	alternate_moves?: number[][] // Black pawn moves down
	color?: string
}

export type Rank = string[]
export type File = number[]