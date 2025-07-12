<template>
    <h3 class="mb-3">Game Log</h3>
    <hr>
    <h5 class="mb-2">Turn:
        <span class="text-capitalize badge bg-dark">{{ store.turn }}</span>
    </h5>

    <template v-if="store.squaresClicked?.length">
        <p class="mb-1">Squares Clicked: </p>
        <div class="text-list mb-3">
            {{ store.squaresClicked.join(", ") }}
        </div>
    </template>
    <hr>
    <p>Moves:</p>
    <div class="moves-list">
        <template v-for="( m, i) in [...store.movesList].reverse()" :key="m.piece">
            <div class="mb-2">
                <small class="text-info">Move: {{ store.movesList.length - i }}</small>
                <p class="m-0">Piece: {{ m.piece }}</p>
                <p class="m-0">From: {{ m.from }} <span class="text-secondary">To: {{ m.to }}</span></p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import {useChessBoardStore} from "../store/chessboard.ts";

const store = useChessBoardStore()
</script>
