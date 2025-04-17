import { memo } from "react";
import { useFetchInterval } from "../../../frontend/hooks/useFetchInterval";
import { duration } from "moment";
import { FetchErrorAware } from "../../common/fetchErrorAware";
import moment from "moment";

type Result = {
	pointsTeam1: number;
	pointsTeam2: number;
}
type Team = {
	shortName: string;
	teamName: string;
	teamIconUrl: string;
}
type Match = {
	matchIsFinished: boolean;
	matchDateTime: string;
	team1: Team;
	team2: Team;
	matchResults: Result[];
}
type State = {
	team1 : string,
	icon1 : string,
	team2 : string,
	icon2 : string,
	info : string;
}

export const Football = memo(() => {
	const fetchState = useFetchInterval<Match[], State>({
		route: "football",
		interval: duration(1, 'hour'),
		transform: (matches) => {
			//console.log(matches);
			let m = matches.find((m: { team1: { teamName: string | string[]; }; team2: { teamName: string | string[]; }; }) => {
				return m.team1.teamName.includes('Dortmund') || m.team2.teamName.includes('Dortmund');
			});
			if (m) {
				let info = '';
				if (m.matchIsFinished) {
					const results = m.matchResults[1];
					info = results.pointsTeam1 + ' : ' + results.pointsTeam2;
				}
				else {
					info = moment(m.matchDateTime).format("dd, DD.MM.YYYY, HH:mm")
				}
				//console.log(m);
				return {
					team1 : m.team1.shortName || m.team1.teamName,
					icon1 : m.team1.teamIconUrl,
					team2 : m.team2.shortName || m.team2.teamName,
					icon2 : m.team2.teamIconUrl,
					info : info
				};
			}
			throw new Error('No match found');
		}
	});

	return (
		<FetchErrorAware {...fetchState}>
			<div className='football small-text'>
				<p>
					<span className='padded bold-text'>{fetchState.data?.team1}</span>
					<span className='teamLogo' style={{ backgroundImage: 'url(' + fetchState.data?.icon1 + ')' }}></span>
				</p>
				<p className='padded small-text'>vs.</p>
				<p>
					<span className='padded bold-text'>{fetchState.data?.team2}</span>
					<span className='teamLogo' style={{ backgroundImage: 'url(' + fetchState.data?.icon2 + ')' }}></span>
				</p>
				<br/>
				<p>{fetchState.data?.info}</p>
			</div>
		</FetchErrorAware>
	);
});
Football.displayName = 'Football';

