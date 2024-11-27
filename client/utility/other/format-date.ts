export function formatDateUtil(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};