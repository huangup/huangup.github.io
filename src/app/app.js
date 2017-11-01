import SideBar from '../components/sideBar/sideBar.vue'
import skPlayer from 'skplayer'
const suoposhijie = 'https://huangup.github.io/audio/zhangjie-suoposhijie.mp3'
const suoposhijieCover = 'https://huangup.github.io/img/audioCover/zhangjie-suoposhijie.png'

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
        const player = new skPlayer({
            autoplay: true,
            //可选项,自动播放,默认为false,true/false
            listshow: false,
            //可选项,列表显示,默认为true,true/false
            mode: 'singleloop',
            //可选项,循环模式,默认为'listloop'
            //'listloop',列表循环
            //'singleloop',单曲循环
            //可选项配置同上
            music: {
                //必需项,音乐配置
                type: 'file',
                //必需项,自配置文件方式指定填'file'
                source: [
                    //必需项,音乐文件数组
                    {
                        name: '娑婆世界',
                        //必需项,歌名
                        author: '张杰',
                        //必需项,歌手
                        src: suoposhijie,
                        //必需项,音乐文件
                        cover: suoposhijieCover
                        //必需项,封面图片
                    }
                ]
            }
        });
    },
    beforeDestroy: function () {
    },
    destoryed() {
    },
    components: {
        SideBar
    },
    methods: {
        resizeContent: function () { // 侧边栏和主体部分高度适应屏幕
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
