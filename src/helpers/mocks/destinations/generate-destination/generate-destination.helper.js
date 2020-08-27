import {getRandomNumber} from '~/helpers/number';
import {generateDestinationPhotos} from '../generate-destination-photos/generate-destination-photos.helper';
import {generateDestinationDescription} from '../generate-destination-description/generate-destination-description.helper';

const EventImgCount = {
  MIN: 0,
  MAX: 5,
};

const generateDestination = (city) => ({
  city,
  photos: generateDestinationPhotos(getRandomNumber(EventImgCount.MIN, EventImgCount.MAX)),
  description: generateDestinationDescription(city),
});

export {generateDestination};
