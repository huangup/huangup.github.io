export default {
    data() {
        return {
            id: this.$route.params.id,
            arr: []
        }
    },
    mounted() {
        for (let i = 0; i < 1000; i++) {
            this.arr.push({
                id: this.id,
                text: '文章详情' + i
            })
        }
    }
}