// 封装本地存储
class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    // 如果说value本身是个字符串的话 那么就不需要JSON.parse 比如：JSON.parse("12323ad") 这个时候就会报错
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    //字符串不走这里，所以localStorage里面可以存字符串
    if (typeof value === 'object' && value != null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
