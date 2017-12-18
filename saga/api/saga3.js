// Time out after 5 seconds
const reqChannel = yield actionChannel('REQUEST')
while (true) {
    const req = yield take(reqChannel)
    const [res] = yield race([
        call(fetch, req.payload),
        call(delay, 5000),
    ])
    if (res) {
        yield put({ type: 'RESPONSE', payload: { req, res } })
    }
}
