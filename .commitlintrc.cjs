module.exports = {
  // 忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // 按照传统消息格式来验证
  extends: ['@commitlint/config-conventional'],
  // 自定义解析器
  // https://commitlint.js.org/#/reference-configuration?id=parser-presets
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved',
      ],
      issuePrefixes: ['#'],
      noteKeywords: ['BREAKING CHANGE', '不兼容变更'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      warn() { },
      mergePattern: null,
      mergeCorrespondence: null,
    },
  },
  // 自定义提交消息规则
  rules: {
    // body以空白行开头
    'body-leading-blank': [2, 'always'],
    // footer以空白行开头
    'footer-leading-blank': [1, 'always'],
    // header的最大长度
    'header-max-length': [2, 'always', 108],
    // subject为空
    'subject-empty': [2, 'never'],
    // type为空
    'type-empty': [2, 'never'],
    // type的类型
    'type-enum': [
      2,
      'always',
      [
        // 新增功能
        'feat',
        // 修复bug
        'fix',
        // 优化相关，比如提升性能、体验
        'perf',
        // 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        'style',
        // 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
        'docs',
        // 测试用例，包括单元测试、集成测试等
        'test',
        // 代码重构，没有加新功能或者修复bug
        'refactor',
        // 影响项目构建或依赖项修改
        'build',
        // 持续集成相关文件修改
        'ci',
        // 改变构建流程、或者增加依赖库、工具等
        'chore',
        // 回滚到上一个版本
        'revert',
        // 正在开发中
        'wip',
        // 工作流相关文件修改
        'workflow',
        // 类型定义文件修改
        'types',
      ],
    ],
  },
};

