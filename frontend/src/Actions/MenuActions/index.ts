interface Action {
    type: string;
}

export const changeMenu = () => {
    return {type: 'CHANGE_MENU'} as Action;
}

