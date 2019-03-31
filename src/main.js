import Vue from 'vue'
import app from './app.vue'
import '../statics/styles/global.less'

new Vue({
    el: '#root', render: (h) => h(app)
})

