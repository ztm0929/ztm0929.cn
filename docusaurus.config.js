// @ts-nocheck
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// @ts-ignore
import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '天明的数字笔记',
  tagline: '记录与分享一些信息技术、编程学习笔记',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ztm0929.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/codex-lab',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ztm0929', // Usually your GitHub org/user name.
  projectName: 'codex-lab', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'en': {
        label: 'English',
      },
      'zh-Hans': {
        label: '中文',
      },
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // breadcrumbs: false,
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '天明的数字笔记',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://wiki.ztm0929.cn', 
            label: '天明的百科全书', 
            position: 'right'},
          {
            href: 'https://github.com/ztm0929',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} ztm0929 All rights reserved.<br/>
                    <a href="https://beian.miit.gov.cn/" target="_blank" style="font-size: 0.8em; color: #888;">粤ICP备2024199605号-2</a>
                    <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank" style="font-size: 0.8em; color: #888;">粤公网安备44030002005195号</a>
                    `,  
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        }
      }
    }),
};

export default config;
