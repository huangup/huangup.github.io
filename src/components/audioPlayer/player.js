import SkPlayer from 'skplayer'

//--------解决element-ui dialog组件第一次挂载时因visible=false导致el-dialog__body节点没有append进来引发的问题-------
// 音乐播放器的容器DIV节点，初始挂在dialog组件的el-dialog节点中，最终要挂在el-dialog__body节点中
const playerWrapper = document.createElement('div')
playerWrapper.id = 'skPlayer'
playerWrapper.style.height = '277px'

let player = null // 插件配置实例化出来的音乐播放器对象

let dialogWrapper = null // 对话框外部容器
let dialog = null // 对话框
let dialogBody = null // 对话框内容
//--------end--------

export default {
  data() {
    return {
      dialogVisible: false,
      playing: true,
      noSound: false,
      listShow: true
    }
  },
  mounted() {
    dialogWrapper = document.getElementById('playerBoxDialog')
    dialog = dialogWrapper.childNodes[0]
    this.playerConfig()
  },
  updated() {
    this.playerConfig()
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    beforeCloseDialog(done) { // 关闭音乐盒子前的处理
      done()
    },
    playerConfig() { // 音乐播放器插件配置
      dialogBody = dialog.childNodes[1]
      if (dialogBody && dialogBody.className === 'el-dialog__body') {
        if (!dialogBody.childNodes.length) {
          dialogBody.appendChild(playerWrapper)
          this.playing && player && player.play() // 防止dom节点移动时会暂停播放
        }
      } else {
        dialog.appendChild(playerWrapper)
        this.playing && player && player.play()
      }
      if (player === null) {
        player = new SkPlayer({
          //可选项,自动播放,默认为false,true/false
          autoplay: true,
          //可选项,列表显示,默认为true,true/false
          listshow: true,
          //可选项,循环模式,默认为'listloop','listloop',列表循环,'singleloop',单曲循环
          mode: 'listloop',
          //必需项,音乐配置
          music: { // 网易云歌单,登录网易云网页版,在网页地址中拿到 ... playlist?id=317921676
            //必需项,网易云方式指定填'cloud'
            type: 'cloud',
            //必需项,网易云音乐歌单id
            source: 993495939
          }
        })

        // console.log('------->', player)
        // console.log('------->', player.play)
        // console.log('------->', player.pause)
        // console.log('------->', player.toggle)
        // console.log('------->', player.toggleMute) // 静音/取消
        // console.log('------->', player.toggleList) // 隐藏/显示列表

        // skPlayer插件未提供'操作'的回调，so重写插件的api
        const _this = this
        player.play = function () {
          player.audio.paused && (player.audio.play(), player.dom.playbutton.classList.add("skPlayer-pause"), player.dom.cover.classList.add("skPlayer-pause"))
          _this.playing = true
        }
        player.pause = function () {
          player.audio.paused || (player.audio.pause(), player.dom.playbutton.classList.remove("skPlayer-pause"), player.dom.cover.classList.remove("skPlayer-pause"))
          _this.playing = false
        }
        player.toggle = function () {
          !_this.playing ? player.play() : player.pause()
        }
        player.toggleMute = function () {
          _this.noSound = !_this.noSound
          player.audio.muted ? (player.audio.muted = !1, player.dom.volumebutton.classList.remove("skPlayer-quiet"), player.dom.volumeline_value.style.width = s.percentFormat(player.audio.volume)) : (player.audio.muted = !0, player.dom.volumebutton.classList.add("skPlayer-quiet"), player.dom.volumeline_value.style.width = "0%")
        }
        player.toggleList = function () {
          _this.listShow = !_this.listShow
          player.root.classList.contains("skPlayer-list-on") ? player.root.classList.remove("skPlayer-list-on") : player.root.classList.add("skPlayer-list-on")
          playerWrapper.style.height = _this.listShow ? '277px' : '100px'
        }

        player.play()
      }
    },
    toggleSound() {
      player.toggleMute()
    },
    prePlay() {
      player.prev()
    },
    togglePlay() {
      player.toggle()
    },
    nextPlay() {
      player.next()
    }
  }
}
