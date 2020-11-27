//是给推荐歌单recomment.vue的混入js文件
export const pageMixins = {
    data() {
        return {
            music: [],
            allmusic: [],
            pages: {
                currentPage: 1, //当前页
                page_sizes: [12, 24, 36, 48], //可供选择每页显示多少
                pagesize: 12, //每页显示多少条
                total: 48, //总
            }
        }
    },
    methods: {
        //分页
        handlepage() {
            this.pages.total = this.allmusic.length;
            this.pages.currentPage = 1;
            this.pages.pagesize = 12;
            this.music = this.allmusic.filter((item, index) => {
                return index < this.pages.pagesize
            })

        }, //切换页数
        handleSizeChange(newpagesize) {
            this.pages.pagesize = newpagesize;
            this.music = this.allmusic.filter((item, index) => {
                return index < this.pages.pagesize
            })
        },
        handleCurrentChange(newpage) {
            this.pages.currentPage = newpage;
            this.music = this.allmusic.filter((item, index) => {
                return index >= (newpage - 1) * this.pages.pagesize && index < newpage * this.pages.pagesize
            })
        }
    }
}