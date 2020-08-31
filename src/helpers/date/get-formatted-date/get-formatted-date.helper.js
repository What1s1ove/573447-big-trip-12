import {DateFormatType, TimeFormatType} from '~/common/enums';
import {getFormattedTime} from '../get-formatted-time/get-formatted-time.helpers';

const getFormattedDate = (type, date) => {
  let formattedDate = null;

  switch (type) {
    case DateFormatType.SHORT_MONTH_DAY:
      formattedDate = date.toLocaleDateString(`en-US`, {
        month: `short`,
        day: `numeric`,
      });
      break;
    case DateFormatType.FULL_YEAR:
      formattedDate = date.toLocaleDateString(`en-US`, {
        year: `numeric`,
        month: `numeric`,
        day: `numeric`,
      });
      break;
    case DateFormatType.FULL_YEAR_TIME:
      formattedDate = `${getFormattedDate(
          DateFormatType.FULL_YEAR,
          date
      )} ${getFormattedTime(TimeFormatType.SHORT, date)}`;
      break;
  }

  return formattedDate;
};

export {getFormattedDate};
