export const suggestedPortfolioQuestions = [
  "这个作品集主要展示了什么？",
  "滴滴项目做了什么？",
  "小红书项目的亮点是什么？",
  "快手年度回忆是什么风格？",
  "洪旗会哪些技能？",
  "如何联系洪旗？"
];

const portfolioProfile = {
  fullName: "洪旗",
  tagline: "UX设计师 & AI技术爱好",
  story:
    "本科在中央美院，研究生目前在中国美院在读，经历主要包含滴滴产品实习经历、小红书和快手项目，掌握 FIGMA、AIGC 视觉生成、VIBE CODING 等技能。",
  email: "2860816256@qq.com",
  wechat: "15228718329",
  github: "meetsandellbfqgkga-del"
};

const portfolioProjects = {
  didi: {
    title: "滴滴产品实习总结",
    subtitle: "花小猪券裂变活动"
  },
  xiaohongshu: {
    title: "小红书市集体验提升",
    category: "UX设计"
  },
  kuaishou: {
    title: "快手2025年度回忆"
  }
};

export function getPortfolioKnowledgeContext(): string {
  return [
    `设计师：${portfolioProfile.fullName}`,
    `定位：${portfolioProfile.tagline}`,
    `经历与技能：${portfolioProfile.story}`,
    `联系方式：邮箱 ${portfolioProfile.email}，电话/微信 ${portfolioProfile.wechat}，GitHub ${portfolioProfile.github}`,
    `项目一：${portfolioProjects.didi.title} / ${portfolioProjects.didi.subtitle}。围绕好友助力得打车券、免单券，通过阶梯激励、即时反馈、流程优化和视觉更新服务拉新、促活与转化。`,
    `项目二：${portfolioProjects.xiaohongshu.title} / ${portfolioProjects.xiaohongshu.category}。优化小红书市集穿搭模块，提升浏览与购买链路体验，增强消费粘性并推动市集电商发展。`,
    `项目三：${portfolioProjects.kuaishou.title}。基于快手年度报告进行虚拟创作，用可爱风格化处理、质感对比和连续故事感构建轻松活泼的 H5 体验。`
  ].join("\n");
}

const includesAny = (source: string, keywords: string[]) =>
  keywords.some((keyword) => source.includes(keyword.toLowerCase()));

export function answerPortfolioQuestion(question: string): string {
  const normalized = question.trim().toLowerCase();
  if (!normalized) return "";

  if (includesAny(normalized, ["联系", "邮箱", "电话", "微信", "wechat", "email"])) {
    return `可以通过邮箱 ${portfolioProfile.email} 联系洪旗，也可以通过电话 / 微信 ${portfolioProfile.wechat} 沟通。GitHub 账号为 ${portfolioProfile.github}。`;
  }

  if (includesAny(normalized, ["技能", "会什么", "能力", "figma", "aigc", "ai", "coding"])) {
    return `洪旗是一名 ${portfolioProfile.tagline}，熟悉 FIGMA、AIGC 视觉生成和 VIBE CODING，并有产品体验、交互流程和视觉表达相关项目经历。`;
  }

  if (includesAny(normalized, ["滴滴", "花小猪", "裂变", "券", "实习"])) {
    return `${portfolioProjects.didi.title}聚焦${portfolioProjects.didi.subtitle}。项目围绕“好友助力得打车券 / 免单券”，通过阶梯式激励、即时反馈、流程优化和视觉更新，降低用户参与门槛，并服务拉新、促活与消费转化。`;
  }

  if (includesAny(normalized, ["小红书", "市集", "穿搭", "电商", "购买"])) {
    return `${portfolioProjects.xiaohongshu.title}是一个${portfolioProjects.xiaohongshu.category}项目，目标是优化小红书市集穿搭模块相关界面，提升浏览与购买链路体验，增强消费粘性并推动市集电商发展。`;
  }

  if (includesAny(normalized, ["快手", "年度", "回忆", "h5", "虚拟", "生成"])) {
    return `${portfolioProjects.kuaishou.title}基于快手年度报告进行虚拟创作，通过可爱的风格化处理、不同质感对比和连续故事感，构建轻松活泼、有代入感的 H5 体验。`;
  }

  if (includesAny(normalized, ["是谁", "介绍", "经历", "教育", "学校", "关于", "洪旗"])) {
    return `${portfolioProfile.fullName}是${portfolioProfile.tagline}。${portfolioProfile.story}`;
  }

  return "这个作品集主要展示洪旗的 UX / UI / AIGC 相关项目：滴滴花小猪券裂变活动、小红书市集穿搭体验提升，以及快手 2025 年度回忆 H5 虚拟创作。你可以继续问我某个项目、技能或联系方式。";
}
