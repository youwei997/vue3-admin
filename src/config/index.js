//环境变量封装
const env = import.meta.env.MODE || "prod";
//https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api/menu/list
const EnvConfig = {
    dev: {
        baseApi: "/api",
        // mockApi:'http://127.0.0.1:4523/mock/526154'+ '/api',
        mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
    },
    test: {
        baseApi: "/api",
        // mockApi: 'http://127.0.0.1:4523/mock/526154'+ '/api',
        mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
    },
    prod: {
        baseApi: "/api",
        mockApi: "",
    },
};
export default {
    env: env,
    mock: false, //全局mock
    ...EnvConfig[env],
    namespace: "namespace",
};