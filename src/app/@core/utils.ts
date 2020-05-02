export class Utils {
  static getDatesBetween(startDate: Date, endDate: Date) {
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = startDate.getTime();
    const end: number = endDate.getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);
    return Array.from(new Array(daysBetweenDates + 1), (v, i) => new Date(start + i * MS_PER_DAY));
  }

  static randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
