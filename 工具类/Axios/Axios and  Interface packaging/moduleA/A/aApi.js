import { get, post, postJson, getXML, exportExcel,downLoad} from '@/api/http.js'
import baseUrl from '@/api/base.js'

const A={
	// 查询生成退货单
	 findOrderCwth(params) {
		 //return post(域名 + 地址, 参数)
	   return post(baseUrl.psi_po + '/order/orderCwthAction_findOrderCwth.do', params)
	 },
	 // 退货单审核
	 cwtWfInApproval(params,data) {
	   return postJson(baseUrl.psi_po + '/order/orderCwthAction_wfInApproval.do', params,data)
	 },
	 // 视图列表
	 RequestionAction_getxml(params) {
	   return getXML(baseUrl.pattern_e83 + '/pattern/RequestionAction_getxml.do', params)
	 },
	 //项目附件-列表
	 businessAffixActionList(params){
	   return get(baseUrl.fa_finance + "/finance/businessAffixAction_list.do", params) 
	 },
	 //销售订单 导出
	 orderSheetViewAction_exportToExcel(fileName, params) {
	   return exportExcel(baseUrl.psi_po + '/order/orderSheetViewAction_exportToExcel.do', fileName, params)
	 },
	 //项目附件-下载附件
	 downLoadFileAction(params){
	   return downLoad(baseUrl.m3+ '/file/downLoadFileAction.do', params)
	 },
}
export default A
