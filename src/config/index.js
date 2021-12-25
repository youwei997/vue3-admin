//环境变量封装
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    dev:{
        baseApi:'/',
        mockApi:'http://127.0.0.1:4523/mock/513888',
    },
    test: {
        baseApi: '/',
        mockApi: 'http://127.0.0.1:4523/mock/513888',
    },
    prod: {
        baseApi: '/',
        mockApi: '',
    },
}
export default{
    env:env,
    mock:true, //全局mock
    ...EnvConfig[env],
    namespace:'namespace'
}