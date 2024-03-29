import SkPlayer from 'skplayer';

//--------解决element-ui dialog组件第一次挂载时因visible=false导致el-dialog__body节点没有append进来引发的问题-------
// 音乐播放器的容器DIV节点，初始挂在dialog组件的el-dialog节点中，最终要挂在el-dialog__body节点中
const playerWrapper = document.createElement('div');
playerWrapper.id = 'skPlayer';
playerWrapper.style.height = '277px';

let player = null; // 插件配置实例化出来的音乐播放器对象

let dialogWrapper = null; // 对话框外部容器
let dialog = null; // 对话框
let dialogBody = null; // 对话框内容
//--------end--------

export default {
  data() {
    return {
      dialogVisible: false,
      playing: true,
      noSound: false,
      listShow: true,
    };
  },
  mounted() {
    dialogWrapper = document.getElementById('playerBoxDialog');
    dialog = dialogWrapper.childNodes[0];
    this.playerConfig();
  },
  updated() {
    this.playerConfig();
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    beforeCloseDialog(done) {
      // 关闭音乐盒子前的处理
      done();
    },
    playerConfig() {
      // 音乐播放器插件配置
      dialogBody = dialog.childNodes[1];
      if (dialogBody && dialogBody.className === 'el-dialog__body') {
        if (!dialogBody.childNodes.length) {
          dialogBody.appendChild(playerWrapper);
          if (player && this.playing) {
            player.play(); // 防止dom节点移动时会暂停播放
          }
        }
      } else {
        dialog.appendChild(playerWrapper);
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
          music: {
            // 网易云歌单,登录网易云网页版,在网页地址中拿到 ... playlist?id=317921676
            //必需项,网易云方式指定填'cloud'
            type: 'cloud',
            //必需项,网易云音乐歌单id
            source: 993495939,
          },
        });
        // skPlayer插件未提供'操作'的回调，so重写插件的api
        player.play = () => {
          if (player.audio && player.dom) {
            player.audio.paused &&
              (player.audio.play(),
              player.dom.playbutton.classList.add('skPlayer-pause'),
              player.dom.cover.classList.add('skPlayer-pause'));
            this.playing = true;
          }
        };
        player.pause = () => {
          player.audio.paused ||
            (player.audio.pause(),
            player.dom.playbutton.classList.remove('skPlayer-pause'),
            player.dom.cover.classList.remove('skPlayer-pause'));
          this.playing = false;
        };
        player.toggle = () => {
          !this.playing ? player.play() : player.pause();
        };
        player.toggleMute = () => {
          this.noSound = !this.noSound;
          player.audio.muted
            ? ((player.audio.muted = !1),
              player.dom.volumebutton.classList.remove('skPlayer-quiet'),
              (player.dom.volumeline_value.style.width = s.percentFormat(player.audio.volume)))
            : ((player.audio.muted = !0),
              player.dom.volumebutton.classList.add('skPlayer-quiet'),
              (player.dom.volumeline_value.style.width = this.noSound ? '0%' : '100%'));
        };
        player.toggleList = () => {
          this.listShow = !this.listShow;
          player.root.classList.contains('skPlayer-list-on')
            ? player.root.classList.remove('skPlayer-list-on')
            : player.root.classList.add('skPlayer-list-on');
          playerWrapper.style.height = this.listShow ? '277px' : '100px';
        };
      }
    },
    toggleSound() {
      player.toggleMute();
    },
    prePlay() {
      player.prev();
    },
    togglePlay() {
      player.toggle();
    },
    nextPlay() {
      player.next();
    },
  },
};
