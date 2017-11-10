import SideBar from '../components/sideBar/sideBar.vue'
import AudioPlayer from '../components/audioPlayer/player.vue'

export default {
    data: function () {
        return {
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
        this.resizeContent()
    },
    beforeDestroy: function () {
    },
    destoryed() {
    },
    components: {
        SideBar,
        AudioPlayer
    },
    methods: {
        resizeContent: function () { // 侧边栏和主体部分高度适应屏幕
            // 网页主体宽度和高度
            const totalHeight = window.innerHeight

            const contentDOM = document.getElementById('app-content')
            contentDOM.style.height = totalHeight + 'px'
        }
    }
};
