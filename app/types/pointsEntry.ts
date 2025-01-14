export default interface PointsEntry {
    userId: string | undefined;
    sleepEntryId: string;
    points: number;
    min8Hours: boolean;
    before10AM: boolean;
    before11PM: boolean;
}