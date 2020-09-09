import Abstract from '~/view/abstract/abstract';

const removeElement = (component) => {
  const isAbstractInstance = component instanceof Abstract;

  if (!component) {
    return;
  }

  if (!isAbstractInstance) {
    throw new Error(`Can remove only components`);
  }

  component.node.remove();

  component.removeElement();
};

export {removeElement};
