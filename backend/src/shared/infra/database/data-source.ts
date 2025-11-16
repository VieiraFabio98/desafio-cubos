import { DataSource } from 'typeorm'
import { getConfig } from './config'

const appDataSource = new DataSource(getConfig())
appDataSource.initialize()
export default appDataSource