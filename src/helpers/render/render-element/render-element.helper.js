import {RenderPosition} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.node;
  }

  if (child instanceof Abstract) {
    child = child.node;
  }

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      container.append(child);
      break;
  }
};

export {renderElement};
