let FullDate: any = new Date();
const year: number = FullDate.getFullYear();
const month: number = FullDate.getMonth() + 1;
const date: number = FullDate.getDate();
export const Day = `${year}/${month}/${date}`;
