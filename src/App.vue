<template>
	<div class="bg-gray-800 text-white wrapper h-full">
		<TheHeader />

		<div class="px-4 mt-4">
			<StartScreen v-if="introStage" :highscore="highscore" :games="gamesPlayed" @difficulty-set="startGame"/>
			<LoadingSpinner v-if="loading" />
			<Questions v-if="questionStage" :questions="questions" @end-game="endGame" />
			<QuizResults v-if="finishStage" :score="score" :maxScore="maxScore" @play-again="playAgain"/>
		</div>

	</div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import QuizResults from "./components/QuizResults";
import LoadingSpinner from "./components/LoadingSpinner";

import { computed, onMounted, reactive, toRefs } from 'vue';

export default {
	setup() {
		
		const state = reactive({
			highscore: localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0,
			gamesPlayed: localStorage.getItem('games') ? parseFloat(localStorage.getItem('games')) : 0,
			difficulty: null,
			score: 0,
			questions: [],
		});

		const maxScore = computed(() => {
			return state.questions.length;
		});

		const stages = reactive({
			introStage: true,
			questionStage: false,
			finishStage: false,
			loading: false
		});

		const startGame = async (diff) => {
			state.difficulty = diff;
			stages.introStage = false;
			stages.loading = true;
			await fetchQuestions();
			stages.loading = false;
			stages.questionStage = true;
		}

		const fetchQuestions = async () => {
			try {
				const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${state.difficulty}&category=12`);
				const data = await response.json();
				const questionObj = data.results.map(q => {
					return {
						category: q.category,
						question: q.question,
						answer: q.correct_answer,
						choices: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
					}
				});
				state.questions = questionObj;
			} catch(err) {
				console.log(err);
			}
		}

		const endGame = score => {
			if(score > state.highscore) {
				state.highscore = score;
				localStorage.setItem('score', score);
			}
			state.gamesPlayed++;
			localStorage.setItem('games', state.gamesPlayed);
			stages.questionStage = false;
			stages.finishStage = true;
			state.score = score;
		}

		const playAgain = async () => {
			stages.introStage = true;
			stages.questionStage = false;
			stages.finishStage = false;
			state.difficulty = null;
			state.score = 0;
			state.questions = [];
		}

		onMounted(() => {
			// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
			let vh = window.innerHeight * 0.01;
			// Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		})

		return {
			...toRefs(state),
			...toRefs(stages),
			maxScore,
			startGame,
			endGame,
			playAgain
		}
	},
	components: {
		TheHeader,
		StartScreen,
		Questions,
		QuizResults,
		LoadingSpinner
	}
};
</script>

<style scoped>
.wrapper {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
</style>