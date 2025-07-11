import {defineStore} from "pinia"


export const useChessBoardStore = defineStore("chessBoard", {
	state: () => ({turn: "white", board: [], occupiedSquares: []}),
	getters: {
		isOccupiedSquare: () => {
			console.log("getter: isOccupiedSquare")
		}
	},
	actions: {}
})