//环境变量封装
const env = import.meta.env.MODE || "prod";
//https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api/menu/list //视频项目mock地址
const EnvConfig = {
    dev: {
        baseApi: "/api",
        // mockApi:'http://127.0.0.1:4523/mock/526154'+ '/api',
        mockApi:'https://www.fastmock.site/mock/61617b8af5c6888d381c41eff0f95c4e/api',
    },
    test: {
        baseApi: "/api",
        // mockApi: 'http://127.0.0.1:4523/mock/526154'+ '/api',
        mockApi:'https://www.fastmock.site/mock/61617b8af5c6888d381c41eff0f95c4e/api',
    },
    prod: {
        baseApi: "/api",
        mockApi: "",
    },
};
export default {
    env: env,
    mock: true, //全局mock
    ...EnvConfig[env],
    namespace: "namespace",
};