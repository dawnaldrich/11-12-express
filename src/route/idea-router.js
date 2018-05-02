'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Idea from '../model/idea';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const ideaRouter = new Router();

ideaRouter.post('/api/ideas', jsonParser, (request, response, next) => {
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return next(new HttpErrors(400, 'name is required'));
  }
  return new Idea(request.body).save()
    .then((idea) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(idea);
    })
    .catch(next);
});

ideaRouter.put('/api/ideas/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Idea.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updateIdea) => {
      if (!updateIdea) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!idea)');
        return next(new HttpErrors(404, 'not not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(updateIdea);
    })
    .catch(next);
});

ideaRouter.get('/api/ideas/:id', (request, response, next) => {
  return Idea.findById(request.params.id)
    .then((idea) => {
      if (!idea) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!idea)');
        return next(new HttpErrors(404, 'idea not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(idea);
    })
    .catch(next);
});

ideaRouter.get('/api/ideas/', (request, response, next) => {
  return Idea.find(request)
    .then((ideaAll) => {
      if (!ideaAll) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!idea)');
        return next(new HttpErrors(404, 'idea not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(ideaAll);
    })
    .catch(next);
});

ideaRouter.delete('/api/ideas/:id', (request, response, next) => {
  logger.log(logger.INFO, 'DELETE - processing a request');
  return Idea.findByIdAndRemove(request.params.id)
    .then(() => {
      logger.log(logger.INFO, 'DELETE - responding with a 204 status code');
      return next(new HttpErrors(204, 'idea deleted'));
    })
    .catch(next);
});


export default ideaRouter;
