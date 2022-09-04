### vxe-table 使用指南

1.  * 表格选中[autoselect: true]

![选中](https://github.com/ma1833577561/web-development-notebook/blob/master/Vue/vxe-table/images/vxe-table-select.gif)



```
<vxe-table-column field="date13" :edit-render="{name: '$input', autoselect: true}"></vxe-table-column>
```

2. * 表格合计[footer-method]

![表格合计](https://github.com/ma1833577561/web-development-notebook/blob/master/Vue/vxe-table/images/table-sum-column.gif)
```
html 

 <vxe-table class="xTable" size="mini" border  show-footer :footer-method="footerMethod" 
 :footer-cell-class-name="footerCellClassName" :data="tableData" :edit-config="{trigger: 'click', mode: 'cell',showStatus: true,}">
 // 注 这两个属性缺一不可 show-footer :footer-method="footerMethod" 

javascript
      // 合计
      footerMethod({ columns, data }) {
        // 1.效验参数
        if (!this.tableData.length) {
          return;
        }
        var dataList=[]
        // 2.准备参数
        const columnArr =['currentInvoiceMoney']
        data.map(item=>{
          if(item.disabled!=false){
            dataList.push(item)
          }
        })
        // 3.参数查找遍历
        var footerData = [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return "合计";
            }
            if (columnArr.includes(column.property)) {
              if (column.property == "currentInvoiceMoney") {
                var columnVal = this.handleSum(dataList, column.property);
                // 发票金额
                this.ruleForm.invoiceMoney = columnVal
              }
              return this.handleSum(dataList, column.property);
            }
            return " ";
          }),
        ];
        return footerData;
      },
      
       handleSum(list, field) {
        if (list.length > 0) {
          var total = 0
          for (var index = 0; index < list.length; index++) {
            total += Number(list[index][field] || 0)
          }
          return this.fmoney(total)
        }
      },
```
