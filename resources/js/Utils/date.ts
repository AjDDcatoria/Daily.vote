export const formatTimeDifference = (expired: string): string => {
    const createdDate = new Date(expired);
    const now = new Date();
    const diffInMilliseconds = createdDate.getTime() - now.getTime();

    if (diffInMilliseconds < 0) {
        return `Expired 🚩`;
    }

    const totalSeconds = Math.floor(diffInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}H ${minutes}M ${seconds}S Left`;
};
