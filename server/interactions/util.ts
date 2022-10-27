import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Interaction} from '../interactions/model';
import UserCollection from '../user/collection';

type InteractionResponse = {
  user: string;
  freetContent: string;
  freetAuthor: string;
  interaction_type: string;
  dateCreated: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Interaction object from the database into an object with
 * all information needed by the front end
 *
 * @param {HydratedDocument<Interaction>} interaction - an interaction
 * @returns {InteractionResponse} - The interaction object formatted for the frontend
 */
const constructInteractionResponse = async (interaction: HydratedDocument<Interaction>): Promise<InteractionResponse> => {
  const interactionCopy: Interaction = {
    ...interaction.toObject({
      versionKey: false
    })
  };

  const user = await UserCollection.findOneByUserId(interaction.freet.authorId);

  return {
    user: interaction.user.username,
    freetContent: interaction.freet.content,
    freetAuthor: user.username,
    interaction_type: interaction.interaction,
    dateCreated: formatDate(interaction.dateCreated)
  };
};

export {
  constructInteractionResponse
};

