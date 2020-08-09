import {DateFormatType, TimeFormatType} from '~/common/enums';
import {getFormattedTime} from '../get-formatted-time/get-formatted-time.helpers';

const getFormattedDate = (type, date) => {
  const localDate = new Date(date);
  let formattedDate = null;

  switch (type) {
    case DateFormatType.SHORT_MONTH_DAY:
      formattedDate = localDate.toLocaleDateString(`en-US`, {
        month: `short`,
        day: `numeric`,
      });
      break;
    case DateFormatType.FULL_YEAR:
      formattedDate = localDate.toLocaleDateString(`en-US`, {
        year: `numeric`,
        month: `numeric`,
        day: `numeric`,
      });
      break;
    case DateFormatType.FULL_YEAR_TIME:
      formattedDate = `${getFormattedDate(
          DateFormatType.FULL_YEAR,
          localDate
      )} ${getFormattedTime(TimeFormatType.SHORT, localDate)}`;
      break;
  }

  return formattedDate;
};

export {getFormattedDate};
