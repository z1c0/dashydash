import express, { Express } from "express";
import path from "path";
import { createServerFetcher, RouteModule } from "./common/serverFetcher";
// routes
import { Appointments } from './routes/appointments';
import { Birthdays } from './routes/birthdays';
import { Blog } from './routes/blog';
import { Bus } from './routes/bus';
import { Football } from './routes/football';
import { News } from './routes/news';
import { Pics } from './routes/pics';
import { Recipe } from './routes/recipe';
import { StarWars } from './routes/starwars';
import { TimeOfDay } from './routes/timeofday';
import { ToDo } from './routes/todo';
import { Weather } from './routes/weather';

const app: Express = express();

// load static content before routing takes place
const wwwroot = __dirname;
app.use(express['static'](wwwroot));

app.use(express.json());

function createRoutes() {
	const router = express.Router();
	function createRoute(name: string, module: RouteModule) {
		if (module.init) {
			module.init();
		}
		const route = '/api/' + name;
		router.get(route, createServerFetcher(module));
		if (module.post) {
			// @ts-ignore
			router.post(route, module.post);
		}
	}

	createRoute('appointments', Appointments);
	createRoute('birthdays', Birthdays);
	createRoute('blog', Blog);
	createRoute('bus', Bus);
	createRoute('football', Football);
	createRoute('news', News);
	createRoute('pics', Pics);
	createRoute('recipe', Recipe);
	createRoute('starwars', StarWars);
	createRoute('timeofday', TimeOfDay);
	createRoute('todo', ToDo);
	createRoute('weather', Weather);
	return router;
}
app.use(createRoutes());

// All other routes should serve the React app
app.get('*', (_, res) => {
	res.sendFile(path.join(wwwroot, 'index.html'));
});

const port = 2323;
app.listen(port);
console.log(`[ *** Welcome to dashydash *** ]`);
console.log('running on: http://localhost:' + port);
