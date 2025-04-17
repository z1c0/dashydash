import secrets from '../secrets.json';
const API_KEY: string = secrets.todoistApiKey;

export const ToDo = {
  url : 'https://api.todoist.com/rest/v2/tasks',
  authorization : 'Bearer ' + API_KEY
}