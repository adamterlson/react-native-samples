// Buffer incoming requests
const reqChannel = yield actionChannel('REQUEST') // Construct
while (true) {
    const req = yield take(reqChannel) // Consume
    const res = yield call(fetch, req.payload)
    yield put({ type: 'RESPONSE', payload: { res, req } })
}
