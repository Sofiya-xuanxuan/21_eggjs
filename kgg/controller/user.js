module.exports = {
    index: async ctx => {
        ctx.body = '用户首页 ctrl'
    },
    info: async ctx => {
        ctx.body = '用户详情页 ctrl'
    }
}