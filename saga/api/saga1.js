// FSA -> Fetch -> FSA
while (true) {
    const req = yield take('REQUEST')
    const res = yield call(fetch, req.payload)
    yield put({ type: 'RESPONSE', payload: res })
}
