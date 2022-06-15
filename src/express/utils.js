export const log = console.log

export function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}
