import {getDuration} from '../get-duration/get-duration.helper';
import {LabelToMomentUtilMap} from './common';

const MIN_NUMBER_FOR_TWO_DIGITAL = 10;

const getTwoDigitalTime = (number) => {
  const twoDigitalFormatted = number < MIN_NUMBER_FOR_TWO_DIGITAL ? `0${number}` : number;

  return twoDigitalFormatted;
};

const getDurationTime = (start, end) => {
  const duration = getDuration(start, end);
  const durationTime = Object.entries(LabelToMomentUtilMap).reduce(
      (template, [label, momentUtil]) => {

        const time = duration.get(momentUtil);

        return (template += time ? `${getTwoDigitalTime(time)}${label} ` : ``);
      },
      ``
  );

  return durationTime;
};

export {getDurationTime};
