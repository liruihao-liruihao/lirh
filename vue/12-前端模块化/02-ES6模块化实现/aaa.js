let name='小明'
let age=18
let flag=true


function sum(sum1,sum2){
    return sum1+sum2;
}
if (flag){
    console.log(sum(20, 30));
}

//导出方式一
export {
    flag,
    sum
}
//导出方式二
export var num1=1000;
export var height=1.88

//3、导出函数/类
export function mul(num1,num2){
    return num1+num2
}

export class person{
    run(){
        console.log('在奔跑');
    }
}

//4、export default
const address='北京市'
// export default address
export default function (arg){
    console.log(arg);
}


