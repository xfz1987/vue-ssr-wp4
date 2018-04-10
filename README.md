# VUE-SSR

## wepback配置需要说明的地方
1.在开发环境中，想使用热更新，需要安装vue-style-loader,并且替换style-loader，否则css样式无法热更新
```
{
    test: /\.css$/,
    use: [
        {loader: 'vue-style-loader'},//style-loader
        {loader:'css-loader',options:{minimize: false, importLoaders:1}},
        {loader: 'postcss-loader',options:{sourceMap:true, config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
    ]
},
```

2.开发过程中要eslint
eslint
eslint-config-standard
eslint-loader
eslint-plugin-html
eslint-plugin-import
eslint-plugin-node
eslint-plugin-promise
eslint-plugin-standard
```
{
    "extends": "standard",
    plugins: [
        "html"
    ],
    "parser": "babel-eslint"
}
```

3.git commit时自动eslint
> git init
> npm i -D husky
> package.json >  "precommit": "npm run eslint-fix"