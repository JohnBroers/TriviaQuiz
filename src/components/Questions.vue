<template>
    <div>
        <div>
            <span>{{ index + 1 }}/{{ questions.length }}</span>
        </div>

        <div class="mb-8 text-center">
            <p class="text-gray-400 text-sm mb-2">{{currentQuestion.category}}</p>
            <h2 class="text-2xl font-bold leading-tight" v-html="currentQuestion.question"></h2>
        </div>
        
        <ul class="flex flex-wrap">
            <li class="flex w-full" v-for="choice in currentQuestion.choices" :key="choice">
                <span 
                    class="flex items-center justify-between w-full my-1 px-6 py-4 rounded-lg items-center border-2 border-gray-500 border-opacity-50 cursor-pointer" 
                    :class="[{
                        'bg-gradient-to-r from-red-400 to-red-500 border-red-500' : choice === chosenAnswer,
                        'bg-gradient-to-r from-green-400 to-green-500 border-green-500' : questionFinished && choice === currentQuestion.answer
                    }]" 
                    @click="handleQuestion(choice)">
                    <span v-html="choice"></span>
                    <fa icon="times" class="text-2xl" v-if="choice === chosenAnswer && questionFinished && choice != currentQuestion.answer" />
                    <fa icon="check" class="text-2xl" v-if="choice === chosenAnswer && questionFinished && choice === currentQuestion.answer" />
                </span>
            </li>
        </ul>

        <button v-if="questionFinished" @click="nextQuestion" class="flex items-center justify-center w-full px-6 py-4 rounded-lg cursor-pointer bg-gradient-to-r from-teal-400 to-blue-500 uppercase font-bold text-smuppercase font-bold text-sm mt-4">Next</button>
    </div>
</template>

<script>
import { reactive, computed, toRefs } from 'vue';

export default {
    props: {
        questions: {
            type: Array,
            required: true
        }
    }, 
    setup(props, { emit }) {
        const state = reactive({
            index: 0,
            totalScore: 0,
            questionFinished: false,
            chosenAnswer: null
        });

        const currentQuestion = computed(() => {
            if(props.questions[state.index]) {
                console.log(props.questions[state.index].answer);
                return props.questions[state.index];
            }
            return {}
        });

        const handleQuestion = function(choice) {
            if(!state.chosenAnswer) {
                state.chosenAnswer = choice;
                const isCorrect = choice === currentQuestion.value.answer;
                if(isCorrect) {
                    state.totalScore++;
                }
                state.questionFinished = true;
            }
        }

        const nextQuestion = function () {
            state.index++;
            state.questionFinished = false;
            state.chosenAnswer = null;
            if(state.index >= props.questions.length) {
                emit('end-game', state.totalScore);
            }
        }

        return {
            ...toRefs(state),
            currentQuestion,
            handleQuestion,
            nextQuestion
        }
    }
}
</script>