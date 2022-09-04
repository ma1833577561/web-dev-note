const path = require('path');
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin');
const WebpackBar = require('webpackbar');
const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
    productionSourceMap: false,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        port: 9999,
        host: '0.0.0.0',
        https: false,
        open: true
    },

    chainWebpack: (config) => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => {
            let rule = config.module.rule('less').oneOf(type)
            rule.use('style-resource')
                .loader('style-resources-loader')
                .options({
                    patterns: [path.resolve(__dirname, './lessVariates.less')]
                });
        });

        config.resolve.alias
            .set('@', resolve('src')) 
            .set('api', resolve('src/apis'))
            .set('common', resolve('src/common'))

        config.module.rule('images').use('url-loader')
            .tap(options => ({
                name: './assets/images/[name].[ext]',
                quality: 85,
                limit: 0,
                esModule: false,
            }));

        config.module.rule('svg')
            .test(/.svg$/)
            .include.add(resolve('src/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader');

        config.plugin('define').tap(args => [{
            ...args, 
            "window.isDefine": JSON.stringify(true)
        }]);

        // 生产环境配置
        if (process.env.NODE_ENV === 'production') {
            config.output.filename('./js/[name].[chunkhash:8].js');
            config.output.chunkFilename('./js/[name].[chunkhash:8].js');
            config.plugin('extract-css').tap(args => [{
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }]);
            config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version : '1.0.0'}]);
            config.plugin('webpackBar').use(WebpackBar);

            config.optimization.minimize(true)
                .minimizer('terser')
                .tap(args => {
                    let { terserOptions } = args[0];
                    terserOptions.compress.drop_console = true;
                    terserOptions.compress.drop_debugger = true;
                    return args
                });
            config.optimization.splitChunks({
                cacheGroups: {
                    common: {
                        name: 'common',
                        chunks: 'all',
                        minSize: 1,
                        minChunks: 2,
                        priority: 1
                    },
                    vendor: {
                        name: 'chunk-libs',
                        chunks: 'all',
                        test: /[\/]node_modules[\/]/,
                        priority: 10
                    }
                }
            });
        }
    }
};