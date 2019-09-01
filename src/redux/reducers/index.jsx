import { combineReducers } from 'redux';

import book from './Books';
import user from './Users';

const rootReducer = combineReducers ({
    book,
    user,
})

export default rootReducer