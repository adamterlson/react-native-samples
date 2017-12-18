// Offline pause
const reqChannel = yield actionChannel('REQUEST')
function *worker() {
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
}
// Cancel when offline, fork when online
while (true) {
    yield race([
        fork(worker),
        take('OFFLINE'),
    ])
    yield take('ONLINE')
}
