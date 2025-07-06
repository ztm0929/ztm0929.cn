import { writeFileSync } from 'fs';
import { join } from 'path';

// 定义我们需要的仓库信息接口
interface StarredRepo {
  name: string;
  description: string | null;
  html_url: string;
}

// 定义 GitHub API 响应接口
interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
}

// 使用原生 fetch 的简单 GitHub API 测试
async function testGitHubAPI() {
  try {
    console.log('正在测试 GitHub API...');
    
    // 使用 fetch 获取公共仓库信息
    const response = await fetch('https://api.github.com/repos/octocat/Hello-World');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('API 请求成功！');
    console.log('仓库名称:', data.name);
    console.log('仓库描述:', data.description);
    console.log('Star 数量:', data.stargazers_count);
    console.log('语言:', data.language);
    console.log('创建时间:', data.created_at);
    console.log('最后更新:', data.updated_at);
    
    return data;
  } catch (error) {
    console.error('API 请求失败:', error);
    throw error;
  }
}

// 获取用户所有 starred 仓库
async function getStarredRepos() {
  const allRepos: StarredRepo[] = [];
  let page = 1;
  const perPage = 100; // GitHub API 每页最大限制
  
  try {
    console.log('开始获取 starred 仓库...');
    
    while (true) {
      console.log(`正在获取第 ${page} 页...`);
      
      const response = await fetch(
        `https://api.github.com/users/ztm0929/starred?page=${page}&per_page=${perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const repos: GitHubRepo[] = await response.json();
      
      // 如果没有更多数据，退出循环
      if (repos.length === 0) {
        break;
      }
      
      // 提取我们需要的字段
      const filteredRepos: StarredRepo[] = repos.map((repo: GitHubRepo) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url
      }));
      
      allRepos.push(...filteredRepos);
      console.log(`已获取 ${allRepos.length} 个仓库`);
      
      // 如果这一页返回的数据少于 perPage，说明已经是最后一页
      if (repos.length < perPage) {
        break;
      }
      
      page++;
      
      // 添加延迟以避免触发 API 限制
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`✅ 总共获取到 ${allRepos.length} 个 starred 仓库`);
    
    // 修复：使用 __dirname 或手动指定完整路径
    const outputPath = join(__dirname, 'starred-repos.json');
    writeFileSync(outputPath, JSON.stringify(allRepos, null, 2), 'utf-8');
    console.log(`✅ 数据已保存到: ${outputPath}`);
    
    return allRepos;
    
  } catch (error) {
    console.error('❌ 获取 starred 仓库失败:', error);
    throw error;
  }
}

// 选择要运行的测试
const testType = process.argv[2] || 'basic';

if (testType === 'starred') {
  // 获取 starred 仓库
  getStarredRepos()
    .then((repos) => {
      console.log('✅ starred 仓库获取完成');
      console.log(`总数: ${repos.length}`);
    })
    .catch(() => console.log('❌ starred 仓库获取失败'));
} else {
  // 基本测试
  testGitHubAPI()
    .then(() => console.log('✅ 基本测试完成'))
    .catch(() => console.log('❌ 基本测试失败'));
}