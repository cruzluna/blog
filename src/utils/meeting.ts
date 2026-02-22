import { getCollection } from "astro:content";

export async function getAllMeetings() {
	const meetings = await getCollection("meeting");
	return meetings;
}

export function sortMeetingsByDate(meetings: any[]) {
	return meetings.sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
}

export function getUpcomingMeetings(meetings: any[]) {
	const now = new Date();
	return meetings.filter((meeting) => meeting.data.startDate > now);
}

export function getPastMeetings(meetings: any[]) {
	const now = new Date();
	return meetings.filter((meeting) => meeting.data.startDate <= now);
}
