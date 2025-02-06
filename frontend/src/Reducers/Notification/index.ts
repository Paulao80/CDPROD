import { UnknownAction } from "redux";

export interface Action extends UnknownAction {
    payload: string;
}

const Notification = (state: string = 'painel-Notification none', action: Action) => {
    switch (action.type) {
        case 'CHANGE_NOTIFICATION':
            if(action.payload !== undefined) return action.payload;
            else if(state === 'painel-Notification none') return 'painel-Notification show';
            else return 'painel-Notification none';
        default: return state;
    }
}

export default Notification;