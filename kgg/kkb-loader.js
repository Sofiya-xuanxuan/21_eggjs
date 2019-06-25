const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const sequelize = require('sequelize');
const schedule = require('node-schedule');

//读取指定目录下文件
function load(dir, cb) {
    //获取绝对路径
    const url = path.resolve(__dirname, dir);

    //读取路径下文件
    const files = fs.readdirSync(url);

    //遍历路由文件，将路由配置解析到路由器中
    files.forEach(filename => {

        //去掉后缀名
        filename = filename.replace('.js', '');

        //导入文件
        const file = require(url + '/' + filename);
        //回调处理逻辑
        cb(filename, file);
    })
}

//初始化路由
function initRouter(app) {

    const router = new Router();
    load('routes', (filename, routes) => {
        //若是index，则无前缀，别的文件前缀就是文件家名
        const prefix = filename === 'index' ? '' : `/${filename}`;
        routes = typeof routes === 'function' ? routes(app) : routes;

        //遍历路由并添加到路由器
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ');
            //执行router
            router[method](prefix + path, async ctx => {
                app.ctx = ctx;//将上下文挂载至app
                console.log(key, routes[key] + 'qiaoxu');

                await routes[key](app)//路由处理器现在接收的是app
            })
        })
    });
    return router
}

//初始化controller
function initController(app) {
    const controllers = {};
    //读取控制器目录
    load('controller', (filename, controller) => {
        //添加路由
        controllers[filename] = controller;
    })
    return controllers;
}

//加载service
function initService(app) {
    const services = {};
    //读取控制器目录
    load('service', (filename, service) => {
        services[filename] = service(app);
    });
    return services;
}
//加载config配置项
function loadConfig(app) {
    load('config', (filename, config) => {
        if (config.db) {
            app.$db = new sequelize(config.db);
            //加载模型
            app.$model = {};
            load('model', (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync();
        }
        if (config.middleware) {
            load('middleware', (filename) => {
                config.middleware.forEach(mid => {
                    const midPath = path.resolve(__dirname, 'middleware', mid);
                    app.$app.use(require(midPath));
                })
            })
        }
    })
}

//加载定时任务
function initSchedule() {
    load('schedule', (filename, { interval, handle }) => {
        schedule.scheduleJob(interval, handle);
    })
}
module.exports = { initRouter, initController, initService, loadConfig, initSchedule };