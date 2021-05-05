let tony = {
    name : "Tony" ,
    lastname : "Stark" ,
    friends:['Steve' , 'Bruce' , 'Peter'],
    age : 45 , 
    isAvenger: true ,
    abc : undefined ,
    address : {
        state : "New York" ,
        city : 'Long Island' ,
    },
    saysHi : function fun()
    {
        console.log('Iron Man says hello') ;
        return "Part of Journey is the End"
    },
}
// console.log(tony) ;

// 2 ways to access values
//1
// console.log(tony.name) ;
// console.log(tony.lastname) ;
// console.log(tony.friends) ;
// console.log(tony.friends[0]) ;
// console.log(tony.age) ;
// console.log(tony.isAvenger) ;
// console.log(tony.address) ;
// console.log(tony.address.city) ;
// console.log(tony.saysHi) 
// console.log(tony.saysHi()) ;
// console.log(tony.anything) ;
//2
// console.log(tony['name']) ;
// console.log(tony['friends'][0]) ;
// console.log(tony['age']) ;
// console.log(tony['isAvenger']) ;
// console.log(tony['address']) ;
// console.log(tony['address']['city']) ;
// console.log(tony['saysHi']());
// console.log(tony['saysHi']);

let karr = Object.keys(tony) ;
// console.log(karr) ;

for(let i = 0 ; i<karr.length ; i++)
{
    let key = karr[i] ;
    console.log(key) ;
    // console.log(tony[karr[i]]) ;
    // console.log(karr) ;
}

// for(let k in tony)
// {
//     // console.log(tony.k) ; //<- this gives undefined because tony does not have any key named (k)
//     // console.log(tony[k]) ;
// }