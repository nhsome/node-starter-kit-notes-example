'use strict'

const Roles = require('./Roles.js'),
  ALL_ROLES = Roles.ALL

module.exports = [
  // Main ping
  {
    path: '/ping',
    method: 'get',
    controller: 'Main',
    action: 'ping',
    accessible: []
  },
  // Main show this user
  {
    path: '/ping',
    method: 'get',
    controller: 'Main',
    action: 'ping',
    accessible: []
  },
  // Main
  {
    path: '/whoami',
    method: 'get',
    controller: 'Main',
    action: 'showThisUser',
    accessible: ALL_ROLES
  },
  // Auth
  {
    path: '/login',
    method: 'post',
    controller: 'Auth',
    action: 'authVerify',
    accessible: [],
    log: true,
    logBody: false,
    logSuccessResult: false
  },
  // Show users
  {
    path: '/users',
    method: 'get',
    controller: 'User',
    action: 'show',
    accessible: ALL_ROLES
  },
  // Update user
  {
    path: '/user/:id',
    method: 'put',
    controller: 'User',
    action: 'update',
    accessible: ALL_ROLES,
    log: true,
    logBody: false,
    logSuccessResult: false
  },
  // Add user
  {
    path: '/user',
    method: 'post',
    controller: 'User',
    action: 'create',
    accessible: [],
    log: true,
    logBody: false,
    logSuccessResult: false
  },
  // Show notes
  {
    path: '/notes',
    method: 'get',
    controller: 'Note',
    action: 'show',
    accessible: ALL_ROLES
  },
  // Create note
  {
    path: '/note',
    method: 'post',
    controller: 'Note',
    action: 'create',
    accessible: ALL_ROLES,
    log: true
  },
  // Update note
  {
    path: '/note/:id',
    method: 'put',
    controller: 'Note',
    action: 'update',
    accessible: ALL_ROLES,
    log: true
  },
]
