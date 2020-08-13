import {TimeFormatType} from '~/common/enums';

const getFormattedTime = (type, date) => {
  const localDate = new Date(date);
  let formattedDate = null;

  switch (type) {
    case TimeFormatType.SHORT:
      formattedDate = localDate.toLocaleTimeString([], {
        timeStyle: `short`,
      });
      break;
  }

  return formattedDate;
};

export {getFormattedTime};
