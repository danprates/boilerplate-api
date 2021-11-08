import app from './config/app'
import { PORT } from './config/env.config'

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
