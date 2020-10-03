export const  isInViewport = (el)=> {
    try{
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight) - 200 &&
            rect.left >= 0 &&
            rect.bottom >= 0 &&
            rect.right <= (window.innerWidth)
        )

    }catch{
        return false
    }
    
}