import {getDuration} from '../get-duration/get-duration.helper';
import {LabelToMomentUtilMap} from './common';

const getTwoDigitalTime = (number) => {
  const twoDigitalFormatted = number < 10 ? `0${number}` : number;

  return twoDigitalFormatted;
};

const getDurationTime = (start, end) => {
  const duration = getDuration(start, end);

  const durationTime = Object.entries(LabelToMomentUtilMap).reduce(
      (acc, [label, momentUtil]) => {
        const time = duration.get(momentUtil);

        return time ? (acc += `${getTwoDigitalTime(time)}${label} `) : ``;
      },
      ``
  );

  return durationTime;
};

export {getDurationTime};
