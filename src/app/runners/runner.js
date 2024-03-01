const { resolve } = require("@angular/compiler-cli");
const { Capacitor } = require("@capacitor/core");

addEventListener('testSave',(resolve,reject,args) =>{
    try{
        CapacitorKV.set('foo', 'my test bar');
        resolve();
    } catch (err){
        reject(err)
    }
    
});

addEventListener('testLoad', (resolve, reject, args) => {
    try{
        const value = CapacitorKV.get('foo');
        resolve(value);
    } catch(err) {
        reject(err);
    }
});