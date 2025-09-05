import { delay, http, HttpResponse } from 'msw';

const sizes = [
	{ size: '7', stock: 'HIGH' },
	{ size: '7.5', stock: 'MEDIUM' },
	{ size: '8', stock: 'LOW' },
	{ size: '8.5', stock: 'OOS' },
	{ size: '9', stock: 'NA' },
	{ size: '9.5', stock: 'NA' },
	{ size: '10', stock: 'OOS' },
	{ size: '10.5', stock: 'MEDIUM' },
	{ size: '11.5', stock: 'MEDIUM' },
	{ size: '12', stock: 'HIGH' },
	{ size: '12.5', stock: 'MEDIUM' },
	{ size: '13', stock: 'MEDIUM' },
	{ size: '14', stock: 'MEDIUM' },
	{ size: '15', stock: 'MEDIUM' },
	{ size: '16', stock: 'MEDIUM' },
	{ size: '18', stock: 'MEDIUM' }
] satisfies { size: string; stock: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA' }[];

// Sample release data
let releases = [
	{
		productName: 'Glacier Blue and Light Armory Blue',
		models: [
			{
				imageUrl:
					'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/1cd8cb39-da26-4d78-8ac2-5a2a81702275/little-kids-jordan-1-high-og-shattered-backboard-fd1412-008.jpg',
				releaseDate: 'Jul 26, 05:00 PM',
				productCategory: "Big Kids' Air Jordan 1 High OG",
				productName: 'Glacier Blue and Light Armory Blue',
				price: '130 USD',
				method: 'LEO',
				sizes
			}
		]
	},
	{
		productName: 'Triple White Classic',
		models: [
			{
				imageUrl:
					'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/105a18bc-1e1c-4014-8847-fbafad174468/acg-rufus-dark-smoke-grey-and-light-lemon-twist-ib5843-300-release-date.jpg',
				releaseDate: 'Jul 28, 10:00 AM',
				productCategory: "Men's Air Force 1 Low",
				productName: 'Triple White Classic',
				price: '110 USD',
				method: 'FCFS',
				sizes
			},
			{
				imageUrl:
					'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/105a18bc-1e1c-4014-8847-fbafad174468/acg-rufus-dark-smoke-grey-and-light-lemon-twist-ib5843-300-release-date.jpg',
				releaseDate: 'Jul 28, 10:00 AM',
				productCategory: "Men's Air Force 1 Low",
				productName: 'Triple White Classic PD',
				price: '110 USD',
				method: 'FCFS',
				sizes
			},
			{
				imageUrl:
					'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/105a18bc-1e1c-4014-8847-fbafad174468/acg-rufus-dark-smoke-grey-and-light-lemon-twist-ib5843-300-release-date.jpg',
				releaseDate: 'Jul 28, 10:00 AM',
				productCategory: "Men's Air Force 1 Low",
				productName: 'Triple White Classic TD',
				price: '110 USD',
				method: 'FCFS',
				sizes
			}
		]
	},
	{
		productName: 'Panda Black and White',
		models: [
			{
				imageUrl:
					'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/2e04c0f5-5e23-4f07-9ebc-fd44913fec55/big-kids-air-jordan-5-reimagined-hf3976-001.jpg',
				releaseDate: 'Aug 2, 12:00 PM',
				productCategory: "Women's Dunk Low",
				productName: 'Panda Black and White',
				price: '100 USD',
				method: 'LEO',
				sizes
			},
			{
				imageUrl:
					'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/2e04c0f5-5e23-4f07-9ebc-fd44913fec55/big-kids-air-jordan-5-reimagined-hf3976-001.jpg',
				releaseDate: 'Aug 2, 12:00 PM',
				productCategory: "Women's Dunk Low",
				productName: 'Panda Black and White PD',
				price: '100 USD',
				method: 'LEO',
				sizes
			}
		]
	}
];

export const handlers = [
	http.get('/api/releases', async () => {
		await delay(1000);
		const isError = false; // || window.confirm('Show error request?');
		return HttpResponse.json(releases, { status: isError ? 500 : 200 });
	})
];
