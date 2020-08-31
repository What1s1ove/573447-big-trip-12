import Abstract from '~/view/abstract/abstract';

const removeElement = (component) => {
  const isAbstractInstance = component instanceof Abstract;

  if (!isAbstractInstance || !component) {
    throw new Error(`Can remove only components`);
  }

  component.node.remove();

  component.removeElement();
};

export {removeElement};
