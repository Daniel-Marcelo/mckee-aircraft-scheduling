import { twentyFourHoursSeconds } from '../constants/time.constants'

export interface TimelineSlot {
    percentOf24Hours: string;
    action: TimelineAction

}

export enum TimelineAction {
    active = 'active',
    turnaroundTime = 'turnaroundTime',
    idle = 'idle'
}

export const generateTimelineSlot = (start: number, end: number, action: TimelineAction): TimelineSlot => {
    const percentUse = Math.round((end - start)/twentyFourHoursSeconds*100);
    return {
        percentOf24Hours: `${percentUse}%`,
        action
    }
}