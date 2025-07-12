import {defineStore} from "pinia"
import {
	BoardFile,
	BoardRank,
	getPieceDefinition,
	type Piece,
	StartGamePieceState
} from "../utils/contants.ts";
import {
	canMoveToSquare,
	getMoveType,
	moveIndicesToBoardCoordinates, moveOrCaptureByPiece,
} from "../utils/helpers.ts";
import type {ChessBoard, ChessPiece} from "./types.ts";


export const useChessBoardStore = defineStore("chessBoard", {
	state: () => ({
		turn: "white",
		currentPlayer: "white",
		board: [],
		moveSound: new Audio("sound/move.wav"),
		occupiedSquares: [],
		startingPositions: JSON.parse(JSON.stringify(StartGamePieceState)),
		chessBoard: {} as ChessBoard,
		selectedSquare: "",
		selectedPieceLegalSquares: {
			moves: [],
			captures: []
		} as { moves: string[], captures: string[] },
		squaresClicked: [] as string[],
		movesList: [] as { piece: string, from: string, to: string }[]
	}),
	getters: {
		isLegalSquare: (state) => (square: string) => {
			return [...state.selectedPieceLegalSquares.captures, ...state.selectedPieceLegalSquares.moves].includes(square)
		},
		isCaptureSquare: (state) => (square: string) => {
			return state.selectedPieceLegalSquares.captures.includes(square)
		},
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
		getLegalMoves(piece: Piece, currentPosition: string) {
			if (!piece) return
			const isFriendly = piece.color === this.currentPlayer
			if (!isFriendly) return
			this.selectedPieceLegalSquares.captures = []
			
			
			const chessPiece = getPieceDefinition(piece.type) as ChessPiece
			const moves = getMoveType(chessPiece, this.currentPlayer, "move")
			const captures = getMoveType(chessPiece, this.currentPlayer, "capture")
			
			
			const availableMoveIndices = moveOrCaptureByPiece(piece, currentPosition, moves)
			this.selectedPieceLegalSquares.moves = moveIndicesToBoardCoordinates(availableMoveIndices)
			
			if (piece.type === "pawn") {
				this.selectedPieceLegalSquares.moves = !!piece.moves.length ? [this.selectedPieceLegalSquares.moves[0]] : this.selectedPieceLegalSquares.moves
			}
			
			const captureIndices = moveOrCaptureByPiece(piece, currentPosition, captures)
			const captureCoords = moveIndicesToBoardCoordinates(captureIndices)
			
			captureCoords.map((co) => {
				const pieceInCoordinate = this.chessBoard[co]
				if (pieceInCoordinate && pieceInCoordinate.color !== this.currentPlayer) {
					console.log(co)
					this.selectedPieceLegalSquares.captures.push(co)
				}
			})
			
			this.selectedPieceLegalSquares.moves = canMoveToSquare(this.chessBoard, this.selectedPieceLegalSquares.moves)
			
			console.log("legal moves", this.selectedPieceLegalSquares.captures)
			
		},
		switchTurn() {
			this.turn = this.turn === "white" ? "black" : "white"
			this.currentPlayer = this.turn
		},
		
		movePiece(from: string, to: string) {
			if (!this.chessBoard[from]) return
			
			const thisPiece = this.chessBoard[from]
			
			if (thisPiece.color !== this.currentPlayer) return
			
			thisPiece.moves.push(to)
			
			console.log(thisPiece)
			
			this.moveSound.play()
			
			this.chessBoard[from] = null
			this.chessBoard[to] = thisPiece
			this.movesList.push({piece: `${this.currentPlayer} ${thisPiece.type}`, from, to})
			this.selectedPieceLegalSquares = {moves: [], captures: []}
			this.switchTurn()
		}
	}
})