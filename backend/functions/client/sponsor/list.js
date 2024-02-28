import handler from '../../util/handler';
import { dbGetUsers } from '../../libs/queries-lib';

export const logos = handler(async (event) => {
    console.log(event);
    const logoList = [];
    const response = await dbGetUsers('sponsor');
    response.map(item => {
        logoList.push(item.preSignedURL);
    })
    return logoList;
});
