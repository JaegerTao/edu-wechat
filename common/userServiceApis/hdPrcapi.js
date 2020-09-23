//学生办事指南api
import Vue from 'vue'
let vm = new Vue()

let Addr = "/stuinfo/stuGuide/"
let AddrGShow = '/stuinfo/stuGuideShow/'
//分页搜索,flagAddr: showList-分页列表 search-分页搜索列表,page:页码，keyWord:关键词
async function ulFenSearch(flagAddr, page, keyWord){
	let pageSize = 10
	return new Promise((resolve, reject)=>{
		uni.request({
			url:vm.$baseURL + Addr + flagAddr,
			method:'POST',
			header:{
				'Content-Type': vm.$contentType,
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			data:{
				page: page,
				PageSize: pageSize,
				keyWord: keyWord
			},
			success: (res) => {
				// console.log(res)
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					reject('err')
				}
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
//添加一次查看记录
async function addSeeCnt(AddNo){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + Addr + 'addSeeCnt',
			method:'POST',
			header:{
				'Content-Type': vm.$contentType,
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			data:{
				AddNo: AddNo
			},
			success: (res) => {
				if(res.data.msg == '成功'){
					resolve(res.data.data)
				}else{
					reject(res)
				}
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
//获取具体指南内容
async function showGuideCon(AddNo){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + AddrGShow + 'showGuideCon',
			method:'POST',
			header:{
				'Content-Type': vm.$contentType,
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			data:{
				AddNo: AddNo
			},
			success: (res) => {
				// console.log(res)
				resolve(res.data.data)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}

async function addLikeCnt(AddNo){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + AddrGShow + 'addLikeCnt',
			method:'POST',
			header:{
				'Content-Type': vm.$contentType,
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			data:{
				AddNo: AddNo
			},
			success: (res) => {
				if(res.data.msg == '成功'){
					resolve(res.data.data)
				}else{
					reject(res)
				}
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}

let hdprcapi = {
	ulFenSearch: ulFenSearch,
	addSeeCnt: addSeeCnt,
	showGuideCon: showGuideCon,
	addLikeCnt: addLikeCnt
}

module.exports = hdprcapi