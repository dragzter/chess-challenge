<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-lg-9 py-2">
                <div class="title-row">
                    <h3 class="mb-3">Welcome, Rookie!</h3>
                </div>
                <div class="board-wrapper">
                    <ChessBoard/>
                </div>
            </div>
            <div class="col-12 col-lg-3 bg-light p-2 border-start" style="min-height: 100vh;">
                <SideBar/>
            </div>
        </div>
    </div>
    <audio ref="moveSound" src="/sound/move.wav" preload="auto"></audio>

</template>

<script setup lang="ts">
import ChessBoard from "./components/ChessBoard.vue";
import SideBar from "./components/SideBar.vue";
</script>
