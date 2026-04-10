export const formatDateToIndonesian = (
 inputDate: string | undefined
): string => {
 if (!inputDate) return "-";

 const parsedDate = new Date(inputDate);
 const isValidDate = !isNaN(parsedDate.getTime());
 return isValidDate ? parsedDate.toLocaleString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }) : "-";
};
