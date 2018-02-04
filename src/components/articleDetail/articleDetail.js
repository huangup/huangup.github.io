export default {
  data() {
    return {
      articleId: this.$route.params.articleId,
      iframeHeight: 500
    }
  },
  created() {
    window.addEventListener('message', event => {
      //确保发送消息的域名是已知的域名
      // if(event.origin === "http://localhost:8089"){
      if (event.origin === "https://huangup.github.io" || event.origin === "http://www.huangup.top") {
        this.iframeHeight = event.data.iframeInnerHeight
        //可选：向来源窗口发送回执
        // event.source.postMessage("收到了", "https://huangup.github.io/articles");
      }
    }, false)
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    }
  }
}
