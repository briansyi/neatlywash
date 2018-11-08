const config = { //could be a google key(firebase)
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'test_test11',
        DATABASE: 'mongodb://localhost:27017/neatlyWashDB'
    }
}

exports.get = function get (env) {
    return config[env] || config.default
}