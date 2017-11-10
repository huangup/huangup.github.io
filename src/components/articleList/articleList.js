import articles from '../../../articles/articleList.json'
import Pagination from '../pagination/pagination.vue'

export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: articles.length
    }
  },
  created() {
    this.tableData = this.getCurrentData(this.pageIndex);
  },
  mounted() {
  },
  components: {
    Pagination
  },
  methods: {
    getCurrentData(pageIndex, pageSize = this.pageSize, total = this.total) {
      pageIndex--
      const result = []
      const start = pageIndex * pageSize
      const end = start + 10 < total ? start + 10 : total
      const list = articles.slice(start, end)
      list.forEach(item => {
        result.push({
          articleTitle: item.title,
          articleId: item.id
        })
      })
      return result
    },
    tableCellClick(row, column, cell, event) {
      this.$router.push({path: `/articleDetail/${row.articleId}`});
    },
    // 给每行的每个单元格的row和column对象添加index属性(暂无用)并设置样式属性
    cellStyleCallback({row, rowIndex, column, columnIndex}) {
      row.rowIndex = rowIndex
      column.columnIndex = columnIndex
      return {cursor: 'pointer', paddingLeft: '20px'}
    },
    // 给行首的每个单元格设置样式属性
    headerCellStyleCallback({row, rowIndex, column, columnIndex}) {
      return {backgroundColor: '#D3DCE6', textAlign: 'center'}
    },
    onPageChange(pageIndex) {
      this.pageIndex = pageIndex
      this.tableData = this.getCurrentData(pageIndex)
    }
  }
}
