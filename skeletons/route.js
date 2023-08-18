

const sampleRoutes = `
import express from "express";

const {NAME}Router = express.Router();

import * as {NAME}Controller from "@controller/{NAME}.controller";
import { checkObjectId } from "@middleware/objectId.middleware";

/**
 * {NAME} api routes
 *
 */
{NAME}Router.get('/list', [ ],  {NAME}Controller.list);
{NAME}Router.post('/', [], {NAME}Controller.create);
{NAME}Router.get('/:id', [checkObjectId],  {NAME}Controller.getOne);
{NAME}Router.put('/:id', [checkObjectId], {NAME}Controller.update);
{NAME}Router.delete('/:id', [checkObjectId], {NAME}Controller.deleteOne);

module.exports = {NAME}Router;
`;

module.exports = {
    sampleRoutes
}