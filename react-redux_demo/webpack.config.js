module.exports = {
    devServer:{
        proxy:{
            "/api":{
                /** 目标主机 */
                target:"https://trade.aiyongtech.com",
                /** 重写路径 */
                pathRewrite:{
                    "^/api": ""         //key值将会被当成一个正则来匹配路径
                },
                changeOrigin: true
            }
        }
    }
}