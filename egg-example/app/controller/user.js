'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
    async index() {
        // this.ctx.body=[
        //     {name:'sofiya'},
        //     {age:18}
        // ]   
        this.ctx.body = await this.ctx.service.user.getAll();
    }
}

module.exports = UserController;