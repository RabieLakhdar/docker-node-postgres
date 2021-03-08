const jwt = require("jsonwebtoken")
const {
    createError,
    FORBIDDEN,
} = require('../helpers/error_helper');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, 'secret')
        req.userData = decoded
        next()
    } catch (error) {

        return next(createError({
            status: FORBIDDEN,
            message: error,
        }))
    }
}
