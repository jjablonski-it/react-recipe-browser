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

    case "ADD_KEYWORD": {
      const { keywords } = state;
      const exists = keywords.includes(action.payload);
      if (!exists) keywords.push(action.payload);
      return {
        ...state,
        keywords: [...keywords]
      };
    }

    case "REMOVE_KEYWORD": {
      const { keywords } = state;
      return {
        ...state,
        keywords: keywords.filter((kw, i) => i !== action.payload)
      };
    }

    default:
      return {
        state
      };
  }
};
