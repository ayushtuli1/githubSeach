const path = require("path");
const webpack = require("webpack");

const buildConfig = {
  app: {
    entry: {
      App: path.resolve(__dirname + "/../src/index.js")
    },
    output: {
      filename: "bundle.js",
      path: path.join(__dirname, "/../dist/"),
      publicPath: "/"
    },
    contentBase: path.join(__dirname, "/../dist"),
    indexHtmlFile: path.join(__dirname, "/../src/index.html"),
    port: 8082,
    assetPrefix: "app"
  }
};

const moduleConfig = buildConfig.app;

module.exports = {
  entry: moduleConfig.entry,
  output: moduleConfig.output,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: moduleConfig.assetPrefix + "/images",
              publicPath: "/" + moduleConfig.assetPrefix + "/images/",
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              paths: [path.resolve(__dirname, "src")]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: moduleConfig.assetPrefix + "/fonts",
              publicPath: "/" + moduleConfig.assetPrefix + "/fonts/",
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "source-map",
  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: true,
    port: moduleConfig.port,
    contentBase: moduleConfig.contentBase,
    after: app => {
      app.get("*", (req, res) => {
        res.sendFile(moduleConfig.indexHtmlFile);
      });
    }
  }
};
