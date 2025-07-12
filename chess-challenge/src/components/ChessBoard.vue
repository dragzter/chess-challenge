<template>
    <div class="chessboard">
        <div :class="`d-flex rank rank-${rank}`" v-for="rank in [...BoardRank].reverse()" :key="rank">
            <div :data-id="getId()" :class="{selected: store.selectedSquare === file + rank, 'legal-move':
            store.isLegalSquare(file + rank), 'capture': store.isCaptureSquare(file + rank)}"
                 class="square text-start p-1 "
                 v-for="file in BoardFile" :key="file"
                 @click="handleClickSquare(file, rank, store.chessBoard[file + rank])">
                <p class="lh-1 position-absolute">{{ file }} {{ rank }}</p>
                <img v-if="store.chessBoard[file + rank]" :class="`img-fluid piece`"
                     draggable="false"
                     :src="`img/${store.chessBoard[file + rank]?.image}`"
                     alt="">

                <selected-square-border/>
                <legal-move-indicator/>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import {nextTick, onMounted} from "vue";
import {BoardFile, BoardRank} from "../utils/contants.ts";
import {useChessBoardStore} from "../store/chessboard.ts";
import LegalMoveIndicator from "./LegalMoveIndicator.vue";
import SelectedSquareBorder from "./SelectedSquareBorder.vue";
import {Popover} from 'bootstrap/dist/js/bootstrap.esm.js';

const store = useChessBoardStore() // Pinia FTW

const getId = () => {
    return crypto.randomUUID()
}

const handleClickSquare = async (file, rank, piece) => {
    let previousSquare = ""
    store.squaresClicked.push(file + rank)


    previousSquare = JSON.parse(JSON.stringify(store.selectedSquare))
    store.selectedSquare = file + rank

    store.getLegalMoves(piece, store.selectedSquare)

    if (store.isLegalSquare(file + rank)) {
        store.movePiece(previousSquare, store.selectedSquare)
    }
}

onMounted(() => {
    store.initChessBoard()

})
</script>
