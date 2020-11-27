//是给page.vue公共组件的混入js文件
export const pagesMixins = {
    props: {
        pages: {
            type: Object,
            default () {
                return {
                    total: 40,
                    page_size: 5,
                    page_sizes: [5, 10, 15, 20],
                    current_page: 1,
                }
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('handleSizeChange', val);
        },
        handleCurrentChange(val) {
            // const pageSize=this.pages.page_size
            // this.$parent.pages.current_page=val;
            // this.$parent.tableData=this.$parent.allTableDate.filter((item,index)=>{
            //     return index >= (val-0-1)*pageSize && index<val*pageSize
            // })
            this.$emit('handleCurrentChange', val)
        }
    }




}