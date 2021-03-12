//是给正常引入page.vue的组件的混入js文件
export const HandlePage = {
    data() {
        return {
            filters: [],
            alls: [],
            pages: {
                total: 40,
                page_size: 5,
                page_sizes: [5, 10, 15, 20],
                current_page: 1,
            },
        }
    },
    methods: {
        //设置分页数据
        handlePage() {
            this.filters = this.alls.filter((item, index) => {
                return index < this.pages.page_size;
            })
        },
        //设置每页显示多少条
        handleSizeChange(val) {
            this.pages.page_size = val;
            this.filters = this.alls.filter((item, index) => {
                return index < this.pages.page_size
            })
        },
        //页面跳转
        handleCurrentChange(val) {
            const pageSize = this.pages.page_size
            this.pages.current_page = val;
            this.filters = this.alls.filter((item, index) => {
                return index >= (val - 0 - 1) * pageSize && index < val * pageSize
            })
        },
    }
}