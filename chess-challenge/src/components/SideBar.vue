<template>
    <h3 class="mb-3">Game Log</h3>
    <hr>
    <h5 class="mb-5">Turn:
        <span class="text-capitalize badge bg-dark">{{ store.turn }}</span>
    </h5>

    <template v-if="store.pawnsThatMovedAtLeastOnce?.length">
        <p class="mb-1 ">Moved Pwns: </p>
        <div class="mb-3 text-list">
            {{ store.pawnsThatMovedAtLeastOnce.join(", ") }}
        </div>
    </template>

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
