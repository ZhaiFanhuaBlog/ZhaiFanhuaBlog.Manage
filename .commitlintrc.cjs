module.exports = {
  // 忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // 按照传统消息格式来验证
  extends: ['@commitlint/config-conventional', '@commitlint/cz-commitlint'],
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
  },
  prompt: {
    settings: {},
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    questions: {
      type: {
        description: "选择要提交的更改类型：",
        enum: {
          feat: {
            description: '新增功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '错误修复',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档更改',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '不影响代码含义的更改（空白、格式、缺少分号等）',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '既不修复bug也不添加功能的代码更改',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '提高性能的代码更改',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或更正现有测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '影响构建系统或外部依赖关系的更改（示例范围：gulp、Brocoli、npm）',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: '更改CI配置文件和脚本（示例范围：Travis、Circle、BrowserStack、SauceLabs）',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "不修改src或测试文件的其他更改",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '还原以前的提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          '此更改的范围是什么（例如组件或文件名）？',
      },
      subject: {
        description: '写一个简短的、命令式的变化描述',
      },
      body: {
        description: '提供更改的详细说明',
      },
      isBreaking: {
        description: '有什么突破性的变化吗？',
      },
      breakingBody: {
        description: '破坏性更改提交需要一个主体。请输入提交本身的较长描述',
      },
      breaking: {
        description: '描述中断的变化',
      },
      isIssueAffected: {
        description: '此更改是否影响任何未决问题？',
      },
      issuesBody: {
        description: '如果问题已解决，则提交需要一个主体。请输入提交本身的较长描述',
      },
      issues: {
        description: '添加问题参考（例如，“修复#123”、“重新35123”）',
      },
    },
  },
};

