export const parentDom = (currentElem, closestClass) => {
  let safety = 0;

  if (Object.keys(currentElem).length <= 0) return null;
  // Get outer element
  while (
    !currentElem.className.split(" ").includes(closestClass) &&
    safety++ < 100
  ) {
    currentElem = currentElem.parentNode;
  }

  return currentElem;
};

export const positionDom = (elem) => {
  if (Object.keys(elem).length <= 0) return null;

  // Scroll window offset
  const offset = window.scrollY;

  // Absolute position
  const { width, height, top, left } = elem.getBoundingClientRect();

  return { width, height, top, left };
};
