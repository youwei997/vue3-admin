/*
*  Storage 封装
* */
import config from "../config";

export default {
    //设置缓存
    setItem(key, val) {
        let storage = this.getStorage()
        storage[key] = val
        localStorage.setItem(config.namespace, JSON.stringify(storage))
    },
    //获取缓存
    getItem(key) {
        return this.getStorage()[key]
    },
    //获取命名空间缓存，没有就设置空对象
    getStorage() {
        return JSON.parse(localStorage.getItem(config.namespace) || "{}")
    },
    //删除一个缓存
    clearItem(key) {
        let storage = this.getStorage()
        delete this.getStorage()[key]

        //重新写入，因为是删除缓存中某一个对象里的值，不是直接删除某一个缓存，所以需要重新写入
        localStorage.setItem(config.namespace, JSON.stringify(storage))
        // localStorage.removeItem(this.getStorage()[key])
    },
    //清空所有缓存
    clearAll() {
        localStorage.clear()
    }
}