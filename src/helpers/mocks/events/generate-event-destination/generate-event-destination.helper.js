import {getRandomNumber} from '~/helpers/number';
import {generateEventPhotos} from '../generate-event-photos/generate-event-photos.helper';
import {generateEventDescription} from '../generate-event-description/generate-event-description.helper';

const EventImgCount = {
  MIN: 0,
  MAX: 5,
};

const generateEventDestination = (city) => ({
  city,
  photos: generateEventPhotos(
      getRandomNumber(EventImgCount.MIN, EventImgCount.MAX)
  ),
  description: generateEventDescription(city),
});

export {generateEventDestination};
