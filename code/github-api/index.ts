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

// 运行测试
testGitHubAPI()
  .then(() => console.log('✅ 测试完成'))
  .catch(() => console.log('❌ 测试失败'));