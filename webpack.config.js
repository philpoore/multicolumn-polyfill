const path = require('path')

const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = [
    {
        mode: 'development',
        target: 'web',
        entry: {
            analytics: './src/multicolumn.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'multicolumn.js',
        }
    },
    {
        mode: 'production',
        target: 'web',
        entry: {
            analytics: './src/multicolumn.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'multicolumn.min.js',
        }
    },
    {
        mode: 'production',
        target: 'web',
        entry: {
            analytics: './src/multicolumn.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'multicolumn.amd.min.js',
            libraryTarget: 'amd',
        }
    }
]
