<template>

    <div class="chessboard">
        <div :class="`d-flex rank rank-${rank}`" v-for="rank in [...BoardRank].reverse()" :key="rank">
            <div :class="{selected: store.selectedSquare === file + rank, 'legal-move':
            store.selectedPieceLegalMoves.includes(file + rank)}"
                 class="square text-start p-1 "
                 v-for="file
             in [...BoardFile]" :key="file"
                 @click="handleClickSquare(file, rank, store.chessBoard[file + rank])">
                <p class="lh-1 position-absolute">{{ file }} {{ rank }}</p>
                <img v-if="store.chessBoard[file + rank]" :class="`img-fluid piece`"
                     :src="`img/${store.chessBoard[file + rank]}`"
                     alt="">
                <div class="d-none hover-border position-absolute"></div>
                <div class="d-none legal-move-indicator position-absolute"></div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {BoardFile, BoardRank} from "../utils/contants.ts";
import {useChessBoardStore} from "../store/chessboard.ts";

const store = useChessBoardStore() // Pinia FTW

const handleClickSquare = (file, rank, piece) => {
    store.selectedSquare = file + rank
    store.getLegalMoves(piece, store.selectedSquare)
}

onMounted(() => {
    store.initChessBoard() // 🤌

})
</script>
