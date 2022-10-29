import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import FilterCollection from './collection';

const router = express.Router();

/**
 * Get the status of the filter for a user
 *
 * @name GET /api/filter
 *
 * @return {string} - The status of the filter for the user
 * @throws {403} - if the user is not logged in
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const filter = await FilterCollection.getStatus(userId);
    let new_message = '';
    if (filter) {
      new_message = 'Filter is on. You will only see the posts from people you follow';
    } else {
      new_message = 'Filter is off. You will see the posts and interactions from people you follow';
    }

    res.status(200).json({message: new_message, result: filter});
  }
);

/**
 * Switches the status of the filter for the user
 *
 * @name PUT /api/filter
 *
 * @return {FilterResponse} - the updated filter
 * @throws {403} - if the user is not logged in
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const new_filter = await FilterCollection.switchFilter(userId);

    const response = util.constructFilterResponse(new_filter);

    res.status(200).json({
      message: 'Your filter status has been switched',
      filter: response
    });
  }
);

export {router as filterRouter};
