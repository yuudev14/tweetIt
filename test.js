let i =[1,2,3,4,5];

function shuffle(array){
    const length = array.length;
    let newArray = [];
    array.forEach(e => {
        const random = Math.floor(Math.random() * 2);
        if (random === 1){
            newArray.push(e);

        }else{
            newArray.unshift(e);
        }

        
    });
    return newArray;
}

console.log(shuffle(i));

