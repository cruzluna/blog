import { getCollection } from "astro:content";

export async function getAllMeetings() {
	const meetings = await getCollection("meeting");
	return meetings;
}

export function sortMeetingsByDate(meetings: any[]) {
	return meetings.sort((a, b) => b.data.meetingDate.getTime() - a.data.meetingDate.getTime());
}

export function getUpcomingMeetings(meetings: any[]) {
	const now = new Date();
	return meetings.filter(meeting => meeting.data.meetingDate > now);
}

export function getPastMeetings(meetings: any[]) {
	const now = new Date();
	return meetings.filter(meeting => meeting.data.meetingDate <= now);
}