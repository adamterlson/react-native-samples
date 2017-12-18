import saga, { sagaMiddleware } from 'app/saga'
import makeStore from 'app/store'
import ui from 'app/ui'

const store = makeStore(sagaMiddleware)

sagaMiddleware.run(saga)

const app = ui(store)

export default app
