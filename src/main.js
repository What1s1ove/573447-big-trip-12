import {createTotalPriceTemplate} from '~/view/total-price/total-price';
import {createSiteMenuTemplate} from '~/view/site-menu/site-menu';
import {createFilterTemplate} from '~/view/filter/filter';
import {createFormSortTemplate} from '~/view/form-sort/form-sort';
import {createFormEventTemplate} from '~/view/form-event/form-event';
import {createTripDaysTemplate} from '~/view/trip-days/trip-days';
import {createTripDayTemplate} from '~/view/trip-day/trip-day';
import {createEventTemplate} from '~/view/event/event';
import {renderTemplate, generateEvents, getFormattedDate} from '~/helpers';
import {AdjacentHTMLPlace, DateFormatType} from '~/common/enums';

const EVENTS_COUNT = 20;
const events = generateEvents(EVENTS_COUNT);
const days = Array.from(new Set(events.map((it) => getFormattedDate(DateFormatType.SHORT_MONTH_DAY_YEAR, it.start))));
const sortedDays = days.sort((a, b) => new Date(a) - new Date(b));

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

renderTemplate(
    tripMaiNode,
    createTotalPriceTemplate(),
    AdjacentHTMLPlace.AFTER_BEGIN
);

renderTemplate(
    menuTitleNode,
    createSiteMenuTemplate(),
    AdjacentHTMLPlace.AFTER_END
);

renderTemplate(
    filterTitleNode,
    createFilterTemplate(),
    AdjacentHTMLPlace.AFTER_END
);

renderTemplate(
    eventsContainerNode,
    createFormSortTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);

renderTemplate(
    eventsContainerNode,
    createFormEventTemplate(events[0]),
    AdjacentHTMLPlace.BEFORE_END
);

renderTemplate(
    eventsContainerNode,
    createTripDaysTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);

const tripDaysNode = eventsContainerNode.querySelector(`.trip-days`);

sortedDays.forEach((day, idx) => {
  const tripDaysNumber = idx + 1;

  renderTemplate(
      tripDaysNode,
      createTripDayTemplate(new Date(day), tripDaysNumber),
      AdjacentHTMLPlace.BEFORE_END
  );

  const eventListNode = tripDaysNode.querySelectorAll(`.trip-events__list`);

  events
    .slice(1)
    .filter((event) =>
      getFormattedDate(DateFormatType.SHORT_MONTH_DAY_YEAR, event.start) === day
    )
    .forEach((it) =>
      renderTemplate(
          eventListNode[idx],
          createEventTemplate(it),
          AdjacentHTMLPlace.BEFORE_END
      )
    );
});
