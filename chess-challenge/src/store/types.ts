export interface ChessPiece {
	id: string
	name: string
	possible_moves: number[][]
	color?: string
}

export type Rank = string[]
export type File = number[]