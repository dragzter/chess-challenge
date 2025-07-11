import {BoardFile, BoardRank} from "./contants.ts";

export function getRankIndex(val: number) {
	return BoardRank.findIndex((r) => r === val)
}

export function getFileIndex(val: string) {
	return BoardFile.findIndex((f) => f === val)
}

