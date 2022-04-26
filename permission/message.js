const AccessControl = require('role-acl')
const ac = new AccessControl()


ac.grant('staff').execute('join').on('messages')


exports.readAll = (requester) =>   ac.can(requester.role).execute('join').sync().on('messages')

