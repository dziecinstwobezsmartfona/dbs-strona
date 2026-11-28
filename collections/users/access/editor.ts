import type { Access } from 'payload'
import { checkRole } from './checkRole'

const editor: Access = ({ req: { user } }) => checkRole(['admin', 'editor'], user)

export default editor
