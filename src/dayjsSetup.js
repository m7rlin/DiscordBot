// Import dayjs and the required plugins
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pl'

// Set default locale
dayjs.locale('pl')

// Use the plugins
dayjs.extend(duration)
dayjs.extend(relativeTime)

// Export the configured dayjs instance
export default dayjs
