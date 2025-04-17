import { memo } from 'react';
import { Link, useParams } from "react-router-dom";
import { BoardInfo, getBoards } from './boardManager';

export const Home = memo(() =>  {
	const params = useParams();
	const boardSet = params.boardSetId || 'default';
	const boards = getBoards(boardSet)

	const createTile = function(board: BoardInfo) {
		return (
			<Link key={board.name} className="tile" to={{ pathname : '/' + boardSet + '/' + board.name }}>
				<i className={"fa fa-user-circle-o fa-3x"}></i>
				<p className="padded big-text">{board.name}</p>
			</Link>
		);
	};

	return (
		<div>
			<div>{boards.map(createTile, this)}</div>
		</div>
	);
});
Home.displayName = 'Home';
