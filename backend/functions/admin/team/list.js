import handler from '../../util/handler';
import { dbGetTeams, dbGetTeamPlayers, dbGetTeamForType, dbGetUser } from '../../libs/queries-lib';

export const main = handler(async (event) => {
	console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
	const teamList = [];

	const teams = await dbGetTeams();
	console.log("Got teams: ",teams)
	let players;
	for (let team of teams) {
		// get sponsor info for this team
		console.log("Getting sponsor for team: ", team.SK)
		let sponsorInfo = await dbGetTeamForType(team.SK, team.type);
		console.log("Got sponsorInfo: ", sponsorInfo)
		let teamObj = {};
		if (sponsorInfo) {
			let sponsorID = sponsorInfo.PK.split("#")[1];
			let sponsor = await dbGetUser(sponsorInfo.type, sponsorID);
			console.log("sponsor = ", sponsor)
			if (sponsor) {
				Object.assign(teamObj, {
					sponsorID,
					sponsorName: sponsor.fullName,
					sponsorEmail: sponsor.emailAddress,
					sponsorPhone: sponsor.phoneNumber,
					sponsorCompany: sponsor.companyName,
				})
				console.log("added sponsor to teamObj = ", teamObj)
			}

			console.log("Processing team: ", team)
			Object.assign(teamObj,  {
				id: team.SK,
				teamName: team.teamName,
				package: team.package,
				golfCart: team.golfCart,
				// additionalMeals: team.additionalMeals ? team.additionalMeals : "",
				type: team.type.toUpperCase(),
				createdAt: team.createdAt,
			});
			players = await dbGetTeamPlayers(team.SK);
			console.log("players = ", players)
			if (players && players.length) {
				Object.assign(teamObj, {
					playerID1: players[0] ? players[0].SK.split("#")[1] : "",
					playerName1: players[0] ? players[0].fullName : "",
					playerEmail1: players[0] ? players[0].emailAddress : "",
					playerPhone1: players[0] ? players[0].phoneNumber : "",
					playerID2: players[1] ? players[1].SK.split("#")[1] : "",
					playerName2: players[1] ? players[1].fullName : "",
					playerEmail2: players[1] ? players[1].emailAddress : "",
					playerPhone2: players[1] ? players[1].phoneNumber : "",
					playerID3: players[2] ? players[2].SK.split("#")[1] : "",
					playerName3: players[2] ? players[2].fullName : "",
					playerEmail3: players[2] ? players[2].emailAddress : "",
					playerPhone3: players[2] ? players[2].phoneNumber : "",
					playerID4: players[3] ? players[3].SK.split("#")[1] : "",
					playerName4: players[3] ? players[3].fullName : "",
					playerEmail4: players[3] ? players[3].emailAddress : "",
					playerPhone4: players[3] ? players[3].phoneNumber : "",
				})
			}
			teamList.push(teamObj);
		}
	}

	return teamList;
});
