import type { PageServerLoad } from './$types';
import type { BoulderBar } from './types';

export const load: PageServerLoad = async ({ params }) => {
	const bars: BoulderBar[] = [
		{
			name: 'Wiener Berg',
			tag: 'wb',
			occupancy: 0
		},
		{
			name: 'Hauptbahnhof',
			tag: 'hbf',
			occupancy: 7
		},
		{
			name: 'Hannovermarkt',
			tag: 'han',
			occupancy: 99
		},
		{
			name: 'Seestadt',
			tag: 'see',
			occupancy: 100
		},
		{
			name: 'Linz',
			tag: 'LNZ',
			occupancy: 60
		},
		{
			name: 'Salzburg',
			tag: 'SBG',
			occupancy: 80
		}
	];

	return {
		bars: bars
	};
};
