export function formatDate(date: Date): string {
    const now = new Date();
    const dayDifference = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    let dayLabel: string;
    if (dayDifference === 0) {
        dayLabel = 'Today';
    } else if (dayDifference === 1) {
        dayLabel = 'Yesterday';
    } else {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
        dayLabel = `${day}/${month}/${year}`;
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${dayLabel}, ${formattedHours}:${formattedMinutes} ${ampm}`;
}


