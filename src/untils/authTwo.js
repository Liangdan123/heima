import storage from './storageTwo'

const Token = 'HEIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(Token)
export const setToken = (value) => storage.set(Token, value)
export const removeToken = () => storage.remove(Token)
