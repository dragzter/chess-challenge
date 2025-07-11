<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Main content: chessboard -->
            <div class="col-9 py-5">
                <ChessBoard/>
            </div>

            <!-- Sidebar -->
            <div class="col-3 bg-light p-3 border-start" style="min-height: 100vh;">
                <h5>Game Log</h5>
                <p>Text here</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ChessBoard from "./components/ChessBoard.vue";
</script>
