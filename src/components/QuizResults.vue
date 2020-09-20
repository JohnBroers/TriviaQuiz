<template>
    <div class="text-center">
        <p>Your score is</p>
        <p><span class="text-6xl font-bold">{{ score }}</span>/{{ maxScore }}</p>
        <button class="flex items-center justify-center w-full px-6 py-4 rounded-lg cursor-pointer bg-gradient-to-r from-teal-400 to-blue-500 mt-4" @click.prevent="playAgain">Play again!</button>
    </div>
</template>

<script>
export default {
    props: {
        score: {
            type: Number,
            default: 0
        },
        maxScore: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }) {
        const playAgain = () => {
            emit('play-again');
        }
        return {
            playAgain
        }
    }
}
</script>