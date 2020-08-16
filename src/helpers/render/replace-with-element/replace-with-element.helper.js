import Abstract from '~/view/abstract/abstract';

const replaceWithElement = (oldChild, newChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.node;
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.node;
  }

  oldChild.replaceWith(newChild);
};

export {replaceWithElement};
