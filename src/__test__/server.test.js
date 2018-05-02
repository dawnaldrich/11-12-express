'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Idea from '../model/idea';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/ideas`;

const createIdeaMock = () => {
  return new Idea({
    name: faker.lorem.words(10),
    subject: faker.lorem.words(25),
    body: faker.lorem.words(25),
  }).save();
};

describe('/api/ideas', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Idea.remove({}));
  test('POST - It should respond with a 200 status ', () => {
    const ideaToPost = {
      name: faker.lorem.words(25),
      subject: faker.lorem.words(25),
    };
    return superagent.post(apiURL)
      .send(ideaToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(ideaToPost.name);
        expect(response.body.subject).toEqual(ideaToPost.subject);
        expect(response.body.timestamp).toBeTruthy();
      });
  });
  test('POST - It should respond with a 400 status', () => {
    const ideaToPost = {
      subject: faker.lorem.words(25),
    };
    return superagent.post(apiURL)
      .send(ideaToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/ideas/', () => {
    test('should respond with 200 if there are no errors', () => {
      let ideaToTest = null;
      return createIdeaMock()
        .then((idea) => {
          ideaToTest = idea;
          return superagent.get(`${apiURL}/${idea._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(ideaToTest.name);
          expect(response.body.subject).toEqual(ideaToTest.subject);
        });
    });
    test('should respond with 404 if there is no idea to be found', () => {
      return superagent.get(`${apiURL}/THisIsAnInvalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
  describe('DELETE /api/ideas', () => {
    test('should respond with 204 if there is no error', () => {
      return createIdeaMock()
        .then((idea) => {
          // ideaToTest = idea;
          return superagent.delete(`${apiURL}/${idea._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(204);
        });
    });
    test('should respond with 404 if there is no idea to be found', () => {
      return superagent.get(`${apiURL}/ThisIsAnInvalidID`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
