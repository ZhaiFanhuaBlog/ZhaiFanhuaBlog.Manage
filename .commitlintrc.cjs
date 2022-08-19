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
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
      ],
    ],
  },
};

