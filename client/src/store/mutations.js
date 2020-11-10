export default {
    //判断有没有Authenticated,判断是否将用户存入vuex
    set_Au(state, isAu) {
        if (isAu) state.isAuthenticated = isAu;
        else state.isAuthenticated = false;
    },
    set_User(state, user) {
        if (user) state.user = user;
        else state.user = {}
    }
}