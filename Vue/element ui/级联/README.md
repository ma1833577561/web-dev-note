
### Cascader 级联选择器 使用

![Cascader 级联选择器](https://github.com/ma1833577561/web-development-notebook/blob/master/Vue/element%20ui/%E7%BA%A7%E8%81%94/images/1232021781321232.gif)


```
<template>
<el-cascader
 style="min-width:305px"
 :props="sendeAddressProps"
  v-model="ruleForm.sendeDetailAddress"
  placeholder="请选择省/市/区"
  @change="addressChange"
  clearable
/>
</template>
<script>
export default {
 data() {
  return {
    sendeAddressProps:{
      lazy: true,
      lazyLoad: this.queryAddress,
    },
    // this.queryAddress 自定的方法
    provinceList:[],//省
    cityList:[],//市
    countyList:[],//区

  }
 },
 methods:{
 
  // 查询地址
  queryAddress(node,resolve){
    if(!node){ return false }
       const { level } = node;
       if(level == 0){
          this.findProvince(node,resolve)
       }else if(level ==1){
           const provinceId = node.data.value;
           if(!provinceId) return resolve()
           this.findCity(resolve,provinceId,node)
       } else if(level ==2){
           const cityId = node.data.value;
           if(!cityId) return resolve()
           this.findCounty(resolve,cityId,node)
       }  
    },
    
    // 查询所有省份
    findProvince(node,resolve){
      let module = this.$baseUrl.sv_express
      let params = {}
      let url = '/express/areaAction_findProvince.do'
      this.$Api.post(module,url,params).then(res=>{
      console.log('省份数据信息===========',res)
         let state = res.state;
         let data = res.data ;
         if (state == "success") {
             if(data.length !=0){
               this.provinceList=data
               resolve(
                 data.map((val) => {
                 // [42,43] 只需要展示一级的省份
                 // areaId是[42,43]的共性特征
                  if([42,43].includes(val.areaId)){
                      return {
                       value: val.areaId,
                       label: val.areaName,
                       leaf: true
                     };
                   } else {
                     return {
                       value: val.areaId,
                       label: val.areaName,
                       leaf: false
                     };
                   }
                 })
               );
             }else{
               this.provinceList=[]
             }
           } else {
             this.$alert(data||'操作失败', '警告信息', {
                 confirmButtonText: '确定',
                 callback: action => {
                   console.log(data)
                 }
             });
           }
         }).catch(err=>{console.log(err)})
      },
      
      // 查询省份下的市
      findCity(resolve,provinceId,node){
         let module = this.$baseUrl.sv_express
         let params = {
           parentId:provinceId
         }
         let url = '/express/areaAction_findCity.do'
         this.$Api.post(module,url,params).then(res=>{
           console.log('市数据信息===========',res)
           let state = res.state;
           let data = res.data ;
           if (state == "success") {
             if(data.length !=0){
               this.cityList=data
               resolve(
                 data.map((val) => {
                   console.log('val', val)
                   // [1,2,3,4] 只需要展示两级的城市
                   // parentId 这个是[1,2,3,4]他们相同的共性特征
                   if([1,2,3,4].includes(val.parentId)){
                      return {
                       value: val.areaId,
                       label: val.areaName,
                       leaf: true
                     };
                   } else {
                     return {
                       value: val.areaId,
                       label: val.areaName,
                       leaf: false
                     };
                   }
                 })
               );
             }else{
               this.cityList=[]
             }
           } else {
             this.$alert(data||'操作失败', '警告信息', {
                 confirmButtonText: '确定',
                 callback: action => {
                   console.log(data)
                 }
             });
           }
         }).catch(err=>{console.log(err)})
      },
      
      // 查询省份下的区
      findCounty(resolve,cityId,node){
        // console.log('区数据信息===========',resolve,cityId)
         let module = this.$baseUrl.sv_express
         let params = {
           parentId:cityId
         }
         let url = '/express/areaAction_findCounty.do'
         this.$Api.post(module,url,params).then(res=>{
           console.log('区数据信息===========',res)
           let state = res.state;
           let data = res.data ;
           if (state == "success") {
             if(data.length !=0){
               this.countyList=data
               resolve(
                 data.map((val) => {
                   return {
                     value: val.areaId,
                     label: val.areaName,
                     leaf: true
                   };
                 })
               );
             }else{
               this.countyList=[]
             }
           } else {
             this.$alert(data||'操作失败', '警告信息', {
                 confirmButtonText: '确定',
                 callback: action => {
                   console.log(data)
                 }
             });
           }
         }).catch(err=>{console.log(err)})
      },
 }
 
}
</script>
注：如果展示更多级亦可采用以上方法arr.includes(val)
  1.在queryAddress方法 添加要展示或处理几级
  2.arr在请求数据时进行选择针对性的判断。
  3.val采用上级或者本级之间特有的共性来进行处理会方便许多
```

