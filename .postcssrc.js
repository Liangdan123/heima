module.exports = {
    plugins: {
      'postcss-pxtorem': {
        // rootValue: 37.5,
        //如果是vant文件37.5转
        //如果不是75
        rootValue:(module)=>{
            if(/vant/i.test(module.file)){
                return 37.5
            }else{
                return 75
            }
        },
        //哪些属性需要转成rem
        propList: ['*']
      }
    }
  }