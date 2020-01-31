const path = require("path");

const webpack = require("webpack");



module.exports = {

  entry: "./src/index.js",

  mode: "development",

  module: {

    rules: [

      {

        test: /\.(js|jsx)$/,

        exclude: /(node_modules|bower_components)/,

        loader: "babel-loader",

        options: { presets: [["@babel/env", {"targets": "> 5%"}]], "plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-object-rest-spread", ["@babel/transform-react-jsx", { "pragma": "createUN" }]] }

      },

      {

        test: /\.css$/,

        use: ["style-loader", "css-loader"]

      },

      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }

    ]

  },

  resolve: { extensions: ["*", ".js", ".jsx"] },

  output: {

    path: path.resolve(__dirname, "dist/"),

    publicPath: "/dist/",

    filename: "bundle.js"

  },

  devServer: {

    contentBase: path.join(__dirname, "public/"),

    port: 3000,

    publicPath: "http://localhost:3000/dist/",

    hotOnly: true

  },

  plugins: [new webpack.HotModuleReplacementPlugin()]

};