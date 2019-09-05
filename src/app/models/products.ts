export interface Product{
    productId:string;
    productName:string;
    imgSrc:string;
    totalLikes:number;
    isLiked:boolean;
    price:number;
    category:string;
    createdDate:Date;

    // constructor(productId?:string,
    //     productName?:string,
    //     imgSrc?:string,
    //     totalLikes?:number,
    //     isLiked?:boolean,
    //     price?:number
    //     ){
    //         this.productId=productId;
    //         this.imgSrc=imgSrc;
    //         this.productName=productName;
    //         this.totalLikes=totalLikes;
    //         this.isLiked=isLiked;
    //         this.price=price;
    // }
}