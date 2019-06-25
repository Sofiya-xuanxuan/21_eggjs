module.exports={
    interval:'30 * * * * *',
    handle(){
        console.log('每隔30s执行定时任务',new Date());
        
    }
}