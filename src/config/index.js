//环境变量封装
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    dev:{
        baseApi:'/api',
        mockApi:'http://127.0.0.1:4523/mock/526154'+ '/api',
    },
    test: {
        baseApi: '/api',
        mockApi: 'http://127.0.0.1:4523/mock/526154'+ '/api',
    },
    prod: {
        baseApi: '/api',
        mockApi: '',
    },
}
export default{
    env:env,
    mock:true, //全局mock
    ...EnvConfig[env],
    namespace:'namespace'
}