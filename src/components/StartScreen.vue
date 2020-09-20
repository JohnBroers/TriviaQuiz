<template>
    <div>

        <div class="text-center mb-4">
            <p class="font-bold uppercase text-sm">Start new game</p>
        </div>

        <div class="flex flex-col">
            <button class="flex items-center justify-center w-full px-6 py-4 rounded-lg cursor-pointer bg-gradient-to-r from-teal-400 focus:from-teal-500 to-blue-500 uppercase font-bold text-smuppercase font-bold text-sm mb-2 focus:outline-none" @click="setDifficulty('easy')">Easy</button>
            <button class="flex items-center justify-center w-full px-6 py-4 rounded-lg cursor-pointer bg-gradient-to-r from-teal-400 focus:from-teal-500 to-blue-500 uppercase font-bold text-smuppercase font-bold text-sm mb-2 focus:outline-none" @click="setDifficulty('medium')">Medium</button>
            <button class="flex items-center justify-center w-full px-6 py-4 rounded-lg cursor-pointer bg-gradient-to-r from-teal-400 focus:from-teal-500 to-blue-500 uppercase font-bold text-smuppercase font-bold text-sm focus:outline-none" @click="setDifficulty('hard')">Hard</button>
        </div>

        <div class="flex flex-row mt-4 pt-4 border-t border-gray-600">
            <div class="w-1/2 text-center">
                <p class="font-bold uppercase text-sm">Personal best</p>
                <p class="text-sm">{{ highscore }}</p>
            </div>
            <div class="w-1/2 text-center">
                <p class="font-bold uppercase text-sm">Games played</p>
                <p class="text-sm">{{ games }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        highscore: {
            type: Number,
            default: 0
        },
        games: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }) {
        function setDifficulty(diff) {
            emit('difficulty-set', diff);
        }

        return {
            setDifficulty
        }
    }
}
</script>