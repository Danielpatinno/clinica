export function useFormatTime() {
    const formatTime = (time: string): string => {
      if (!time) return "";
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes}`;
    };
  
    return { formatTime };
}
  