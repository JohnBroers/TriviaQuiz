import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion'
import { faAward } from '@fortawesome/free-solid-svg-icons/faAward'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes, faCheck, faQuestion, faAward);

import './assets/style.css';

createApp(App)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
