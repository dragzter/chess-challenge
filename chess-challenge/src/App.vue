<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-9 py-5">
                <div class="board-wrapper">
                    <h3 class="mb-3">Welcome, Rookie!</h3>
                    <ChessBoard/>
                </div>
            </div>
            <div class="col-3 bg-light p-3 border-start" style="min-height: 100vh;">
                <SideBar/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ChessBoard from "./components/ChessBoard.vue";
import SideBar from "./components/SideBar.vue";
</script>
