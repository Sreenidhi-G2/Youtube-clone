export const timeSince=(date)=>{
    
    
    const second=Math.floor((new Date().valueOf()-date.valueOf())/1000);
    let interval=second/31356000;

    if(interval>1)
    {
        return Math.floor(interval)+" years ago"
    }
    interval=second/2592000;
    if(interval>1)
    {
        return Math.floor(interval)+" months ago";
    }
    interval=second/86400;
    if (interval>1)
    {
        return Math.floor(interval)+" days ago";
    }
    interval=second/3600;
    if(interval>1)
    {
         return Math.floor(interval)+" hours ago";
    }
    interval=second/60;
    if(interval>1)
        {
            return Math.floor(interval)+" minutes ago";
        }    

        return Math.floor(second)+" seconds ago";
}

