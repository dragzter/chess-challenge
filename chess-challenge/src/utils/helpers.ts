import {BoardFile, BoardRank} from "./contants.ts";

export function getRankIndex(val: number) {
	return BoardRank.findIndex((r) => r === val)
}

export function getFileIndex(val: string) {
	return BoardFile.findIndex((f) => f === val)
}

export function pieceInfo(player: string, piece: string) {
	const info: Record<string, string | boolean> = {}
	
	info.color = piece.includes("b") ? "black" : "white"
	info.friendly = player === info.color
	info.piece = piece.replace("b_", "").split(".")[0]
	
	return info
}