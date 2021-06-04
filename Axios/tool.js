const toolNormal={
		// 1数组对象去重
		unique(arr){
		  let list_obj = {}; // 声明对象
		  let list_arr = [];  // 声明空数组
		  for (var i = 0; i < arr.length; i++) {
		    if (!list_obj[arr[i].key]) {
		      list_arr.push(arr[i]);
		      list_obj[arr[i].key] = true;
		    }
		  }
		  return list_arr
		},
		// 2文本复制
		copy(val){
		   let oInput=document.createElement('input')
		   oInput.value=val
		   document.body.appendChild(oInput)
		   oInput.select();
		   document.execCommand("Copy"); // 执行浏览器复制命令
		   // 复制成功的提示信息
		   this.$message({
		     message: '复制成功',
		     type: 'success'
		   });
		   oInput.remove()
		},
		// 截取字符
		cutStr(str){//str=''100%'
			return str.substr(0,str.indexOf('%'))  // 100
		},

}

// 日期工具
const toolDate={
	/**
	 * xe-utils
	 * https://www.npmjs.com/package/xe-utils
	 * */
	 
	// 1计算日期是否大于30天
	daysDistance(newDateTime, EndDateTime) {
	   //计算两个日期之间相差的毫秒数的绝对值
	   var betweenTm = Math.abs(newDateTime - EndDateTime);
	   var judgeTm = 30 * 24 * 60 * 60 * 1000
	   var flag = Number(betweenTm) > Number(judgeTm) ? true : false
	   return flag;
	},

	// 2时间戳转换日期 flag=true 返回年月日时分秒,flag=false 返回年月日
	timestampToTime(timestamp, flag = true) {
	  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	  var Y = date.getFullYear()
	  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	  var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
	  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
	  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	  if (flag) {
	    return Y + '-' + M + '-' + D + ' ' + h + m + s
	  } else {
	    return Y + '-' + M + '-' + D
	  }
	},

	//3时间戳转当前时间
	timeNow(timestamp) {
	  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	  var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
	  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
	  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	  return h + m + s
	},

	//4时间戳转周几
	getWeekDay(s) {
	  var week
	  if (s.getDay() == 0) week = '周日'
	  if (s.getDay() == 1) week = '周一'
	  if (s.getDay() == 2) week = '周二'
	  if (s.getDay() == 3) week = '周三'
	  if (s.getDay() == 4) week = '周四'
	  if (s.getDay() == 5) week = '周五'
	  if (s.getDay() == 6) week = '周六'
	  return week
	},
	
}

// 表单规则
const toolRule={
	// 1判断是否为手机号
	isPoneAvailable(phone) {
	 var myreg = /^[1][3,5,6,7,8,9][0-9]{9}$/;
	  if (!myreg.test(phone)) {
	    return false;
	   } else {
	    return true;
	   }
	},
	isMobileW(mobile) {  
		return /^[1][3-9]\d{9}$/.test(mobile)
	},
	//邮编
	isPostcode(postcode) {
		return /^[1-9][0-9]{5}$/.test(postcode)
	},
	//银行账户
	isBankAccountNum(bankAccountNum) {
		return /^[0-9]{15,19}$/.test(bankAccountNum)
	},
	// 税号
	isTaxationNum(taxationNum) {
		return /^[a-zA-Z0-9]{15}$/.test(taxationNum)
	},
	//姓名
	isName(name) {
		return /^[\u4e00-\u9fa5]{2,15}$/.test(name)
	},
	// 昵称
	isAnotherName(anotherName) {
		return /^[\u4e00-\u9fa5,0-9,a-z,A-Z,_]{2,16}$/.test(anotherName)
	},
	// 2去除文字中的的空格
	isSpace(val){
		return val.replace(/\s+/g, "")
	},
}

// 金额
const toolMoney={
	//金额格式化
	amountFormat(str) {
		
		// 1.以小数点划分,为整数str,小数str
		let intStr = str.substring(0, str.indexOf('.')) || str.substring(0, str.length)
		let decimalStr = str.substring(str.indexOf('.') + 1, str.length) || ''
		let unitList=[
				{ unit:'千元', number:1000 },
				{ unit:'万元', number:10000 },
				{ unit:'千万元', number:10000000 },
				{ unit:'亿元', number:100000000 },
				{ unit:'万亿元', number:1000000000000 },
				{ unit:'千万亿元', number:1000000000000000 },
			]
			
		// 2.
		// 整数str长度=4 1000 千  4
		// 整数str长度=5 1 0000 万 5
		// 整数str长度=8 1000 0000 千万 8
		// 整数str长度=9 1 0000 0000 亿  9
		// 整数str长度=13 1 0000 0000 0000 万亿 13
		// 整数str长度=16 1000 0000 0000 0000 千万亿 13
		// 3.合并str
		if(intStr.length<4){
			return str+'元'
		}else if(intStr.length<5){
			return intStr/unitList[0].number+decimalStr+unitList[0].unit
		}else if(intStr.length<8){
			return intStr/unitList[1].number+decimalStr+unitList[1].unit
		}else if(intStr.length<9){
			return intStr/unitList[2].number+decimalStr+unitList[2].unit
		}else if(intStr.length<14){
			return intStr/unitList[3].number+decimalStr+unitList[3].unit
		}else if(intStr.length<16){
			return intStr/unitList[4].number+decimalStr+unitList[4].unit
		}else if(intStr.length>16){
			return intStr/unitList[5].number+decimalStr+unitList[5].unit
		}
	}
}

const rem={
	this:window,
	baseSize:32,
	setRem(){
		var scale = document.documentElement.clientWidth / 1440
		// 设置页面根节点字体大小
		document.documentElement.style.fontSize = (this.baseSize * Math.min(scale,1)) + 'px'
	},
	onresize(){
		setRem()
	},
	/**
		// 基准大小
		const baseSize = 32
		// 设置 rem 函数
		function setRem () {
			// 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
			var scale = document.documentElement.clientWidth / 1440
			// 设置页面根节点字体大小
			document.documentElement.style.fontSize = (baseSize * Math.min(scale,1)) + 'px'
		}
		// 初始化
		setRem()
		// 改变窗口大小时重新设置 rem
		window.onresize = function () {
			setRem()
		}
**/

}
export {
	toolNormal,
	toolMoney,
	toolDate,
	toolRule,
	rem
}
