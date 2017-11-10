export default {
  data() {
    return {
      menuIndex: '/'
    }
  },
  mounted() {
    this.changeMenuByRoute()
  },
  watch: {
    $route() {
      this.changeMenuByRoute()
    }
  },
  methods: {
    changeMenuByRoute() { // 解决左边栏选中问题(路由地址对应选中项)
      switch (this.$route.path) {
        case '/':
          this.menuIndex = '/';
          break;
        case '/info':
          this.menuIndex = '/info';
          break;
        default:
          this.menuIndex = '/';
          break;
      }
    }
  }
};
