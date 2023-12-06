

const sampleRoutes = `
const express = require('express');

const {NAME}Router = express.Router();

const {NAME}Controller = require('./{NAME}.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * {NAME} api routes
 *
 */
{NAME}Router.get('/', [ ],  {NAME}Controller.list);
{NAME}Router.post('/', [], {NAME}Controller.store);
{NAME}Router.get('/:id', [ paramsValidator ],  {NAME}Controller.get);
{NAME}Router.put('/:id', [ paramsValidator ], {NAME}Controller.update);
{NAME}Router.delete('/:id', [ paramsValidator ], {NAME}Controller.remove);

module.exports = {NAME}Router;
`;

module.exports = {
    sampleRoutes
}