const delay=(data,tick)=>new Promise(resolve=>{
    setTimeout(()=>{
        resolve(data)
    },tick)
});

module.exports=app=>(
    {
        getName(){
            return delay('sofiya',1000)
        },
        getAge(){
            return 18
        }
    }
)