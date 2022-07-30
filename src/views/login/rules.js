export const mobileRules=[
    { required: true, message: '请填写手机号' },
    {pattern :/^1[0-9]\d{9}$/,message: '输入格式不正确'}
]

export const codeRuels=[
    { required: true, message: '请填写密码' },
    { pattern:/^[0-9]{6}$/, message: '请输入正确的格式' }
]
