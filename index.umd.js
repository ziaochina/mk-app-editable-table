__webpack_public_path__ = window["__pub_mk-app-editable-table__"];

const data = require('./data')
const config = require('./config')
require('./mock.js')
require('./style.less')

export default {
    name: "mk-app-editable-table",
    version: "1.0.9",
    description: "mk-app-editable-table",
    meta: data.getMeta(),
    components: [],
    config: config,
    load: (cb) => {
        cb(require('./component'), require('./action'), require('./reducer'))
	}
}