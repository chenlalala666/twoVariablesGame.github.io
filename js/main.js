// 二十四节气APP主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
  // 更新状态栏时间
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 60000); // 每分钟更新一次

  // 设置底部导航栏切换事件
  setupTabBarNavigation();
  
  // 设置页面间跳转
  setupPageNavigation();
  
  // 设置搜索框交互
  setupSearchInteraction();
  
  // 设置季节标签交互
  setupSeasonTags();
  
  // 设置列表项点击事件
  setupListItemClicks();
  
  // 设置返回按钮点击事件
  setupBackButtons();
  
  // 设置卡片展开/收起功能
  setupCardToggle();
});

// 更新状态栏时间
function updateStatusBarTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  
  const timeElements = document.querySelectorAll('.status-bar .time');
  timeElements.forEach(el => {
    el.textContent = timeString;
  });
}

// 设置底部导航栏切换事件
function setupTabBarNavigation() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  if (!tabItems.length) return;
  
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有active类
      tabItems.forEach(tab => tab.classList.remove('active'));
      
      // 为当前点击的添加active类
      this.classList.add('active');
      
      // 获取当前点击的标签类型
      const tabType = this.querySelector('span').textContent.trim();
      
      // 切换到对应页面
      switch(tabType) {
        case '首页':
          window.location.href = 'home.html';
          break;
        case '节气':
          window.location.href = 'jieqi_list.html';
          break;
        case '养生':
          window.location.href = 'yangsheng.html';
          break;
        case '我的':
          window.location.href = 'profile.html';
          break;
      }
    });
  });
}

// 设置搜索框交互
function setupSearchInteraction() {
  const searchInputs = document.querySelectorAll('.search-input');
  
  if (!searchInputs.length) return;
  
  searchInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.backgroundColor = '#f8f8f8';
      this.parentElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.backgroundColor = '';
      this.parentElement.style.boxShadow = '';
    });
    
    // 添加搜索功能模拟
    input.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        // 模拟搜索操作
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm) {
          // 简单的动画反馈
          this.disabled = true;
          this.value = '搜索中...';
          
          setTimeout(() => {
            this.disabled = false;
            this.value = searchTerm;
            
            // 显示搜索结果的反馈（实际应用中会显示真实结果）
            const listItems = document.querySelectorAll('.list-item');
            
            listItems.forEach(item => {
              const title = item.querySelector('.list-item-title').textContent.toLowerCase();
              const subtitle = item.querySelector('.list-item-subtitle').textContent.toLowerCase();
              
              if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
                item.style.backgroundColor = '#f0f9ff';
                setTimeout(() => {
                  item.style.backgroundColor = '';
                }, 1500);
              }
            });
          }, 500);
        }
      }
    });
  });
}

// 设置季节标签交互
function setupSeasonTags() {
  const seasonTags = document.querySelectorAll('[style*="border-radius: 20px"]');
  
  if (!seasonTags.length) return;
  
  seasonTags.forEach(tag => {
    tag.style.cursor = 'pointer';
    
    tag.addEventListener('click', function() {
      // 移除所有标签的激活样式
      seasonTags.forEach(t => {
        t.style.backgroundColor = '#e0e0e0';
        t.style.color = '#666';
      });
      
      // 设置当前标签的激活样式
      const seasonText = this.textContent.trim();
      
      if (seasonText.includes('春季')) {
        this.style.backgroundColor = 'var(--spring-color)';
        this.style.color = 'white';
        showSeasonCard('春季节气');
      } else if (seasonText.includes('夏季')) {
        this.style.backgroundColor = 'var(--summer-color)';
        this.style.color = 'white';
        showSeasonCard('夏季节气');
      } else if (seasonText.includes('秋季')) {
        this.style.backgroundColor = 'var(--autumn-color)';
        this.style.color = 'white';
        showSeasonCard('秋季节气');
      } else if (seasonText.includes('冬季')) {
        this.style.backgroundColor = 'var(--winter-color)';
        this.style.color = 'white';
        showSeasonCard('冬季节气');
      }
    });
  });
}

// 显示对应季节的节气卡片
function showSeasonCard(seasonTitle) {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const headerText = card.querySelector('h3')?.textContent;
    
    if (headerText === seasonTitle) {
      // 将选中的卡片滚动到视图
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // 添加高亮动画
      card.style.transition = 'box-shadow 0.3s ease';
      card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 1500);
    }
  });
}

// 设置列表项点击事件
function setupListItemClicks() {
  const listItems = document.querySelectorAll('.list-item');
  
  if (!listItems.length) return;
  
  listItems.forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
      // 获取列表项标题
      const title = this.querySelector('.list-item-title')?.textContent;
      
      if (title) {
        // 点击反馈
        this.style.backgroundColor = '#f5f5f5';
        
        setTimeout(() => {
          this.style.backgroundColor = '';
          
          // 如果是节气列表中的项目，跳转到详情页
          if (title.includes('(')) {
            window.location.href = 'jieqi_detail.html';
          }
        }, 150);
      }
    });
  });
}

// 设置返回按钮点击事件
function setupBackButtons() {
  const backButtons = document.querySelectorAll('.fa-arrow-left');
  
  if (!backButtons.length) return;
  
  backButtons.forEach(button => {
    const parentElement = button.parentElement;
    parentElement.style.cursor = 'pointer';
    
    parentElement.addEventListener('click', function() {
      // 点击反馈
      this.style.opacity = '0.7';
      
      setTimeout(() => {
        this.style.opacity = '1';
        window.history.back();
      }, 150);
    });
  });
}

// 设置卡片展开/收起功能
function setupCardToggle() {
  const cardHeaders = document.querySelectorAll('.card > div > .fa-chevron-down');
  
  if (!cardHeaders.length) return;
  
  cardHeaders.forEach(icon => {
    const header = icon.parentElement;
    header.style.cursor = 'pointer';
    
    // 存储季节类型
    let seasonType = '';
    if (header.textContent.includes('夏季')) {
      seasonType = 'summer';
    } else if (header.textContent.includes('秋季')) {
      seasonType = 'autumn';
    } else if (header.textContent.includes('冬季')) {
      seasonType = 'winter';
    }
    
    header.addEventListener('click', function() {
      const card = this.parentElement;
      
      // 切换箭头方向
      if (icon.classList.contains('fa-chevron-down')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        
        // 动态创建并添加内容
        const content = document.createElement('div');
        content.className = 'season-content';
        
        // 根据季节类型添加不同内容
        if (seasonType === 'summer') {
          this.style.backgroundColor = 'var(--summer-color)';
          this.style.color = 'white';
          content.innerHTML = createSummerContent();
        } else if (seasonType === 'autumn') {
          this.style.backgroundColor = 'var(--autumn-color)';
          this.style.color = 'white';
          content.innerHTML = createAutumnContent();
        } else if (seasonType === 'winter') {
          this.style.backgroundColor = 'var(--winter-color)';
          this.style.color = 'white';
          content.innerHTML = createWinterContent();
        }
        
        card.appendChild(content);
        
        // 平滑展开动画
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease';
        
        setTimeout(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
        }, 10);
      } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        
        // 重置标题样式
        this.style.backgroundColor = '#e0e0e0';
        this.style.color = '#666';
        
        // 获取内容区域
        const content = card.querySelector('.season-content');
        
        if (content) {
          // 平滑收起动画
          content.style.maxHeight = content.scrollHeight + 'px';
          
          setTimeout(() => {
            content.style.maxHeight = '0';
            
            // 动画完成后移除元素
            setTimeout(() => {
              card.removeChild(content);
            }, 300);
          }, 10);
        }
      }
    });
  });
}

// 创建夏季节气内容
function createSummerContent() {
  return `
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--summer-color); color: white;">
        <i class="fas fa-sun"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">立夏 (5月5-7日)</div>
        <div class="list-item-subtitle">夏季的第一个节气，炎暑开始</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--summer-color); color: white;">
        <i class="fas fa-wheat-awn"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">小满 (5月20-22日)</div>
        <div class="list-item-subtitle">麦类等夏熟作物籽粒开始饱满</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--summer-color); color: white;">
        <i class="fas fa-ear-listen"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">芒种 (6月5-7日)</div>
        <div class="list-item-subtitle">有芒的麦子成熟，可以播种</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
  `;
}

// 创建秋季节气内容
function createAutumnContent() {
  return `
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--autumn-color); color: white;">
        <i class="fas fa-tree"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">立秋 (8月7-9日)</div>
        <div class="list-item-subtitle">秋季的第一个节气，暑渐退</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--autumn-color); color: white;">
        <i class="fas fa-temperature-half"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">处暑 (8月22-24日)</div>
        <div class="list-item-subtitle">炎热结束，暑气消退</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--autumn-color); color: white;">
        <i class="fas fa-cloud-rain"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">白露 (9月7-9日)</div>
        <div class="list-item-subtitle">露气开始凝结，天气转凉</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
  `;
}

// 创建冬季节气内容
function createWinterContent() {
  return `
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--winter-color); color: white;">
        <i class="fas fa-snowflake"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">立冬 (11月7-8日)</div>
        <div class="list-item-subtitle">冬季的第一个节气，万物收藏</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--winter-color); color: white;">
        <i class="fas fa-icicles"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">小雪 (11月22-23日)</div>
        <div class="list-item-subtitle">气温显著下降，开始降雪</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-icon" style="background-color: var(--winter-color); color: white;">
        <i class="fas fa-wind"></i>
      </div>
      <div class="list-item-content">
        <div class="list-item-title">大雪 (12月6-8日)</div>
        <div class="list-item-subtitle">降雪量增多，气候寒冷</div>
      </div>
      <div style="color: #aaa;">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
  `;
}

// 设置页面间跳转
function setupPageNavigation() {
  // 首页-查看全部
  const viewAllLinks = document.querySelectorAll('span[style*="var(--primary-color)"]');
  
  if (viewAllLinks.length) {
    viewAllLinks.forEach(link => {
      if (link.textContent.includes('查看全部')) {
        link.style.cursor = 'pointer';
        
        link.addEventListener('click', function() {
          this.style.opacity = '0.7';
          
          setTimeout(() => {
            this.style.opacity = '1';
            window.location.href = 'jieqi_list.html';
          }, 150);
        });
      }
    });
  }
} 