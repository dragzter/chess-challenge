<template>
    <h5>Game Log</h5>
    <p class="mb-1 text-info">Turn:
        <span class="text-capitalize badge bg-dark">{{ store.turn }}</span>
    </p>
    <p class="mb-1 text-info">Moved Pwns: </p>
    <div class="mb-3 text-list">
        {{ store.pawnsThatMovedAtLeastOnce.join(", ") }}
    </div>
    <p class="mb-1 text-info">Squares Clicked: </p>
    <div class="text-list mb-3">
        {{ store.squaresClicked.join(", ") }}
    </div>
    <hr>
    <p>Moves:</p>
    <div class="moves-list">
        <template v-for="( m, i) in [...store.movesList].reverse()" :key="m.piece">
            <div class="card mb-2">
                <div class="card-body">
                    <small class="text-info">Move: {{ store.movesList.length - i }}</small>
                    <p class="mb-1">Piece: {{ m.piece }}</p>
                    <p class="mb-1">From: {{ m.from }}</p>
                    <p class="m-0">To: {{ m.to }}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import {useChessBoardStore} from "../store/chessboard.ts";

const store = useChessBoardStore()
</script>
