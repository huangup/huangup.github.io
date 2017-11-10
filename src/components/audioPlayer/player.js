import SkPlayer from 'skplayer'

import song_maps from '../../assets/audio/maroon5-maps.mp3'
import song_thislove from '../../assets/audio/maroon5-thislove.mp3'
import song_suoposhijie from '../../assets/audio/zhangjie-suoposhijie.mp3'
import song_yinianzhijian from '../../assets/audio/zhangjie-yinianzhijian.mp3'

import cover_maps from '../../assets/audioCover/maroon5-maps.png'
import cover_thislove from '../../assets/audioCover/maroon5-thislove.png'
import cover_suoposhijie from '../../assets/audioCover/zhangjie-suoposhijie.png'
import cover_yinianzhijian from '../../assets/audioCover/zhangjie-yinianzhijian.png'

//--------解决element-ui dialog组件第一次挂载时因visible=false导致el-dialog__body节点没有append进来引发的问题-------
// 音乐播放器的容器DIV节点，初始挂在dialog组件的el-dialog节点中，最终要挂在el-dialog__body节点中
const playerWrapper = document.createElement('div')
playerWrapper.id = 'skPlayer'
playerWrapper.style.width = '380px'
playerWrapper.style.height = '238px'

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
      playbutton: null,// 播放按钮（暂未用）
      volumebutton: null,// 声音按钮（暂未用）
      noSound: false
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
      this.playing = player.dom.playbutton.className === 'skPlayer-play-btn skPlayer-pause'
      this.noSound = player.dom.volumebutton.className === 'skPlayer-icon skPlayer-quiet'
      done()
    },
    playerConfig() { // 音乐播放器插件配置
      dialogBody = dialog.childNodes[1]
      if (dialogBody && dialogBody.className === 'el-dialog__body') {
        if (!dialogBody.childNodes.length) {
          dialogBody.appendChild(playerWrapper)
        }
      } else {
        dialog.appendChild(playerWrapper)
      }
      if (player === null) {
        player = new SkPlayer({
          //可选项,自动播放,默认为false,true/false
          autoplay: false,
          //可选项,列表显示,默认为true,true/false
          listshow: true,
          //可选项,循环模式,默认为'listloop','listloop',列表循环,'singleloop',单曲循环
          mode: 'listloop',
          //必需项,音乐配置
          music: {
            //必需项,自配置文件方式指定填'file'
            type: 'file',
            //必需项,音乐文件数组
            source: [
              {
                name: '娑婆世界',
                author: '张杰',
                src: song_suoposhijie,
                cover: cover_suoposhijie
              },
              {
                name: '一念之间',
                author: '张杰/莫文蔚',
                src: song_yinianzhijian,
                cover: cover_yinianzhijian
              },
              {
                name: 'Maps',
                author: 'Maroon 5',
                src: song_maps,
                cover: cover_maps
              },
              {
                name: 'This Love',
                author: 'Maroon 5',
                src: song_thislove,
                cover: cover_thislove
              }
            ]
          }
        })
        this.playbutton = player.dom.playbutton
        this.volumebutton = player.dom.volumebutton
      }
      this.playing && player !== null ? player.play() : ''
    },
    toggleSound() {
      this.noSound = !this.noSound
      player.toggleMute()
    },
    prePlay() {
      player.prev()
    },
    togglePlay() {
      this.playing = !this.playing
      player.toggle()
    },
    nextPlay() {
      player.next()
    }
  }
}
