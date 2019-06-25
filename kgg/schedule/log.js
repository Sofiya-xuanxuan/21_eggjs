module.exports={
    interval:'*/3 * * * * *',
    handle(){
        console.log('每隔3s执行定时任务',new Date());
        
    }
}