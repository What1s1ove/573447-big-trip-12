import {DateFormatType} from '~/common/enums';

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
    case DateFormatType.SHORT_MONTH_DAY_YEAR:
      formattedDate = localDate.toLocaleDateString(`en-US`, {
        year: `numeric`,
        month: `short`,
        day: `numeric`,
      });
      break;
  }

  return formattedDate;
};

export {getFormattedDate};
