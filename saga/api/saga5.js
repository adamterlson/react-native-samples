// Handle more than one request at once
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

// Fork a saga n-times
const forkTimes = (saga, ntimes) => fork(function*() {
    for (let i = 0; i < ntimes; i++) {
        yield fork(saga)
    }
})

while (true) {
    yield race([
        forkTimes(worker, 5), // Usage
        take('OFFLINE'),
    ])
    yield take('ONLINE')
}
