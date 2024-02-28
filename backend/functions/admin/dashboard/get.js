import handler from '../../util/handler';
import { 
    dbGetUsers,
 } from '../../libs/queries-lib';

export const totals = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const totalList = [];
	const sponsors = await dbGetUsers('SPONSOR');
	const veterans = await dbGetUsers('VETERAN');
	const community = await dbGetUsers('COMMUNITY');
	const signs = await dbGetUsers('SIGN');
	const shirts = await dbGetUsers('SHIRT');
    sponsors && totalList.push({name: "sponsors", value: sponsors.length});
    veterans && totalList.push({name: "veterans",  value: veterans.length});
    community && totalList.push({name: "community", value: community.length});
    signs && totalList.push({name: "signs", value: signs.length});
    shirts && totalList.push({name: "shirts", value: shirts.length});
	return totalList;
})


