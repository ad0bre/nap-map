export default interface SleepEntry{
    id: string,
    dateStart: Date,
    dateEnd: Date,
    status: string,
    dreamSummary: string,
    userId: string,
    min8Hours: boolean,
    before10AM: boolean,
    before11PM: boolean,
}