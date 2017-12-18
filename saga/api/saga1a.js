// Persist REQUEST, destroy RESPONSE
while (true) {
    const req = yield take('REQUEST')
    const res = yield call(fetch, req.payload)
    yield put({ type: 'RESPONSE', payload: { req, res } }) // add
}


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'REQUEST':
            return [...state, action]
        case 'RESPONSE':
            return state.filter(inProg => inProg.req === action.req)
        default:
            return state
    }
}
