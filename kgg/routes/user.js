// module.exports={
//     'get /':async ctx=>{
//         ctx.body='用户首页'
//     },
//     'get /info':async ctx=>{
//         ctx.body='用户详情页面'
//     }
// }

// module.exports=app=>({
//     'get /':app.$ctrl.user.index,
//     'get /info':app.$ctrl.user.info
// })

module.exports = app => ({
    'get /': async (app) => {
        const name = await app.$service.user.getName();
        app.ctx.body = '用户：' + name
    },
    'get /info': async (app) => {
        app.ctx.body = '用户年龄：' + app.$service.user.getAge();
    }
})