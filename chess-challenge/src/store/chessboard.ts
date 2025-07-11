import {defineStore} from "pinia"
import {BoardFile, BoardRank, StartGamePieceState} from "../utils/contants.ts";
import {pieceInfo} from "../utils/helpers.ts";


export const useChessBoardStore = defineStore("chessBoard", {
	state: () => ({
		turn: "white",
		board: [],
		occupiedSquares: [],
		startingPositions: JSON.parse(JSON.stringify(StartGamePieceState)),
		chessBoard: {} as Record<string, unknown>,
		selectedSquare: "",
	}),
	getters: {
		isOccupiedSquare: (state) => {
			return (targetSquare: string) => state.chessBoard[targetSquare]
		},
	},
	actions: {
		initChessBoard() {
			for (let i = 0; i < BoardRank.length; i++) {
				for (let y = 0; y < BoardFile.length; y++) {
					const square = `${BoardFile[y]}${BoardRank[i]}`
					this.chessBoard[square] = this.startingPositions[square] || null
				}
			}
			
		},
		getLegalMoves(piece: string) {
		
		},
		movePiece(from: string, to: string) {
			if (!this.chessBoard[from]) return
			
			if (this.isOccupiedSquare(to)) {
				console.log("cant move there, occupado dawg -> ", this.isOccupiedSquare(to))
				const piece = this.isOccupiedSquare(to) as string
				
				console.log(piece)
				if (piece) {
					console.log(pieceInfo("white", piece))
				}
				
			} else {
				const piece = this.chessBoard[from]
				this.chessBoard[from] = null
				this.chessBoard[to] = piece
			}
		}
	}
})