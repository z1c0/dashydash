import { createContext, memo, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { getBoards, getModule, ModuleInfo } from './boardManager';
import { Cursor } from '../common/misc'
import useInterval from '../../frontend/hooks/useInterval';
import { useArrowKeyHandler } from '../../frontend/hooks/useArrowKeyHandler';

export const ModuleContext = createContext<{ name: string, width: number; height: number }>({name: "", width: 0, height: 0});

export const Board = memo(() => {
	const navigate = useNavigate();
	const params = useParams();
	const boardSetId = params.boardSetId || "";
	const boards = useMemo(() => new Cursor(getBoards(boardSetId)), [boardSetId]);
	const boardId = params.boardId;
	const index = Math.max(0, boards.array().findIndex(b => b.name === boardId)); // 0 if not found	
	const board = boards.array()[index];
	//console.log(`boardSetId: ${boardSetId}, boardId: ${boardId}, index: ${index},`);

	useInterval(
		() => goToNewPage(boards.next().name),
		moment.duration(10, 'minutes')
	);
	useArrowKeyHandler(
		() => goToNewPage(boards.previous().name),
		() => goToNewPage(boards.next().name)
	);
  const goToNewPage = (route: string) => {
    navigate(`/${boardSetId}/${route}`);
  };	

	const createPart = function(moduleInfo: ModuleInfo) {
		//console.log(moduleInfo);
		let name = moduleInfo.name ;
		if (name.indexOf('.')) {
			name = name.split('.')[0];
		}
		const gridPos = {
			gridColumnStart: moduleInfo.pos[0],
			gridColumnEnd: moduleInfo.pos[0] + moduleInfo.pos[2],
			gridRowStart: moduleInfo.pos[1],
			gridRowEnd: moduleInfo.pos[1] + moduleInfo.pos[3],
		};

		const Module = getModule(name);
		//console.log(moduleInfo.id);
		return (
			<div key={moduleInfo.id} className="part" style={gridPos}>
				<ModuleContext.Provider value={{ name: moduleInfo.name, width: moduleInfo.pos[2], height: moduleInfo.pos[3] }}>
					<Module/>
				</ModuleContext.Provider>
			</div>
		);
	};

	return (
		<>
			<div className="board">
				{board.modules.map(createPart)}
			</div>
			<span id='board-name' className='tiny-text'>{board.name}</span>
		</>
	);
});
Board.displayName = 'Board';