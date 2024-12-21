/**
 * The interface used for the tracking order
 * 
 * @field date - Date of the order
 * @field time - Time of the order
 * @field title - The title of the status
 * @field status - The status denoting the order
 * @field detail - The description of the status
 */
export interface TrackOrderInterface {
    date: string;
    time: string;
    title: string;
    status: number;
    detail: string;
}