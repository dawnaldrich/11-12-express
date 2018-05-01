'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import Idea from '../model/idea';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();
const ideaRouter = new Router();

ideaRouter.post('/api/ideas', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST -- processing a request');
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return response.sendStatus(400);
  }
  return new Idea(request.body).save()
    .then((idea) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(idea);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

ideaRouter.get('/api/ideas/:id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');
  return Idea.findById(request.params.id)
    .then((idea) => {
      if (!idea) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!idea)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(idea);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - objectID');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET _ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

ideaRouter.delete('/api/ideas/:id', (request, response) => {
  logger.log(logger.INFO, 'DELETE - processing a request');
  return Idea.findByIdAndRemove(request.params.id)
    .then((idea) => {
      if (!idea) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code - (!idea)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'DELETE - responding with a 202 status code');
      return response.sendStatus(202);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code - objectID');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET _ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default ideaRouter;
