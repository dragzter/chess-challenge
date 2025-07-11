<script setup lang="ts">
import {onMounted} from "vue";
import {BoardFile, BoardRank, Chessboard} from "../utils/contants.ts";


onMounted(() => {
    console.log("component mounted")
})
</script>

<template>
    <div class="container-fluid">
        <div class="chessboard">
            <div :class="`d-flex rank rank-${rank}`" v-for="rank in [...BoardRank].reverse()" :key="rank">
                <div class="square text-start p-1 " v-for="file in [...BoardFile]" :key="file">
                    <p class="lh-1 position-absolute">{{ file }} {{ rank }}</p>
                    <img v-if="Chessboard[file + rank]" class="img-fluid piece"
                         :src="`img/${Chessboard[file + rank]}`"
                         alt="">
                    <div class="d-none hover-border position-absolute"></div>
                </div>
            </div>
        </div>
    </div>
</template>
