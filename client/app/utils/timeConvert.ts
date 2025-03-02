function convertUtcToLocal(utcTime: string) {
    const localDate = new Date(utcTime);


    const formattedDate = localDate.toLocaleString('en-US', {
        month: 'short',      // Short month (e.g., "Mar")
        day: '2-digit',     // Day of the month (e.g., "05")
        year: 'numeric',    // Full year (e.g., "2025")
        hour: '2-digit',    // Hour in 2 digits (e.g., "11")
        minute: '2-digit',  // Minute in 2 digits (e.g., "51")
        hour12: true        // 12-hour clock format with AM/PM
    });

    return formattedDate;
};


export {convertUtcToLocal}
