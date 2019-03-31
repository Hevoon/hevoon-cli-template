//帮我们后处理css，优化css代码，css前缀属性等等
module.exports = {
    plugins: [
        //autoprefixer插件可以帮助我们添加一些css3属性的前缀
        require('autoprefixer')
    ]
};