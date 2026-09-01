// 省份数据（用于地图和排名）
export const branchData = [
  // 原始数据
  // { name: '北京市', value: [116.46, 39.92, 456], vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB', alerts: 3, load: 92, projects: 45 },
  { name: '大连市', orgName: '大连市分行', vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB',  projects: 45 },
  { name: '深圳市',  vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB',  projects: 45 },
  { name: '青岛市',  vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB',  projects: 45 },
  { name: '厦门市',  vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB',  projects: 45 },
  { name: '宁波市',  vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB',  projects: 45 },
  { name: '北京市',  vm: 456, cpu: 7280, memory: '18.5 TB', storage: '384 TB',  projects: 45 },
  { name: '上海市', vm: 612, cpu: 9792, memory: '24.8 TB', storage: '512 TB',  projects: 62 },
  { name: '广东省',  vm: 528, cpu: 8448, memory: '21.1 TB', storage: '448 TB',  projects: 58 },
  { name: '四川省', vm: 384, cpu: 6144, memory: '15.4 TB', storage: '320 TB',  projects: 38 },
  { name: '重庆市',  vm: 312, cpu: 4992, memory: '12.5 TB', storage: '288 TB',  projects: 32 },
  { name: '湖北省',  vm: 428, cpu: 6848, memory: '17.1 TB', storage: '356 TB',  projects: 42 },
  { name: '陕西省',  vm: 286, cpu: 4576, memory: '11.5 TB', storage: '256 TB',  projects: 28 },
  { name: '浙江省',  vm: 398, cpu: 6368, memory: '15.9 TB', storage: '332 TB',  projects: 41 },
  { name: '江苏省', vm: 376, cpu: 6016, memory: '15.0 TB', storage: '312 TB',  projects: 39 },
  { name: '天津市', vm: 342, cpu: 5472, memory: '13.7 TB', storage: '284 TB',  projects: 35 },
  { name: '河南省',  vm: 268, cpu: 4288, memory: '10.7 TB', storage: '224 TB',  projects: 26 },
  { name: '湖南省',  vm: 254, cpu: 4064, memory: '10.2 TB', storage: '212 TB',  projects: 25 },
  { name: '山东省', vm: 242, cpu: 3872, memory: '9.7 TB', storage: '202 TB',  projects: 24 },
  { name: '辽宁省',  vm: 186, cpu: 2976, memory: '7.4 TB', storage: '156 TB',  projects: 18 },
  { name: '黑龙江省',  vm: 156, cpu: 2496, memory: '6.2 TB', storage: '130 TB',  projects: 15 },
  { name: '吉林省',  vm: 142, cpu: 2272, memory: '5.7 TB', storage: '118 TB',  projects: 14 },
  { name: '云南省',  vm: 178, cpu: 2848, memory: '7.1 TB', storage: '148 TB',  projects: 17 },
  { name: '贵州省', vm: 134, cpu: 2144, memory: '5.4 TB', storage: '112 TB',  projects: 13 },
  { name: '广西壮族自治区',  vm: 168, cpu: 2688, memory: '6.7 TB', storage: '140 TB',  projects: 16 },
  { name: '福建省', vm: 224, cpu: 3584, memory: '9.0 TB', storage: '186 TB',  projects: 22 },
  { name: '安徽省',  vm: 212, cpu: 3392, memory: '8.5 TB', storage: '176 TB',  projects: 21 },
  { name: '江西省',  vm: 198, cpu: 3168, memory: '7.9 TB', storage: '164 TB',  projects: 19 },
  { name: '山西省',  vm: 156, cpu: 2496, memory: '6.2 TB', storage: '130 TB',  projects: 15 },
  { name: '河北省',  vm: 178, cpu: 2848, memory: '7.1 TB', storage: '148 TB',  projects: 17 },
  { name: '内蒙古自治区',  vm: 98, cpu: 1568, memory: '3.9 TB', storage: '82 TB',  projects: 10 },
  { name: '甘肃省',  vm: 112, cpu: 1792, memory: '4.5 TB', storage: '94 TB', projects: 11 },
  { name: '宁夏回族自治区',  vm: 86, cpu: 1376, memory: '3.4 TB', storage: '72 TB',  projects: 8 },
  { name: '青海省',  vm: 72, cpu: 1152, memory: '2.9 TB', storage: '60 TB',  projects: 7 },
  { name: '新疆维吾尔自治区',  vm: 124, cpu: 1984, memory: '5.0 TB', storage: '104 TB',  projects: 12 },
  { name: '西藏自治区',  vm: 58, cpu: 928, memory: '2.3 TB', storage: '48 TB',  projects: 6 },
  { name: '海南省',  vm: 96, cpu: 1536, memory: '3.8 TB', storage: '80 TB',  projects: 9 }
];

// 排名数据
export const branchRankingData = {
  cpu: [
    { name: '上海市', value: 9792, unit: '核' }, { name: '广东省', value: 8448, unit: '核' },
    { name: '北京市', value: 7280, unit: '核' }, { name: '湖北省', value: 6848, unit: '核' },
    { name: '浙江省', value: 6368, unit: '核' }, { name: '四川省', value: 6144, unit: '核' },
    { name: '江苏省', value: 6016, unit: '核' }, { name: '天津市', value: 5472, unit: '核' },
    { name: '重庆市', value: 4992, unit: '核' }, { name: '陕西省', value: 4576, unit: '核' },
    { name: '河南省', value: 4288, unit: '核' }, { name: '湖南省', value: 4064, unit: '核' },
    { name: '山东省', value: 3872, unit: '核' }, { name: '福建省', value: 3584, unit: '核' },
    { name: '安徽省', value: 3392, unit: '核' }
  ],
  memory: [
    { name: '上海市', value: 24.8, unit: 'TB' }, { name: '广东省', value: 21.1, unit: 'TB' },
    { name: '北京市', value: 18.5, unit: 'TB' }, { name: '湖北省', value: 17.1, unit: 'TB' },
    { name: '浙江省', value: 15.9, unit: 'TB' }, { name: '四川省', value: 15.4, unit: 'TB' },
    { name: '江苏省', value: 15.0, unit: 'TB' }, { name: '天津市', value: 13.7, unit: 'TB' },
    { name: '重庆市', value: 12.5, unit: 'TB' }, { name: '陕西省', value: 11.5, unit: 'TB' },
    { name: '河南省', value: 10.7, unit: 'TB' }, { name: '湖南省', value: 10.2, unit: 'TB' },
    { name: '山东省', value: 9.7, unit: 'TB' }, { name: '福建省', value: 9.0, unit: 'TB' },
    { name: '安徽省', value: 8.5, unit: 'TB' }
  ],
  storage: [
    { name: '上海市', value: 512, unit: 'TB' }, { name: '广东省', value: 448, unit: 'TB' },
    { name: '北京市', value: 384, unit: 'TB' }, { name: '湖北省', value: 356, unit: 'TB' },
    { name: '浙江省', value: 332, unit: 'TB' }, { name: '四川省', value: 320, unit: 'TB' },
    { name: '江苏省', value: 312, unit: 'TB' }, { name: '重庆市', value: 288, unit: 'TB' },
    { name: '天津市', value: 284, unit: 'TB' }, { name: '陕西省', value: 256, unit: 'TB' },
    { name: '河南省', value: 224, unit: 'TB' }, { name: '湖南省', value: 212, unit: 'TB' },
    { name: '山东省', value: 202, unit: 'TB' }, { name: '福建省', value: 186, unit: 'TB' },
    { name: '安徽省', value: 176, unit: 'TB' }
  ]
};