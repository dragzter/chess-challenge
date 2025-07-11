import {defineStore} from "pinia"
import {BoardFile, BoardRank, StartGamePieceState} from "../utils/contants.ts";


export const useChessBoardStore = defineStore("chessBoard", {
	state: () => ({
		turn: "white",
		board: [],
		occupiedSquares: [],
		startingPositions: JSON.parse(JSON.stringify(StartGamePieceState)),
		chessBoard: {} as Record<string, unknown>
	}),
	getters: {
		isOccupiedSquare: () => {
			console.log("getter: isOccupiedSquare")
		}
	},
	actions: {
		initChessBoard() {
			for (let i = 0; i < BoardRank.length; i++) {
				for (let y = 0; y < BoardFile.length; y++) {
					const square = `${BoardFile[y]}${BoardRank[i]}`
					this.chessBoard[square] = this.startingPositions[square] || null
				}
			}
		}
	}
})