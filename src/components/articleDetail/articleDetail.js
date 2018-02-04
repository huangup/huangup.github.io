import * as articles from '../articles/index'

export default {
  data() {
    return {
      articleId: this.$route.params.articleId
    }
  },
  created() {
    this.blogArticle = articles[`t${this.articleId}`];
  },
  mounted() {
  },
  updated() {
    this.blogArticle = articles[`t${this.articleId}`];
  },
  methods: {
    goBack() {
      // this.$router.back(-1)
      this.$router.push({path: '/'})
    }
  }
}
