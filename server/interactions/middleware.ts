import type {Request, Response, NextFunction} from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import InteractionCollection from '../interactions/collection';

/**
 * Checks if interaction already exists
 */
const isAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.interaction_type) {
    res.status(400).json({error: 'Missing interaction type to add'});
    return;
  }

  if (!req.params.freetId) {
    res.status(400).json({error: 'Missing freet you want to interact with'});
    return;
  }

  const session_user = await UserCollection.findOneByUsername(req.session.userId);
  const curr_freet = await FreetCollection.findOne(req.params.freetId);
  const curr_interaction = await InteractionCollection.findOne(req.session.userId, curr_freet.id);
  if (!curr_interaction) {
    res.status(413).json({error: 'You have not interacted with this post yet'});
    return;
  }

  next();
};

/**
 * Checks if interaction does not exist
 */
const isInteractionDoesNotExist = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.interaction_type) {
    res.status(400).json({error: 'Missing interaction type to add'});
    return;
  }

  if (!req.params.freetId) {
    res.status(400).json({error: 'Missing freet you want to interact with'});
    return;
  }

  const session_user = await UserCollection.findOneByUsername(req.session.userId);
  const curr_freet = await FreetCollection.findOne(req.params.freetId);
  const curr_interaction = await InteractionCollection.findOne(req.session.userId, curr_freet.id);
  if (curr_interaction) {
    res.status(413).json({error: 'You have already interacted with this post'});
    return;
  }

  next();
};

/**
 * Checks if interaction type is a valid interaction
 */
const isValidInteraction = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.interaction_type) {
    res.status(400).json({error: 'Missing interaction type to add'});
    return;
  }

  const allowedInteractions = new Set<string>(['thumbs up', 'thumbs down', 'heart', 'happy', 'sad', 'angry', 'clapping', 'laughing', 'dead']);
  if (!allowedInteractions.has(req.body.interaction_type)) {
    res.status(401).json({error: 'That is not an allowed interaction'});
    return;
  }

  next();
};

/**
 * Checks if interaction already exists
 */
const canDelete = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.freetId) {
    res.status(400).json({error: 'Missing freet you want to interact with'});
    return;
  }

  const session_user = await UserCollection.findOneByUsername(req.session.userId);
  const curr_freet = await FreetCollection.findOne(req.params.freetId);
  const curr_interaction = await InteractionCollection.findOne(req.session.userId, curr_freet.id);
  if (!curr_interaction) {
    res.status(413).json({error: 'You have not interacted with this post yet'});
    return;
  }

  next();
};

export {
  isAlreadyExists,
  isInteractionDoesNotExist,
  isValidInteraction,
  canDelete
};
