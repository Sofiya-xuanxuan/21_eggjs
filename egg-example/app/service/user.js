'use strict';

const {Service}=require('egg');

class UserService extends Service{
    async getAll(){
        // return [
        //     {name:'tom'},
        //     {age:99}
        // ]
        return await this.ctx.model.User.findAll();
    }
}

module.exports=UserService;