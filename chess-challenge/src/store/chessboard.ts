import {defineStore} from "pinia"
import {BoardFile, BoardRank, StartGamePieceState} from "../utils/contants.ts";
import {movesByPiece, performableMoves, pieceInfo} from "../utils/helpers.ts";


export const useChessBoardStore = defineStore("chessBoard", {
	state: () => ({
		turn: "white",
		board: [],
		occupiedSquares: [],
		startingPositions: JSON.parse(JSON.stringify(StartGamePieceState)),
		chessBoard: {} as Record<string, string | null>,
		selectedSquare: "",
		pawnsThatMovedAtLeastOnce: [],
		selectedPieceLegalMoves: [] as string[]
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
		getLegalMoves(piece: string, currentPosition: string) {
			if (!piece) return
			const selectedPiece = pieceInfo("white", piece)
			
			if (selectedPiece.friendly) {
				console.log("im friendly!")
				const availableMoves = movesByPiece(selectedPiece.piece, currentPosition)
				const legalMoves = performableMoves(availableMoves, this.chessBoard)
				
				console.log(legalMoves)
				this.selectedPieceLegalMoves = legalMoves
			}
			
		},
		switchTurn() {
			this.turn = this.turn === "white" ? "black" : "white"
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
			
			this.switchTurn()
		}
	}
})