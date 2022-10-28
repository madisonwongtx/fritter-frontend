import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as followValidator from '../follow/middleware';
import * as util from './util';
import UserCollection from '../user/collection';

const router = express.Router();

/**
 * Get all the users that the user follows
 *
 * @name GET /api/follow
 *
 * @return {FollowResponse[]} - An array of users that are followed by the user with userID
 * @throws {403} - if user is not logged in
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const following = await FollowCollection.findAllFollowing(userId);
    const response = following.map(util.constructFollowResponse);
    res.status(200).json({
      message: 'Here are the users you follow',
      follower: following
    });
  }
);

/**
 * Get all the users that follow the user
 *
 * @name GET /api/follow/followers
 *
 * @return {FollowResponse[]} - an array of user that are following the user
 * @throws {403} - if user is not logged in
 *
 */
router.get(
  '/followers',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const followers = await FollowCollection.findAllFollowers(userId);
    const response = followers.map(util.constructFollowResponse);
    res.status(200).json({
      message: 'Here are your followers',
      follower: followers
    });
  }
);

/**
 * Create a following between users
 *
 * @name POST /api/follow
 *
 * @param {string} user - username of user that will be followed
 * @return {FollowResponse} - The created following
 * @throws {404} - if user is not an exisiting username
 * @throws {403} - if user is not logged in
 * @throws {413} - if the session user already follows user
 *
 */
router.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user !== undefined) {
      next();
    }
  },
  [
    userValidator.isUserLoggedIn,
    userValidator.isValidUsername,
    followValidator.isAlreadyFollow
  ],
  // When i put console log in the async function below it does not print
  // Think issue is somehow sending a promise instead of user type into follow type
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const targetUser = await UserCollection.findOneByUsername(req.body.user);
    const newFollow = await FollowCollection.follow(targetUser.id, userId);

    res.status(201).json({
      message: `You are now following ${req.body.user as string}`,
      follow: newFollow
    });
  }
);

/**
 * Delete a following between users
 *
 * @name DELETE /api/follow
 *
 * @param {string} user - username of user that will be unfollowing
 * @return {string} - A success message
 * @throws {404} - if user is not an exisiting username
 * @throws {413} - if the session user does not follow the user
 * @throws {403} - if user is not logged in
 *
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isValidUsername,
    followValidator.isAlreadyUnfollow
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const targetUser = await UserCollection.findOneByUsername(req.body.user);
    const newFollow = await FollowCollection.unfollow(targetUser.id, userId);

    res.status(201).json({
      message: `You have unfollowed ${req.body.user as string}`
    });
  }
);

/**
  * Get the feed for the current session user based on following
  *
  * @name GET /api/follow/feed
  *
  * @return {(Freet | Interaction)[]} - The feed for the user
  * @throws {403} - if the user is not logged in
  */
router.get(
  '/feed',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const feed_ = await FollowCollection.getFeed(userId);
    res.status(200).json({
      message: 'Here is your feed',
      feed: await Promise.all(feed_.map(util.constructFeedResponse))
    });
  }
);

/**
 * Get the available users that the user could follow
 *
 * @name GET /api/follow/suggested
 *
 * @return {Follow[]} - the suggested users to follow
 * @throws {403} -if the user is not logges in
 */
router.get(
  '/suggested',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const suggested = await FollowCollection.getSuggested(userId);
    res.status(200).json({
      message: 'Here is your suggested',
      result: suggested
    });
  }
);

export {router as followRouter};
