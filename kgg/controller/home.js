module.exports = {
    index: async app => {
        //ctx.body = '首页 ctrl'
        //const name = await app.$service.user.getName();
        const name = await app.$model.user.findAll();
        
        app.ctx.body = '用户：' +JSON.stringify(name)
    },
    detail: async app => {
        app.ctx.body = '详情页 ctrl'
    }
}