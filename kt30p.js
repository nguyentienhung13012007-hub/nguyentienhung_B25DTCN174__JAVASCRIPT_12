let products = [
    { id: "P01", name: "Laptop MacBook Pro M3", price: 2000, category: "Laptop", inStock: true },
    { id: "P02", name: "Chuột không day Logitech", price: 45, category: "Phụ kien", inStock: true },
    { id: "P03", name: "Ban phim Cơ Keychron", price: 95, category: "Phu kien", inStock: false },
    { id: "P04", name: "Man hinh Dell UltraSharp", price: 450, category: "Man hinh", inStock: true },
    { id: "P05", name: "Tai nghe Sony WH-1000XM5", price: 350, category: "Phy kien", inStock: true }
];
// case 1
const filterList=(listProduct)=>{
    let newList=listProduct.filter((element)=>{
return element.inStock===true;
    });
    console.log(newList);
    
//     let max=0;
//     for(let i=0;i<newList.length;i++){
// if(newList.price>max){
//     max=newList.price;

// }
// };
// console.log(List);


    
    
};
filterList(products);

// case 2
const findList=(listProduct)=>{
    let list=listProduct.filter((element)=>{
return element.category==="Phu kien";
    });
    console.log(list);
    

};
findList(products);
// case 3
const total=(newList)=>{
    let sum=newList.reduce((cur,acc)=>{
        cur+acc.price;
    },0);
console.log(`tổng tiền: ${sum}`);

};
total(products);



