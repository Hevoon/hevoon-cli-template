module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/strongly-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "window": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        //加强eslint对babel的支持
        "parser": "babel-eslint"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // 改成字符串必须由单引号括起来而不是双引号，'string'不报错，"string"报错
        "quotes": [
            "error",
            "single"
        ],
        // 改成代码结尾不再加分号，加了分号报错，不加分号不报错
        "semi": [
            "error",
            "never"
        ],
        //限制最大空行数2行
        "no-multiple-empty-lines": [2, {max: 1}],
        //限制每一行的最大语句数量，默认一句
        "max-statements-per-line": 2,
        //禁止行尾空格
        "no-trailing-spaces": 2,
        //禁止属性前面有空格
        "no-whitespace-before-property": 2,
        //强制缩进为2格空格
        "indent": [2, 4],
        //在数组开括号后和闭括号前强制换行
        "array-bracket-newline": 2,
        //强制数组之间的空格相同
        "array-bracket-spacing": 2,
        //强制在对象字面量的属性中键和值之间使用一致的间距
        "key-spacing": 2,
        //强制在关键字前后使用一致的空格
        "keyword-spacing": 2,
        //强制一致的换行风格
        "linebreak-style": 2,
        //禁止使用多个空格
        "no-multi-spaces": 2
    }
};