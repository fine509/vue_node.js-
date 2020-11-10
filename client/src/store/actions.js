export default {
    setAu(context, isAu) {
        context.commit('set_Au', isAu)
    },
    setUser(context, user) {
        context.commit('set_User', user)
    },
    //退出清空数据
    clearuser(context) {
        context.commit('set_Au', false)
        context.commit('set_User', null)
    }
}