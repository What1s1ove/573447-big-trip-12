import {TimeFormatType} from '~/common/enums';

const getFormattedTime = (type, date) => {
  const localDate = new Date(date);

  const formatter = {
    [TimeFormatType.SHORT]: localDate.toLocaleTimeString([], {
      timeStyle: `short`,
    }),
  };

  return formatter[type];
};

export {getFormattedTime};
