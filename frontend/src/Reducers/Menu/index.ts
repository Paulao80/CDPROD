import { UnknownAction } from "redux";
import { StateMenu } from "../../Interfaces";

export interface Action extends UnknownAction {
  payload: StateMenu;
}

const Menu = (
  state: StateMenu = {
    aside: "responsive-none",
    button: "btn-off",
  },
  action: Action
) => {
  switch (action.type) {
    case "CHANGE_MENU":
      if (action.payload !== undefined) {
        return action.payload;
      } else if (
        state.aside === "responsive-none" &&
        state.button === "btn-off"
      )
        return {
          aside: "responsive-show",
          button: "btn-on",
        } as StateMenu;
      else
        return {
          aside: "responsive-none",
          button: "btn-off",
        } as StateMenu;
    default:
      return state;
  }
};

export default Menu;
