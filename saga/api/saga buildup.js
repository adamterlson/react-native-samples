// Base structure - take FSA, fetch with `payload` config
while (true) {
    const reqAction = yield take('REQUEST')
    const res = yield call(fetch, reqAction.payload)
    yield put({ type: 'RESPONSE', res })
}


// Buffer incoming requests
const reqChannel = yield actionChannel('REQUEST')
while (true) {
    const reqAction = yield take(reqChannel)
    const res = yield call(fetch, reqAction.payload)
    yield put({ type: 'RESPONSE', res })
}

// timeout
const reqChannel = yield actionChannel('REQUEST')
while (true) {
    const reqAction = yield take(reqChannel)
    const { res, timeout } = yield race({
        res: call(fetch, reqAction.payload),
        timeout: call(delay, 5000),
    })
    if (res) {
        yield put({ type: 'RESPONSE', res })
    }
}

// concurrency
const reqChannel = yield actionChannel('REQUEST')

function *worker() {
    while (true) {
        const reqAction = yield take(reqChannel)
        const { res, timeout } = yield race({
            res: call(fetch, reqAction.payload),
            timeout: call(delay, 5000),
        })
        if (res) {
            yield put({ type: 'RESPONSE', res })
        }
    }
}

for (let i = 0; i < 5; i++) {
    yield fork(worker)
}
