//环境变量封装
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    dev:{
        baseApi:'/',
        mockApi:'',
    },
    test: {
        baseApi: '/',
        mockApi: '',
    },
    prod: {
        baseApi: '/',
        mockApi: '',
    },
}
export default{
    env:env,
    mock:true,
    ...EnvConfig[env],
    namespace:'namespace'
}