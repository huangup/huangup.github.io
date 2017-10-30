import SideBar from '../components/sideBar/sideBar.vue'

export default {
    data: function () {
        return {
            name: 'app'
        }
    },
    watch: {
        currentQuestion: {
            handler: function (question, oldQuestion) {
            },
            deep: true
        }
    },
    created() {
    },
    mounted: function () {
        this.resizeContent();
    },
    beforeDestroy: function () {
    },
    destoryed() {
    },
    components: {
        SideBar
    },
    methods: {
        resizeContent: function() { // 侧边栏和主体部分高度适应屏幕
            // 网页主体宽度和高度
            const totalHeight = window.innerHeight

            const contentDOM = document.getElementById('app-content')
            contentDOM.style.height = totalHeight + 'px'
        }
    },
    computed: {
        isEngStandardHomework: function () {
            return this.$route.query.homework_type == 9
        },
        isMathStandardHomework: function () {
            return this.$route.query.homework_type == 3
        }
    },
    filters: {
        countTimeFormat: function (time) {
            if (time) {
                var hours = Math.floor(time / 3600);
                var minutes = Math.floor(((time % 3600) / 60));
                var seconds = (time % 60).toFixed(0);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                if (hours > 0) {
                    hours = hours < 10 ? "0" + hours : hours;
                    return hours + ":" + minutes + ":" + seconds;
                } else {
                    return minutes + ":" + seconds;
                }
            }
        }
    }
};
