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
module.exports = shuffle