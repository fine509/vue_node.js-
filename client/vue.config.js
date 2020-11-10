module.exports = {
    //解决跨域问题
    devServer: {
        port: '8080',
        host: 'localhost',
        https: false,
        hotOnly: false,
        open: false,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        },
        before: app => {}
    },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',

            }
        }


    },

    lintOnSave: false
}