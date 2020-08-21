const app=new Vue({
    el:"#app",
    data:{
        message:'abc',
        books:[
            {
                id:1,
                name:'《1算法导论》',
                date:'2006-9',
                price:85.00,
                count:1
            },
            {
                id:2,
                name:'《2算法导论》',
                date:'2006-9',
                price:85.00,
                count:1
            },
            {
                id:3,
                name:'《3算法导论》',
                date:'2006-9',
                price:85.00,
                count:1
            },
            {
                id:4,
                name:'《4算法导论》',
                date:'2006-9',
                price:85.09,
                count:1
            }
        ]
    },
    filters:{
        showPrice(price){
            return '￥'+price.toFixed(2);
        }
    },
    methods:{
        increment(index){
            this.books[index].count++;
        },
        decrement(index){
            this.books[index].count--;
        },
        removeHandle(index){
            this.books.splice(index,1);
        }
    },
    computed:{
        totalPrice(){
            let toatlPrice=0;
            //遍历方式一
            for (let i = 0; i <this.books.length ; i++) {
                toatlPrice+=this.books[i].price*this.books[i].count;
            }
            //遍历方式二
            // for (let i in this.books) {
            //     toatlPrice+=this.books[i].price*this.books[i].count;
            // }
            //遍历方式三
            // for(let item of this.books){
            //     toatlPrice+=item.price*item.count;
            // }
            return toatlPrice;
        }
    }
})
// const app=new Vue({
//     el:"#app",
//     data:{
//         message:"你好呀",
//         info:{
//             name:'li',
//             age:18,
//             height:1.88
//         }
//     }
// })