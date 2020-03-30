/* 
 * @file config-overrides.js
 * @author Qi Wu(sgsnif@gmail.com)
 * 基于customize和react-app-rewired的定制化配置文件
*/

//从customize-cra引入一些相关的方法
const { 
    override,
    addLessLoader 
} = require('customize-cra')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true
    })
)
