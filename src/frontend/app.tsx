import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PageNotFound } from './404';
import { Overlays } from './overlays';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './boards/home';
import { Board } from './boards/board';

createRoot(document.getElementById('app')!).render(
	<div id="main">
		<StrictMode>
			<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<Routes>
					<Route path="/:boardSetId?" element={<Home/>} />
					<Route path="/:boardSetId/:boardId" element={<Board/>} />
					<Route path="*" element={<PageNotFound/>} />
				</Routes>
			</BrowserRouter>
			<Overlays/>
		</StrictMode>
	</div>
);
