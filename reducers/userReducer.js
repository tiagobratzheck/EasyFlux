import * as Actions from '../actions/userAction';

const initialstate = {}

const user = function (state = initialstate, action) {
    switch (action.type) {
        case Actions.USER_ACCESS:
            {
                return {
                    ...action.payload
                }
            }
        default:
            {
                return state
            }
    }
}

export default user;