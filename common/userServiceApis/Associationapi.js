//协会社团信息相关api
import Vue from 'vue'
let vm = new Vue()

// let Addresslist = "/stuinfo/associationList/"
let Addresslist = "/g1DownUploadStuInfo/"
// 社团列表，match--搜索关键词，为空字符串则搜索全部
function SearchAssociaI(match){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + Addresslist + 'gridSearch?match=' + encodeURI(match),
			method:'GET',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			dataType: 'json',
			success: (res) => {
				// console.log(res)
				if(res.errMsg == 'request:ok'){
					resolve(res.data)
					return
				}
				reject(res)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}

let AddrInfo = "/stuinfo/mAssEditShow/";
// 社团详情，AssociationID--社团ID
function AssociaInfo(AssociationID){
	return new Promise((resolve, reject)=>{
		uni.request({
			url:vm.$baseURL + AddrInfo + "formSearch",
			method:'POST',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			dataType: 'json',
			data:{
				AssociationID: AssociationID
			},
			success: (res) => {
				console.log(res)
				resolve(res['data'].data)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}

var AddrJoin = "/stuinfo/joinAssociation/";
//查询学生电话号码
function CheckStuNo(stuNo){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + AddrJoin + 'CheckStuNo?stuNo=' + stuNo,
			method: 'GET',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			dataType: 'text',
			success: (res) => {
				// console.log(res)
				resolve(res.data)
			},
			fail: (err) => {
				// console.log(err)
				reject(err)
			}
		})
	})
}
//加入社团 assID：社团ID，intro：自我介绍，stuPhone：学生电话号码
function JohnXh(assID,intro,stuPhone){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: vm.$baseURL + AddrJoin + 'JoinXh',
			method:'POST',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			data:{
				associationID: assID,
				introduction: intro,
				stuPhone: stuPhone
			},
			success: (res) => {
				console.log(res)
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}


var myJoinAddr = '/stuinfo/myJoinAssociation/'
//查询我的申请社团列表
function SearchMyJoinAss(sid){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: vm.$baseURL + myJoinAddr + 'SearchMyJoinAss?loginid=' + sid,
			method:'GET',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			success: (res) => {
				// console.log(res)
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
//查询我的申请表 sid-学生id，aid-社团id
function SearchMyThisJoin(sid, aid){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: vm.$baseURL + myJoinAddr + 'SearchMyThisJoin',
			method:'GET',
			data:{
				loginid: sid,
				AssociationID: aid
			},
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			success: (res) => {
				// console.log(res)
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
//编辑重新修改申请表 assID：社团ID，intro：自我介绍，stuPhone：学生电话号码
function editJoinXh(assID, intro, stuPhone){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: vm.$baseURL + myJoinAddr + 'editJoinXh',
			method:'POST',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN,
				'Content-Type': vm.$contentType
			},
			data:{
				associationID: assID,
				introduction: intro,
				stuPhone: stuPhone
			},
			success: (res) => {
				console.log(res)
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
const Associationapi = {
	SearchAssociaI,
	AssociaInfo,
	CheckStuNo,
	JohnXh,
	SearchMyJoinAss,
	SearchMyThisJoin,
	editJoinXh
}

module.exports = Associationapi