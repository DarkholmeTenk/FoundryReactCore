const path = require('path');

module.exports = (env, argv) => {
    let dev = argv.mode === "development"
    let babelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [["@babel/preset-react", {"runtime": "automatic"}]],
            plugins: ["@babel/plugin-proposal-export-default-from", "@babel/plugin-syntax-class-properties"]
        }
    }
    let loaders = [babelLoader]
    if(dev) {
        babelLoader.options.plugins.push("react-hot-loader/babel")
        loaders.push({loader: "react-hot-loader-loader"})
    }
    return {
        entry: path.resolve(__dirname, './src/index.js'),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: loaders
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js',
            library: 'FoundryReactCore'
        },
        devServer: {
            contentBase: path.resolve(__dirname, './dist'),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
        },
        devtool: "source-map",
        externals: {"react": "React", "react-dom": "ReactDOM"}
    }
};