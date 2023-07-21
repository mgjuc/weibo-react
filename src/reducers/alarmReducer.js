const alarmReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ALARM':
            return action.msg;
        default:
            return state;
    }
}

const setAlarm = (msg) => {
    return {
        type: 'SET_ALARM',
        msg,
    }
}

export default alarmReducer
export { setAlarm }