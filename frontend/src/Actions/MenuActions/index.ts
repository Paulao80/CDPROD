import {Action} from '../../Reducers/Menu';

export const changeMenu = () => {
    return {type: 'CHANGE_MENU'} as Action;
}

export const hideMenu = () => {
    return {
        type: 'CHANGE_MENU', 
        payload: {
            aside: 'responsive-none',
            button: 'btn-off'
        }
    } as Action;
}

