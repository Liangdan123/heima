import storage from './storage'

const Token = 'HEIMA_TOUTIAO_TOKEN'

export const setToken = (value) => storage.set(Token, value)

export const getToken = () => storage.get(Token)

export const removeToken = () => storage.remove(Token)
