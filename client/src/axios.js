import axios from 'axios'

import { Message, Loading } from 'element-ui';
import router from './router/index'
let loading;

function stratLoading() {
    loading = Loading.service({
        lock: true,
        text: '正在全力加速中',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endLoading() {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(
        result => {

            stratLoading();
            //判断是否有token,有则给请求头里面加上token,因为所有的私人的展示都需要token
            if (localStorage.logintoken) {
                result.headers.Authorization = localStorage.logintoken;
            }
            return result;
        },
        error => Promise.reject(error)
    )
    //响应拦截
axios.interceptors.response.use(
    result => {
        endLoading();

        return result
    },
    //错误提醒
    error => {
        endLoading();

        //获取错误码，判断是否token失效
        const { status } = error.response;
        if (status == 401) {

            localStorage.removeItem("logintoken")
            router.push('/login')
            Message.error('token失效，请重新登陆');

            // this.$router.push('/login') 不是vue文件里面，不能用，得引入

            return
        } else {
            Message.error(error.response.data);
            return Promise.reject(error)
        }

    })

export default axios



// export default function request(config) {

//     const axiosA = axios.create({
//         baseURL: 'http://localhost:5000',
//         timeout: 5000
//     })

//     //请求拦截
//     axiosA.interceptors.request.use(
//         result => {
//             stratLoading();
//             return result
//         },
//         err => Promise.reject(error)
//     )

//     //相应拦截
//     axiosA.interceptors.response.use(
//         result => {
//             endLoading();
//             return result
//         },
//         //错误提醒
//         err => {
//             this.$message({
//                 showClose: true,
//                 message: '注册失败',
//                 type: 'error'
//             });
//             return Promise.reject(error)


//         }
//     )

//     //发送真正的网络请求
//     //发送真正的网络请求
//     return axiosA(config)
// }