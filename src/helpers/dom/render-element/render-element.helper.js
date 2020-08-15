import {RenderPosition} from '~/common/enums';

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER_END:
      container.parentNode.insertBefore(element, container.nextSibling);
  }
};

export {renderElement};
