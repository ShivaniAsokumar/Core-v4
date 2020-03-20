const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409
}

const MEMBERSHIP_STATE = {
  BANNED: -2,
  PENDING: -1,
  NON_MEMBER: 0,
  MEMBER: 1,
  OFFICER: 2,
  ADMIN: 3
}

const DEFAULT_PHOTO_URL =
  'https://sce.engr.sjsu.edu/wp-content/uploads/2016/04/SCE_sq.png';

module.exports = {
  STATUS_CODES,
  DEFAULT_PHOTO_URL,
  MEMBERSHIP_STATE
}
