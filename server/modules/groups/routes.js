import { Router } from 'express';
import * as GroupController from './controller';

const routes = new Router();

routes.post('/groups/new', GroupController.createGroup);
routes.post('/groups/:groupId/chats/new', GroupController.createGroupChat);
routes.get('/groups/:groupId/chats', GroupController.getGroupChats);

export default routes;
