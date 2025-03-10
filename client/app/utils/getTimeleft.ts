function getTimeLeft(startDate: Date, currentDate: Date){
    const timeDiff = startDate.getTime() - currentDate.getTime(); // Convert to number

    if (timeDiff <= 0) return "Auction has started";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, ${minutes} minutes left`;
    
}

export {getTimeLeft}