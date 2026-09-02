// 省份数据 - 使用DataV地图标准名称（完整名称）
const branchData = [
    { name: '北京市', value: [116.46, 39.92, 456], vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB', alerts: 3, load: 92, projects: 45 },
    { name: '上海市', value: [121.48, 31.22, 612], vm: 612, cpu: 9792, memory: '24.8 TB', storage: '512 TB', alerts: 2, load: 85, projects: 62 },
    { name: '广东省', value: [113.23, 23.16, 528], vm: 528, cpu: 8448, memory: '21.1 TB', storage: '448 TB', alerts: 1, load: 78, projects: 58 },
    { name: '四川省', value: [104.06, 30.67, 384], vm: 384, cpu: 6144, memory: '15.4 TB', storage: '320 TB', alerts: 1, load: 55, projects: 38 },
    { name: '重庆市', value: [106.54, 29.59, 312], vm: 312, cpu: 4992, memory: '12.5 TB', storage: '288 TB', alerts: 0, load: 48, projects: 32 },
    { name: '湖北省', value: [114.31, 30.52, 428], vm: 428, cpu: 6848, memory: '17.1 TB', storage: '356 TB', alerts: 2, load: 72, projects: 42 },
    { name: '陕西省', value: [108.95, 34.27, 286], vm: 286, cpu: 4576, memory: '11.5 TB', storage: '256 TB', alerts: 0, load: 42, projects: 28 },
    { name: '浙江省', value: [120.19, 30.26, 398], vm: 398, cpu: 6368, memory: '15.9 TB', storage: '332 TB', alerts: 1, load: 68, projects: 41 },
    { name: '江苏省', value: [118.78, 32.04, 376], vm: 376, cpu: 6016, memory: '15.0 TB', storage: '312 TB', alerts: 0, load: 62, projects: 39 },
    { name: '天津市', value: [117.2, 39.13, 342], vm: 342, cpu: 5472, memory: '13.7 TB', storage: '284 TB', alerts: 1, load: 58, projects: 35 },
    { name: '河南省', value: [113.65, 34.76, 268], vm: 268, cpu: 4288, memory: '10.7 TB', storage: '224 TB', alerts: 0, load: 45, projects: 26 },
    { name: '湖南省', value: [112.94, 28.23, 254], vm: 254, cpu: 4064, memory: '10.2 TB', storage: '212 TB', alerts: 1, load: 58, projects: 25 },
    { name: '山东省', value: [117.0, 36.65, 242], vm: 242, cpu: 3872, memory: '9.7 TB', storage: '202 TB', alerts: 0, load: 48, projects: 24 },
    { name: '辽宁省', value: [121.62, 38.92, 186], vm: 186, cpu: 2976, memory: '7.4 TB', storage: '156 TB', alerts: 0, load: 38, projects: 18 },
    { name: '黑龙江省', value: [126.63, 45.75, 156], vm: 156, cpu: 2496, memory: '6.2 TB', storage: '130 TB', alerts: 0, load: 35, projects: 15 },
    { name: '吉林省', value: [125.35, 43.88, 142], vm: 142, cpu: 2272, memory: '5.7 TB', storage: '118 TB', alerts: 0, load: 32, projects: 14 },
    { name: '云南省', value: [102.73, 25.04, 178], vm: 178, cpu: 2848, memory: '7.1 TB', storage: '148 TB', alerts: 0, load: 42, projects: 17 },
    { name: '贵州省', value: [106.71, 26.57, 134], vm: 134, cpu: 2144, memory: '5.4 TB', storage: '112 TB', alerts: 0, load: 38, projects: 13 },
    { name: '广西壮族自治区', value: [108.33, 22.84, 168], vm: 168, cpu: 2688, memory: '6.7 TB', storage: '140 TB', alerts: 0, load: 45, projects: 16 },
    { name: '福建省', value: [119.3, 26.08, 224], vm: 224, cpu: 3584, memory: '9.0 TB', storage: '186 TB', alerts: 0, load: 52, projects: 22 },
    { name: '安徽省', value: [117.27, 31.86, 212], vm: 212, cpu: 3392, memory: '8.5 TB', storage: '176 TB', alerts: 0, load: 55, projects: 21 },
    { name: '江西省', value: [115.89, 28.68, 198], vm: 198, cpu: 3168, memory: '7.9 TB', storage: '164 TB', alerts: 0, load: 48, projects: 19 },
    { name: '山西省', value: [112.55, 37.87, 156], vm: 156, cpu: 2496, memory: '6.2 TB', storage: '130 TB', alerts: 0, load: 42, projects: 15 },
    { name: '河北省', value: [114.48, 38.03, 178], vm: 178, cpu: 2848, memory: '7.1 TB', storage: '148 TB', alerts: 0, load: 45, projects: 17 },
    { name: '内蒙古自治区', value: [111.65, 40.82, 98], vm: 98, cpu: 1568, memory: '3.9 TB', storage: '82 TB', alerts: 0, load: 28, projects: 10 },
    { name: '甘肃省', value: [103.73, 36.03, 112], vm: 112, cpu: 1792, memory: '4.5 TB', storage: '94 TB', alerts: 0, load: 32, projects: 11 },
    { name: '宁夏回族自治区', value: [106.27, 38.47, 86], vm: 86, cpu: 1376, memory: '3.4 TB', storage: '72 TB', alerts: 0, load: 25, projects: 8 },
    { name: '青海省', value: [101.74, 36.56, 72], vm: 72, cpu: 1152, memory: '2.9 TB', storage: '60 TB', alerts: 0, load: 22, projects: 7 },
    { name: '新疆维吾尔自治区', value: [87.68, 43.77, 124], vm: 124, cpu: 1984, memory: '5.0 TB', storage: '104 TB', alerts: 0, load: 35, projects: 12 },
    { name: '西藏自治区', value: [91.11, 29.97, 58], vm: 58, cpu: 928, memory: '2.3 TB', storage: '48 TB', alerts: 0, load: 18, projects: 6 },
    { name: '海南省', value: [110.35, 20.02, 96], vm: 96, cpu: 1536, memory: '3.8 TB', storage: '80 TB', alerts: 0, load: 28, projects: 9 }
];

// 省份坐标映射 - 使用完整省份名称匹配地图
const chinaGeoCoordMap = {
    '北京市': [116.46, 39.92],
    '上海市': [121.48, 31.22],
    '广东省': [113.23, 23.16],
    '四川省': [104.06, 30.67],
    '重庆市': [106.54, 29.59],
    '湖北省': [114.31, 30.52],
    '陕西省': [108.95, 34.27],
    '浙江省': [120.19, 30.26],
    '江苏省': [118.78, 32.04],
    '天津市': [117.2, 39.13],
    '河南省': [113.65, 34.76],
    '湖南省': [112.94, 28.23],
    '山东省': [117.0, 36.65],
    '辽宁省': [121.62, 38.92],
    '黑龙江省': [126.63, 45.75],
    '吉林省': [125.35, 43.88],
    '云南省': [102.73, 25.04],
    '贵州省': [106.71, 26.57],
    '广西壮族自治区': [108.33, 22.84],
    '福建省': [119.3, 26.08],
    '安徽省': [117.27, 31.86],
    '江西省': [115.89, 28.68],
    '山西省': [112.55, 37.87],
    '河北省': [114.48, 38.03],
    '内蒙古自治区': [111.65, 40.82],
    '甘肃省': [103.73, 36.03],
    '宁夏回族自治区': [106.27, 38.47],
    '青海省': [101.74, 36.56],
    '新疆维吾尔自治区': [87.68, 43.77],
    '西藏自治区': [91.11, 29.97],
    '海南省': [110.35, 20.02]
};

let chinaMapChart = null;
let branchRankingChart = null;
let currentRankingType = 'cpu';
let rankingAutoSwitchInterval = null;

const branchRankingData = {
    cpu: [
        { name: '上海市', value: 9792, unit: '核', fullName: 'CPU核心' },
        { name: '广东省', value: 8448, unit: '核', fullName: 'CPU核心' },
        { name: '北京市', value: 7280, unit: '核', fullName: 'CPU核心' },
        { name: '湖北省', value: 6848, unit: '核', fullName: 'CPU核心' },
        { name: '浙江省', value: 6368, unit: '核', fullName: 'CPU核心' },
        { name: '四川省', value: 6144, unit: '核', fullName: 'CPU核心' },
        { name: '江苏省', value: 6016, unit: '核', fullName: 'CPU核心' },
        { name: '天津市', value: 5472, unit: '核', fullName: 'CPU核心' },
        { name: '重庆市', value: 4992, unit: '核', fullName: 'CPU核心' },
        { name: '陕西省', value: 4576, unit: '核', fullName: 'CPU核心' },
        { name: '河南省', value: 4288, unit: '核', fullName: 'CPU核心' },
        { name: '湖南省', value: 4064, unit: '核', fullName: 'CPU核心' },
        { name: '山东省', value: 3872, unit: '核', fullName: 'CPU核心' },
        { name: '福建省', value: 3584, unit: '核', fullName: 'CPU核心' },
        { name: '安徽省', value: 3392, unit: '核', fullName: 'CPU核心' },
        { name: '辽宁省', value: 3168, unit: '核', fullName: 'CPU核心' },
        { name: '河北省', value: 2848, unit: '核', fullName: 'CPU核心' },
        { name: '云南省', value: 2848, unit: '核', fullName: 'CPU核心' },
        { name: '黑龙江省', value: 2496, unit: '核', fullName: 'CPU核心' },
        { name: '山西省', value: 2496, unit: '核', fullName: 'CPU核心' }
    ],
    memory: [
        { name: '上海市', value: 24.8, unit: 'TB', fullName: '内存容量' },
        { name: '广东省', value: 21.1, unit: 'TB', fullName: '内存容量' },
        { name: '北京市', value: 18.5, unit: 'TB', fullName: '内存容量' },
        { name: '湖北省', value: 17.1, unit: 'TB', fullName: '内存容量' },
        { name: '浙江省', value: 15.9, unit: 'TB', fullName: '内存容量' },
        { name: '四川省', value: 15.4, unit: 'TB', fullName: '内存容量' },
        { name: '江苏省', value: 15.0, unit: 'TB', fullName: '内存容量' },
        { name: '天津市', value: 13.7, unit: 'TB', fullName: '内存容量' },
        { name: '重庆市', value: 12.5, unit: 'TB', fullName: '内存容量' },
        { name: '陕西省', value: 11.5, unit: 'TB', fullName: '内存容量' },
        { name: '河南省', value: 10.7, unit: 'TB', fullName: '内存容量' },
        { name: '湖南省', value: 10.2, unit: 'TB', fullName: '内存容量' },
        { name: '山东省', value: 9.7, unit: 'TB', fullName: '内存容量' },
        { name: '福建省', value: 9.0, unit: 'TB', fullName: '内存容量' },
        { name: '安徽省', value: 8.5, unit: 'TB', fullName: '内存容量' },
        { name: '辽宁省', value: 7.9, unit: 'TB', fullName: '内存容量' },
        { name: '河北省', value: 7.1, unit: 'TB', fullName: '内存容量' },
        { name: '云南省', value: 7.1, unit: 'TB', fullName: '内存容量' },
        { name: '黑龙江省', value: 6.2, unit: 'TB', fullName: '内存容量' },
        { name: '山西省', value: 6.2, unit: 'TB', fullName: '内存容量' }
    ],
    storage: [
        { name: '上海市', value: 512, unit: 'TB', fullName: '存储容量' },
        { name: '广东省', value: 448, unit: 'TB', fullName: '存储容量' },
        { name: '北京市', value: 384, unit: 'TB', fullName: '存储容量' },
        { name: '湖北省', value: 356, unit: 'TB', fullName: '存储容量' },
        { name: '浙江省', value: 332, unit: 'TB', fullName: '存储容量' },
        { name: '四川省', value: 320, unit: 'TB', fullName: '存储容量' },
        { name: '江苏省', value: 312, unit: 'TB', fullName: '存储容量' },
        { name: '重庆市', value: 288, unit: 'TB', fullName: '存储容量' },
        { name: '天津市', value: 284, unit: 'TB', fullName: '存储容量' },
        { name: '陕西省', value: 256, unit: 'TB', fullName: '存储容量' },
        { name: '河南省', value: 224, unit: 'TB', fullName: '存储容量' },
        { name: '湖南省', value: 212, unit: 'TB', fullName: '存储容量' },
        { name: '山东省', value: 202, unit: 'TB', fullName: '存储容量' },
        { name: '福建省', value: 186, unit: 'TB', fullName: '存储容量' },
        { name: '安徽省', value: 176, unit: 'TB', fullName: '存储容量' },
        { name: '辽宁省', value: 164, unit: 'TB', fullName: '存储容量' },
        { name: '河北省', value: 148, unit: 'TB', fullName: '存储容量' },
        { name: '云南省', value: 148, unit: 'TB', fullName: '存储容量' },
        { name: '黑龙江省', value: 130, unit: 'TB', fullName: '存储容量' },
        { name: '山西省', value: 130, unit: 'TB', fullName: '存储容量' }
    ]
};

function initApp() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    animateCounters();
    animateDonutCharts();

    initChinaMap();
    initBranchRankingChart();
    initRealtimeAlerts();
    
    initRankingTabs();
    startRankingAutoSwitch();
    
    initBranchMetricTabs();
    startBranchMetricAutoSwitch();
    
    // 启动省份自动切换
    setTimeout(() => {
        startProvinceRotation();
    }, 2000);
    
    window.addEventListener('resize', handleResize);
}

// 省份自动切换相关变量
let currentProvinceIndex = -1;
let provinceRotationInterval = null;
let provinceFlashTimeout = null;
let provinceActiveTimeout = null;
let provinceProgressInterval = null;

// 获取唯一省份列表（去重）
function getUniqueProvinces() {
    const seen = new Set();
    return branchData.filter(item => {
        if (seen.has(item.name)) return false;
        seen.add(item.name);
        return true;
    });
}

// 启动省份轮换
function startProvinceRotation() {
    const uniqueProvinces = getUniqueProvinces();
    if (uniqueProvinces.length === 0) return;
    
    // 立即显示第一个省份
    switchToNextProvince(uniqueProvinces);
    
    // 每8秒切换一次
    provinceRotationInterval = setInterval(() => {
        switchToNextProvince(uniqueProvinces);
    }, 8000);
}

// 切换到下一个省份
function switchToNextProvince(uniqueProvinces) {
    // 清除之前的状态
    clearProvinceState();
    
    // 随机选择下一个省份（避免重复）
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * uniqueProvinces.length);
    } while (nextIndex === currentProvinceIndex && uniqueProvinces.length > 1);
    
    currentProvinceIndex = nextIndex;
    const provinceData = uniqueProvinces[nextIndex];
    
    // 更新省份详情面板
    updateProvinceDetailPanel(provinceData);
    
    // 高亮地图上的省份
    highlightProvinceOnMap(provinceData.name);
    
    // 闪烁1.5秒后常亮
    startProvinceFlashing(provinceData.name);
    
    provinceFlashTimeout = setTimeout(() => {
        stopProvinceFlashing(provinceData.name);
        startProvinceActive(provinceData.name);
        
        // 6.5秒后结束常亮（总共8秒）
        provinceActiveTimeout = setTimeout(() => {
            stopProvinceActive(provinceData.name);
        }, 6500);
    }, 1500);
    
    // 进度条动画
    startProgressBarAnimation();
}

// 清除省份状态
function clearProvinceState() {
    if (provinceFlashTimeout) {
        clearTimeout(provinceFlashTimeout);
        provinceFlashTimeout = null;
    }
    if (provinceActiveTimeout) {
        clearTimeout(provinceActiveTimeout);
        provinceActiveTimeout = null;
    }
    if (provinceProgressInterval) {
        clearInterval(provinceProgressInterval);
        provinceProgressInterval = null;
    }
}

// 更新省份详情面板
function updateProvinceDetailPanel(provinceData) {
    const overlay = document.getElementById('provinceInfoOverlay');
    const nameEl = document.getElementById('provinceInfoName');
    const statusEl = document.getElementById('provinceInfoStatus');
    const vmEl = document.getElementById('provinceInfoVM');
    const memoryEl = document.getElementById('provinceInfoMemory');
    const storageEl = document.getElementById('provinceInfoStorage');
    const projectsEl = document.getElementById('provinceInfoProjects');
    
    // 简化省份名称显示（去掉"省"、"市"、"自治区"等后缀）
    const displayName = provinceData.name.replace(/省|市|自治区|回族|维吾尔|壮族/g, '');
    
    if (nameEl) nameEl.textContent = displayName;
    if (statusEl) {
        statusEl.textContent = '切换中...';
        statusEl.classList.remove('active');
    }
    if (vmEl) vmEl.textContent = provinceData.vm;
    if (memoryEl) memoryEl.textContent = provinceData.memory;
    if (storageEl) storageEl.textContent = provinceData.storage;
    if (projectsEl) projectsEl.textContent = provinceData.projects;
    
    // 激活面板样式
    if (overlay) overlay.classList.add('active');
}

// 在地图上高亮省份 - 使用ECharts的dispatchAction
function highlightProvinceOnMap(provinceName) {
    if (!chinaMapChart) return;
    
    // 先取消所有高亮
    chinaMapChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
    });
    
    // 高亮指定省份
    chinaMapChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        name: provinceName
    });
}

// 取消地图上的高亮
function downplayProvinceOnMap(provinceName) {
    if (!chinaMapChart) return;
    
    chinaMapChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        name: provinceName
    });
}

// 开始省份闪烁效果 - 使用dispatchAction实现
function startProvinceFlashing(provinceName) {
    // 更新状态显示
    const statusEl = document.getElementById('provinceInfoStatus');
    if (statusEl) {
        statusEl.textContent = '切换中...';
        statusEl.classList.remove('active');
    }
    
    // 在地图上闪烁效果
    if (!chinaMapChart) return;
    
    let flashCount = 0;
    const maxFlashes = 10; // 1.5秒内闪烁10次（高亮+取消=一个周期）
    
    const flashInterval = setInterval(() => {
        if (flashCount >= maxFlashes) {
            clearInterval(flashInterval);
            return;
        }
        
        // 交替高亮和取消高亮
        if (flashCount % 2 === 0) {
            highlightProvinceOnMap(provinceName);
        } else {
            downplayProvinceOnMap(provinceName);
        }
        
        flashCount++;
    }, 150); // 150ms间隔，总共约1.5秒
}

// 停止省份闪烁
function stopProvinceFlashing(provinceName) {
    // 取消高亮
    downplayProvinceOnMap(provinceName);
}

// 开始省份常亮
function startProvinceActive(provinceName) {
    // 更新状态显示
    const statusEl = document.getElementById('provinceInfoStatus');
    if (statusEl) {
        statusEl.textContent = '监控中';
        statusEl.classList.add('active');
    }
    
    // 确保地图上的省份保持高亮状态
    highlightProvinceOnMap(provinceName);
}

// 停止省份常亮
function stopProvinceActive(provinceName) {
    const overlay = document.getElementById('provinceInfoOverlay');
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    // 取消地图省份高亮
    downplayProvinceOnMap(provinceName);
    
    // 重置进度条
    const progressBar = document.getElementById('provinceInfoProgressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

// 进度条动画
function startProgressBarAnimation() {
    const progressBar = document.getElementById('provinceInfoProgressBar');
    if (!progressBar) return;
    
    let progress = 0;
    const duration = 8000; // 8秒
    const interval = 100; // 每100ms更新一次
    const step = 100 / (duration / interval);
    
    progressBar.style.width = '0%';
    
    provinceProgressInterval = setInterval(() => {
        progress += step;
        if (progress >= 100) {
            progress = 100;
            clearInterval(provinceProgressInterval);
        }
        progressBar.style.width = progress + '%';
    }, interval);
}

function updateDateTime() {
    const now = new Date();
    const dateEl = document.getElementById('currentDate');
    const timeEl = document.getElementById('currentTime');
    
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };
    dateEl.textContent = now.toLocaleDateString('zh-CN', options);
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}:${seconds}`;
}

function animateDonutCharts() {
    const circumference = 150.8; // 2 * Math.PI * 24
    const donuts = document.querySelectorAll('.donut-progress');
    donuts.forEach(donut => {
        const percent = parseFloat(donut.getAttribute('data-percent'));
        const targetOffset = circumference * (1 - percent / 100);
        setTimeout(() => {
            donut.style.strokeDashoffset = targetOffset;
        }, 400);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;
            
            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

async function initChinaMap() {
    const chartDom = document.getElementById('chinaMap');
    chinaMapChart = echarts.init(chartDom);
    
    try {
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        const chinaJson = await response.json();
        echarts.registerMap('china', chinaJson);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(10, 20, 35, 0.95)',
                borderColor: '#00ffcc',
                borderWidth: 1,
                padding: [12, 16],
                textStyle: {
                    color: '#e8f4f8',
                    fontSize: 12
                },
                formatter: function(params) {
                    if (params.seriesType === 'effectScatter') {
                        const data = params.data;
                        return `
                            <div style="font-family: 'Orbitron', monospace; font-size: 14px; font-weight: 600; color: #00ffcc; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(0,255,204,0.2);">
                                ${data.name}
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #8ba4b4;">虚机数量</span>
                                <span style="color: #e8f4f8; font-weight: 500;">${data.vm} 台</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #8ba4b4;">CPU核心</span>
                                <span style="color: #e8f4f8; font-weight: 500;">${data.cpu.toLocaleString()} 核</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #8ba4b4;">内存容量</span>
                                <span style="color: #e8f4f8; font-weight: 500;">${data.memory}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #8ba4b4;">存储容量</span>
                                <span style="color: #e8f4f8; font-weight: 500;">${data.storage}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #8ba4b4;">告警数量</span>
                                <span style="color: ${data.alerts > 0 ? '#ff4757' : '#00ff88'}; font-weight: 500;">${data.alerts} 条</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                <span style="color: #8ba4b4;">负载率</span>
                                <span style="color: ${data.load > 80 ? '#ff4757' : data.load > 50 ? '#ffaa00' : '#00ff88'}; font-weight: 500;">${data.load}%</span>
                            </div>
                        `;
                    }
                    return params.name;
                }
            },
            series: [{
                type: 'map',
                map: 'china',
                roam: false,
                layoutCenter: ['50%', '50%'],
                layoutSize: '95%',
                label: {
                    show: false
                },
                itemStyle: {
                    areaColor: 'rgba(20, 35, 55, 0.8)',
                    borderColor: 'rgba(0, 255, 204, 0.3)',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: {
                        areaColor: 'rgba(0, 255, 204, 0.6)',
                        borderColor: '#00ffcc',
                        borderWidth: 3,
                        shadowColor: 'rgba(0, 255, 204, 0.8)',
                        shadowBlur: 20
                    },
                    label: {
                        show: true,
                        color: '#00ffcc',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                select: {
                    itemStyle: {
                        areaColor: 'rgba(0, 255, 204, 0.2)'
                    }
                },
                data: branchData.map(item => ({
                    name: item.name,
                    value: item.value[2],
                    itemStyle: {
                        areaColor: 'rgba(20, 35, 55, 0.8)',
                        borderColor: 'rgba(0, 255, 204, 0.3)',
                        borderWidth: 1
                    }
                }))
            }]
        };
        
        chinaMapChart.setOption(option);
        
        // 调试：打印地图中的省份名称
        const mapNames = chinaJson.features.map(f => f.properties.name);
        console.log('Map features:', mapNames);
        console.log('Branch data names:', branchData.map(b => b.name));
        
        // 检查名称匹配情况
        const branchNames = branchData.map(b => b.name);
        const matched = branchNames.filter(name => mapNames.includes(name));
        const unmatched = branchNames.filter(name => !mapNames.includes(name));
        console.log('Matched provinces:', matched);
        console.log('Unmatched provinces:', unmatched);
        
    } catch (error) {
        console.error('Failed to load China map:', error);
        chartDom.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #8ba4b4;">地图加载中...</div>';
    }
}

function initBranchRankingChart() {
    const chartDom = document.getElementById('branchRankingChart');
    branchRankingChart = echarts.init(chartDom);
    
    updateRankingChart('cpu');
}

function updateRankingChart(type) {
    if (!branchRankingChart) return;
    
    const data = branchRankingData[type];
    const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 15);
    
    const typeNames = {
        cpu: 'CPU核心数',
        memory: '内存容量',
        storage: '存储容量'
    };
    
    const typeUnits = {
        cpu: '核',
        memory: 'TB',
        storage: 'TB'
    };
    
    const typeColors = {
        cpu: ['#002200', '#003311', '#004422', '#005533', '#006644', '#007755', '#008866', '#009977', '#00aa88', '#00bb99', '#00ccaa', '#00ddbb', '#00ffcc', '#00e6b8', '#00cca3', '#00b38f', '#00997a', '#008066', '#006652', '#004a3e'],
        memory: ['#001412', '#002425', '#003438', '#00444b', '#00545f', '#006473', '#007487', '#00849b', '#0094af', '#00a4c3', '#00b4d7', '#00c4eb', '#00d4ff', '#00aadd', '#0099cc', '#0088bb', '#0077aa', '#006699', '#005588', '#004477'],
        storage: ['#000044', '#000055', '#050066', '#0a0570', '#13107e', '#201b8c', '#2d269a', '#3a31a8', '#473cb6', '#5447c4', '#6152d2', '#6e5de0', '#7b68ee', '#7700ff', '#6600ee', '#5500dd', '#4400cc', '#3300bb', '#2200aa', '#110099']
    };
    
    const maxValue = sortedData[0].value;
    
    const titleEl = document.getElementById('rankingTitle');
    titleEl.textContent = `分行${typeNames[type]}排名 TOP 15`;
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            top: 5,
            right: 72,
            bottom: 5,
            left: 95
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(10, 20, 35, 0.95)',
            borderColor: '#00ffcc',
            borderWidth: 1,
            textStyle: {
                color: '#e8f4f8',
                fontSize: 11
            },
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                const item = params[0];
                const value = item.value;
                const isDecimal = value % 1 !== 0;
                const displayValue = isDecimal ? value.toFixed(1) : value.toLocaleString();
                const unit = typeUnits[type];
                return '<div style="font-weight: 600; color: #00ffcc; margin-bottom: 4px;">' + item.name + '</div>' +
                       '<div style="color: #e8f4f8;">' + typeNames[type] + ': <span style="color: #00ffcc; font-weight: 600;">' + displayValue + ' ' + unit + '</span></div>';
            }
        },
        xAxis: {
            type: 'value',
            max: maxValue * 1.15,
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 255, 204, 0.1)'
                }
            },
            axisLabel: {
                color: '#6a8a9a',
                fontSize: 13,
                formatter: function(value) {
                    if (value >= 1000) {
                        return (value / 1000).toFixed(0) + 'K';
                    }
                    return value;
                }
            }
        },
        yAxis: {
            type: 'category',
            data: sortedData.map(item => item.name).reverse(),
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 255, 204, 0.2)'
                }
            },
            axisLabel: {
                color: '#c0d8e8',
                fontSize: 20,
                interval: 0,
                hideOverlap: false,
                rich: {
                    rank: {
                        color: '#00ffcc',
                        fontWeight: 'bold',
                        fontSize: 20,
                        width: 28
                    },
                    name: {
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: 20
                    }
                },
                formatter: function(value, index) {
                    const rank = sortedData.length - index;
                    if (rank <= 3) {
                        return `{rank|${rank}} {name|${value}}`;
                    }
                    return ` ${rank} ${value}`;
                }
            }
        },
        series: [{
            type: 'bar',
            data: sortedData.slice().reverse().map((item, index) => ({
                value: item.value,
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 1, y2: 0,
                        colorStops: [
                            { offset: 0, color: typeColors[type][index] },
                            { offset: 1, color: typeColors[type][index] + '88' }
                        ]
                    },
                    borderRadius: [0, 3, 3, 0]
                }
            })),
            barWidth: '55%',
            label: {
                show: true,
                position: 'right',
                color: '#00ffcc',
                fontSize: 20,
                fontWeight: 'bold',
                formatter: function(params) {
                    const value = params.value;
                    const isDecimal = value % 1 !== 0;
                    const displayValue = isDecimal ? value.toFixed(1) : value.toLocaleString();
                    const unit = typeUnits[type];
                    return displayValue + ' ' + unit;
                }
            },
            emphasis: {
                itemStyle: {
                    shadowColor: 'rgba(0, 255, 204, 0.5)',
                    shadowBlur: 10
                }
            }
        }]
    };
    
    branchRankingChart.setOption(option, true);
}

function initRankingTabs() {
    const tabs = document.querySelectorAll('.ranking-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            switchRankingType(type);
        });
    });
}

function switchRankingType(type) {
    currentRankingType = type;
    
    const tabs = document.querySelectorAll('.ranking-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-type') === type) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    updateRankingChart(type);
}

function startRankingAutoSwitch() {
    const types = ['cpu', 'memory', 'storage'];
    let currentIndex = 0;
    
    rankingAutoSwitchInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % types.length;
        switchRankingType(types[currentIndex]);
    }, 5000);
}

function initCloudPlatformChart() {
    const chartDom = document.getElementById('cloudPlatformChart');
    cloudPlatformChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(10, 20, 35, 0.95)',
            borderColor: '#00ffcc',
            borderWidth: 1,
            textStyle: {
                color: '#e8f4f8',
                fontSize: 11
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 10,
            right: 10,
            bottom: 25,
            left: 40
        },
        xAxis: {
            type: 'category',
            data: ['阿里云', '腾讯云', '华为云', 'AWS', 'Azure', '私有云', '混合云', '其他'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 255, 204, 0.2)'
                }
            },
            axisLabel: {
                color: '#5a7a8a',
                fontSize: 10,
                rotate: 30
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 255, 204, 0.1)'
                }
            },
            axisLabel: {
                color: '#5a7a8a',
                fontSize: 10
            }
        },
        series: [{
            type: 'bar',
            data: [
                { value: 680, itemStyle: { color: '#00ffcc' } },
                { value: 520, itemStyle: { color: '#00d4ff' } },
                { value: 480, itemStyle: { color: '#7b68ee' } },
                { value: 320, itemStyle: { color: '#00ff88' } },
                { value: 280, itemStyle: { color: '#ffaa00' } },
                { value: 420, itemStyle: { color: '#ff6b6b' } },
                { value: 180, itemStyle: { color: '#a8e6cf' } },
                { value: 67, itemStyle: { color: '#88d8b0' } }
            ],
            barWidth: '50%',
            itemStyle: {
                borderRadius: [4, 4, 0, 0]
            }
        }]
    };
    
    cloudPlatformChart.setOption(option);
}

function initRealtimeAlerts() {
    renderRealtimeAlerts();
    renderBranchProjectRanking();
    setInterval(updateRealtimeAlerts, 5000);
}

const BRANCH_METRIC_ORDER = ['projects', 'appHosts', 'dbHosts', 'workerNodes'];

const branchMetricLabels = {
    projects: '项目数量',
    appHosts: '应用类主机数量',
    dbHosts: '数据库主机数量',
    workerNodes: 'Worker Node 数量'
};

const branchMetricRankings = {
    projects: [
        { name: '北京', value: 28 },
        { name: '上海', value: 25 },
        { name: '广东', value: 23 },
        { name: '江苏', value: 20 },
        { name: '浙江', value: 18 },
        { name: '山东', value: 16 },
        { name: '四川', value: 15 },
        { name: '河南', value: 14 },
        { name: '湖北', value: 13 },
        { name: '湖南', value: 12 },
        { name: '福建', value: 11 },
        { name: '安徽', value: 10 },
        { name: '河北', value: 9 },
        { name: '陕西', value: 8 },
        { name: '重庆', value: 7 }
    ],
    appHosts: [
        { name: '上海', value: 3120 },
        { name: '广东', value: 2890 },
        { name: '北京', value: 2650 },
        { name: '浙江', value: 2380 },
        { name: '江苏', value: 2240 },
        { name: '四川', value: 1980 },
        { name: '湖北', value: 1850 },
        { name: '山东', value: 1720 },
        { name: '福建', value: 1580 },
        { name: '河南', value: 1460 },
        { name: '湖南', value: 1320 },
        { name: '安徽', value: 1240 },
        { name: '河北', value: 1100 },
        { name: '陕西', value: 980 },
        { name: '重庆', value: 860 }
    ],
    dbHosts: [
        { name: '北京', value: 420 },
        { name: '广东', value: 395 },
        { name: '上海', value: 380 },
        { name: '江苏', value: 340 },
        { name: '浙江', value: 318 },
        { name: '山东', value: 285 },
        { name: '四川', value: 260 },
        { name: '湖北', value: 242 },
        { name: '河南', value: 220 },
        { name: '福建', value: 198 },
        { name: '湖南', value: 185 },
        { name: '河北', value: 168 },
        { name: '安徽', value: 155 },
        { name: '陕西', value: 142 },
        { name: '重庆', value: 128 }
    ],
    workerNodes: [
        { name: '广东', value: 1850 },
        { name: '上海', value: 1720 },
        { name: '北京', value: 1650 },
        { name: '浙江', value: 1580 },
        { name: '江苏', value: 1520 },
        { name: '四川', value: 1380 },
        { name: '山东', value: 1290 },
        { name: '湖北', value: 1210 },
        { name: '河南', value: 1120 },
        { name: '福建', value: 1050 },
        { name: '湖南', value: 980 },
        { name: '安徽', value: 920 },
        { name: '河北', value: 840 },
        { name: '陕西', value: 780 },
        { name: '重庆', value: 710 }
    ]
};

let currentBranchMetric = 'projects';
let branchMetricRotateIndex = 0;
let branchMetricAutoSwitchInterval = null;

function switchBranchMetric(metric) {
    if (!branchMetricRankings[metric]) return;
    currentBranchMetric = metric;
    branchMetricRotateIndex = BRANCH_METRIC_ORDER.indexOf(metric);
    if (branchMetricRotateIndex < 0) branchMetricRotateIndex = 0;

    const container = document.querySelector('.branch-project-ranking');
    if (container) {
        container.querySelectorAll('.branch-metric-tab').forEach(tab => {
            if (tab.getAttribute('data-metric') === metric) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    renderBranchProjectRanking();
}

function renderBranchProjectRanking() {
    const rankingList = document.getElementById('branchProjectRanking');
    if (!rankingList) return;

    const data = branchMetricRankings[currentBranchMetric];
    if (!data || !data.length) return;

    const sorted = [...data].sort((a, b) => b.value - a.value);
    const top15 = sorted.slice(0, 10);
    const maxValue = top15[0].value || 1;

    const titleEl = document.getElementById('branchProjectRankingTitle');
    if (titleEl) {
        titleEl.textContent = `分行${branchMetricLabels[currentBranchMetric]}排名 TOP 10`;
    }

    rankingList.innerHTML = top15.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        return `
            <div class="ranking-item ${rankClass}" style="animation-delay: ${index * 0.05}s">
                <div class="ranking-name">${item.name}</div>
                <div class="ranking-bar-container">
                    <div class="ranking-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="ranking-value">${item.value.toLocaleString()}</div>
            </div>
        `;
    }).join('');
}

function initBranchMetricTabs() {
    const container = document.querySelector('.branch-project-ranking');
    if (!container) return;

    container.querySelectorAll('.branch-metric-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const metric = this.getAttribute('data-metric');
            switchBranchMetric(metric);
        });
    });
}

function startBranchMetricAutoSwitch() {
    branchMetricAutoSwitchInterval = setInterval(() => {
        branchMetricRotateIndex = (branchMetricRotateIndex + 1) % BRANCH_METRIC_ORDER.length;
        switchBranchMetric(BRANCH_METRIC_ORDER[branchMetricRotateIndex]);
    }, 5000);
}

const cloudAlertTemplates = [
    { level: 'critical', name: '合肥电信托管云1', message: 'CPU使用率超过90%' },
    { level: 'warning', name: '合肥电信托管云2', message: '内存使用率超过80%' },
    { level: 'info', name: '廊坊电信托管云', message: '存储容量达到75%' },
    { level: 'critical', name: '合肥电信托管云1', message: '网络延迟超过100ms' },
    { level: 'warning', name: '合肥电信托管云2', message: '磁盘IO性能下降' },
    { level: 'info', name: '廊坊电信托管云', message: '虚拟机迁移完成' },
];

const branchAlertTemplates = [
    { level: 'warning', name: '上海', message: '负载均衡器异常' },
    { level: 'info', name: '北京', message: '备份任务执行成功' },
    { level: 'critical', name: '广东', message: '数据库连接超时' },
    { level: 'warning', name: '江苏', message: '数据库连接数接近上限' },
    { level: 'info', name: '浙江', message: '系统更新完成' },
    { level: 'warning', name: '山东', message: '网络带宽不足' },
];

let cloudAlerts = [];
let branchAlerts = [];

function renderRealtimeAlerts() {
    const cloudList = document.getElementById('cloudAlertList');
    const branchList = document.getElementById('branchAlertList');
    if (!cloudList || !branchList) return;
    
    cloudAlerts = generateRandomAlerts(cloudAlertTemplates, 4);
    branchAlerts = generateRandomAlerts(branchAlertTemplates, 4);
    
    cloudList.innerHTML = cloudAlerts.map((alert, index) => `
        <div class="alert-item ${alert.level}" style="animation-delay: ${index * 0.1}s">
            <div class="alert-level"></div>
            <div class="alert-content">
                <span class="alert-name">${alert.name}</span>
                <span class="alert-desc">${alert.message}</span>
            </div>
        </div>
    `).join('');
    
    branchList.innerHTML = branchAlerts.map((alert, index) => `
        <div class="alert-item ${alert.level}" style="animation-delay: ${index * 0.1}s">
            <div class="alert-level"></div>
            <div class="alert-content">
                <span class="alert-name">${alert.name}</span>
                <span class="alert-desc">${alert.message}</span>
            </div>
        </div>
    `).join('');
    
    updateAlertCounts();
}

function generateRandomAlerts(templates, count) {
    const shuffled = [...templates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function updateAlertCounts() {
    const allAlerts = [...cloudAlerts, ...branchAlerts];
    const critical = allAlerts.filter(a => a.level === 'critical').length;
    const warning = allAlerts.filter(a => a.level === 'warning').length;
    const info = allAlerts.filter(a => a.level === 'info').length;
    
    const criticalEl = document.getElementById('criticalCount');
    const warningEl = document.getElementById('warningCount');
    const infoEl = document.getElementById('infoCount');
    
    if (criticalEl) criticalEl.textContent = critical;
    if (warningEl) warningEl.textContent = warning;
    if (infoEl) infoEl.textContent = info;
}

function updateRealtimeAlerts() {
    if (Math.random() > 0.7) {
        cloudAlerts = generateRandomAlerts(cloudAlertTemplates, 4);
        branchAlerts = generateRandomAlerts(branchAlertTemplates, 4);
        
        const cloudList = document.getElementById('cloudAlertList');
        const branchList = document.getElementById('branchAlertList');
        
        if (cloudList) {
            cloudList.innerHTML = cloudAlerts.map((alert, index) => `
                <div class="alert-item ${alert.level}" style="animation-delay: ${index * 0.1}s">
                    <div class="alert-level"></div>
                    <div class="alert-content">
                        <span class="alert-name">${alert.name}</span>
                        <span class="alert-desc">${alert.message}</span>
                    </div>
                </div>
            `).join('');
        }
        
        if (branchList) {
            branchList.innerHTML = branchAlerts.map((alert, index) => `
                <div class="alert-item ${alert.level}" style="animation-delay: ${index * 0.1}s">
                    <div class="alert-level"></div>
                    <div class="alert-content">
                        <span class="alert-name">${alert.name}</span>
                        <span class="alert-desc">${alert.message}</span>
                    </div>
                </div>
            `).join('');
        }
        
        updateAlertCounts();
    }
}

function handleResize() {
    if (chinaMapChart) chinaMapChart.resize();
    if (branchRankingChart) branchRankingChart.resize();
}

document.addEventListener('DOMContentLoaded', initApp);

const style = document.createElement('style');
style.textContent = `
    .network-card {
        cursor: pointer;
    }
    
    .network-card:hover .network-name {
        text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
    }
    
    .stat-card:hover .stat-value {
        text-shadow: 0 0 15px rgba(0, 255, 204, 0.8);
    }
    
    .resource-card:hover .resource-value {
        text-shadow: 0 0 15px rgba(0, 255, 204, 0.8);
    }
    
    @keyframes dataGlow {
        0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 204, 0.3); }
        50% { box-shadow: 0 0 15px rgba(0, 255, 204, 0.6); }
    }
    
    .stat-card:hover, .resource-card:hover, .network-card:hover {
        animation: dataGlow 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);
