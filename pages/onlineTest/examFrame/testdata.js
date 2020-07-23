var testdata = [{
		title: '请选择下列正确选项1', //题目
		src_title: '', //题目是否有图片
		isimg: 1, //1为文字 2为图片 选项
		code: 1, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'], //选项
		true_option: [0], //正确选项
		current: [0], //当前所选
		topic: true, //所选是否正确 默认为'' true为正确 控制选项高亮
		code2: false, //选项选择状态 默认为true false为选择
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案', //本题描述
		testList: [ //选项
			{
				name: '正确答案', //选项
				code: true, //是否为正确答案
				click_index: true, //选项是否选中
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			}
		]
	}, {
		title: '请选择下列正确选项2', //题目
		src_title: '', //题目是否有图片
		isimg: 1, //1为文字 2为图片 选项
		code: 1, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D', 'E'], //选项
		true_option: [1], //正确选项
		current: [3], //当前所选
		topic: false, //所选是否正确 默认为'' true为正确 控制选项高亮
		code2: false, //选项选择状态 默认为true false为选择
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案', //本题描述
		testList: [ //选项
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '正确答案',
				code: true,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: true,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			}
		]
	}, {
		title: '请选择下列正确选项3', //题目
		src_title: '', //题目是否有图片
		isimg: 1, //1为文字 2为图片 选项
		code: 2, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'], //选项
		true_option: [0, 2], //正确选项
		current: [1, 2], //当前所选
		topic: false, //所选是否正确 默认为'' true为正确 控制选项高亮
		code2: false, //选项选择状态 默认为true false为选择
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案', //本题描述
		testList: [{
				name: '正确答案',
				code: true,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: true,
			},
			{
				name: '正确答案',
				code: true,
				click_index: true,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			}
		]
	},

	{
		title: '请选择下列正确选项4',
		src_title: '../../../static/onlineTestImgs/banner02.jpg', //题目是否有图片
		code: 2, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'],
		true_option: [1, 2, 3], //正确选项
		current: [1, 2, 3], //当前所选
		topic: true,
		code2: false,
		isimg: 1, //1为文字 2为图片 选项
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案',
		testList: [{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '正确答案',
				code: true,
				click_index: true,
			},
			{
				name: '正确答案',
				code: true,
				click_index: true,
			},
			{
				name: '正确答案',
				code: true,
				click_index: true,
			}
		],
	}, {
		title: '请选择下列正确选项5', //题目
		src_title: '', //题目是否有图片
		isimg: 1, //1为文字 2为图片 选项
		code: 1, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'], //选项
		true_option: [0], //正确选项
		current: [], //当前所选
		topic: '', //所选是否正确 默认为'' true为正确 控制选项高亮
		code2: true, //选项选择状态 默认为true false为选择
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案', //本题描述
		testList: [ //选项
			{
				name: '正确答案', //选项
				code: true, //是否为正确答案
				click_index: false, //选项是否选中
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			}
		]
	}, {
		title: '请选择下列正确选项6', //题目
		src_title: '', //题目是否有图片
		isimg: 1, //1为文字 2为图片 选项
		code: 2, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D', 'E'], //选项
		true_option: [0, 2, 4], //正确选项
		current: [], //当前所选
		topic: '', //所选是否正确 默认为'' true为正确 控制选项高亮
		code2: true, //选项选择状态 默认为true false为选择
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案', //本题描述
		testList: [ //选项
			{
				name: '正确答案',
				code: true,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '正确答案',
				code: true,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '正确答案',
				code: true,
				click_index: false,
			}
		]
	}, {
		title: '请选择下列正确选项7', //题目
		src_title: '', //题目是否有图片
		isimg: 1, //1为文字 2为图片 选项
		code: 2, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'], //选项
		true_option: [1, 3], //正确选项
		current: [], //当前所选
		topic: '', //所选是否正确 默认为'' true为正确 控制选项高亮
		code2: true, //选项选择状态 默认为true false为选择
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案', //本题描述
		testList: [{
				name: '错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错',
				code: true,
				click_index: false,
			},
			{
				name: '错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错',
				code: false,
				click_index: false,
			},
			{
				name: '错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错错误答案错误答案错误答案错误答案错误答案错误答案错',
				code: true,
				click_index: false,
			}
		]
	}, {
		title: '请选择下列正确选项8',
		src_title: '', //题目是否有图片
		code: 2, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'],
		true_option: [1, 2, 3], //正确选项
		current: [], //当前所选
		topic: '',
		code2: true,
		isimg: 2, //1为文字 2为图片 选项
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案',
		testList: [{
				name: '../../../static/onlineTestImgs/banner01.jpg',
				code: false,
				click_index: false,
			},
			{
				name: '../../../static/onlineTestImgs/banner02.jpg',
				code: true,
				click_index: false,
			},
			{
				name: '../../../static/onlineTestImgs/banner03.jpg',
				code: true,
				click_index: false,
			},
			{
				name: '../../../static/onlineTestImgs/banner04.jpg',
				code: true,
				click_index: false,
			}
		],
	}, {
		title: '请选择下列正确选项9',
		src_title: '../../../static/onlineTestImgs/banner02.jpg', //题目是否有图片
		code: 2, //1为单选 2为多选
		option: ['A', 'B', 'C', 'D'],
		true_option: [1, 3], //正确选项
		current: [], //当前所选
		topic: '',
		code2: true,
		isimg: 1, //1为文字 2为图片 选项
		alt: '正确答案正确答案正确答案正确答案正确答案正确答案正确答案正确答案',
		testList: [{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '正确答案',
				code: true,
				click_index: false,
			},
			{
				name: '错误答案',
				code: false,
				click_index: false,
			},
			{
				name: '正确答案',
				code: true,
				click_index: false,
			}
		],
	}
]
export default testdata