module.exports = {
    // 单行代码字符数限制
    printWidth: 80,
    // tab键缩进相当于2个空格
    tabWidth: 2,
    // 行缩进使用空格
    useTabs: false,
    // 语句的末尾不加分号
    semi: false,
    // 使用单引号
    singleQuote: true,
    //仅仅当必须的时候才会加上双引号
    quoteProps: 'as-needed',
    // 在 JSX 中使用单引号
    jsxSingleQuote: true,
    // 尾逗号
    trailingComma: 'all',
    //在括号和对象的文字之间加上一个空格
    bracketSpacing: true,
    // 当箭头函数中只有一个参数的时候忽略括弧   
    arrowParens: 'avoid',
    // vue template 中的结束标签结尾尖括号掉到了下一行
    htmlWhitespaceSensitivity: 'ignore',
    // .vue 文件，不缩进 <script> 和 <style> 里的内容
    vueIndentScriptAndStyle: false,
};