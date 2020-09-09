import {TimeFormatType} from '~/common/enums';

const getFormattedTime = (type, date) => {
  let formattedDate = null;

  switch (type) {
    case TimeFormatType.SHORT: {
      formattedDate = date.toLocaleTimeString([], {
        timeStyle: `short`,
      });
      break;
    }
  }

  return formattedDate;
};

export {getFormattedTime};
