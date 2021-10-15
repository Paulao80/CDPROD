import {Action} from '../../Reducers/Notification';

export const changeNotification = () => {
    return {type: 'CHANGE_NOTIFICATION'} as Action;
}

export const hideNotification = () => {
    return {
        type: 'CHANGE_NOTIFICATION',
        payload: 'painel-Notification none'
    } as Action;
}