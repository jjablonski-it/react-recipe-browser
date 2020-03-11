export default (state, action) => {
  switch (action.type) {
    case "ITEMS_LOADED":
      return {
        ...state,
        items: action.payload,
        itemsLoading: false
      };

    case "ITEMS_LOADING":
      return {
        ...state,
        itemsLoading: true
      };

    default:
      return {
        state
      };
  }
};
