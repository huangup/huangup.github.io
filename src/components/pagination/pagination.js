export default {
  data() {
    return {
      currentPage: this.pageIndex || 1,
      size: this.pageSize || 10
    }
  },
  props: ['pageIndex', 'pageSize', 'total', 'onPageChange'],
  watch: {
    pageIndex(newPageIndex, oldPageIndex) {
      if (newPageIndex !== oldPageIndex && newPageIndex !== this.currentPage) {
        this.currentPage = newPageIndex
      }
    },
    pageSize(newPageSize, oldPageSize) {
      if (newPageSize !== oldPageSize && newPageSize !== this.size) {
        this.size = newPageSize
      }
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.onPageChange(currentPage)
    }
  }
}
