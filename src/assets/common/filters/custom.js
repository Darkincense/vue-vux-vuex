/**
 * created by niujiahao on 2018/5/13
*/
/**
 * 首字母变大写，公共过滤器  alice →→→→→→→ Alice 
 * @param {*value} value 
 */

let capitalize = value => {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * 格式化时间    20180202 →→→→→→→ 2018-02-02
 * @param {*value} value 
 */
let dateServer = value => {
    var value = typeof value == "string" ? value : (value + '');

    return value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
}

export { capitalize, dateServer }