Ext.define('module.custom.komec.sale.order.saleorder.view.SaleOrderListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-saleorder-lister-detail2',
	store		: 'module.custom.komec.sale.order.saleorder.store.SaleOrderDetail2',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType : 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{ text : 'test' , action:'test' , cls: 'button-style'},										// DXF -> PNG TEST
					'->', '->','->','->','->','->','->',
					{	text : '<span class="write-button">상담입력</span>', action : 'consultingAction', cls: 'button1-style'},
					 '-',
					{	text : '<span class="write-button">결과입력</span>', action : 'resultAction', cls: 'button1-style'	},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width :  50 , align : 'center'
					},{	dataIndex: 'cnsl_dttm'		, text : Language.get('cnsl_dttm'		,'일시')		, width : 135 , align : 'center'
					},{	dataIndex: 'cstm_dept_name'	, text : Language.get('cstm_dept_name'	,'고객부서명')	, width : 100 , align : 'left'
					},{	dataIndex: 'cstm_drtr_name'	, text : Language.get('cstm_drtr_name'	,'고객담당자명')	, width : 100 , align : 'left'
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'상담자명')	, width : 100 , align : 'left'
					},{	dataIndex: 'cnsl_cont'		, text : Language.get('cnsl_cont'		,'상담내용')	, width : 500 , align : 'left'
					},{	dataIndex: 'rply_reqt_yorn'	, text : Language.get('rply_reqt_yorn'	,'회신요청여부')	, width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn')
					},{	dataIndex: 'rply_mthd_dvcd'	, text : Language.get('rply_mthd_dvcd'	,'회신방법')	, width :  90 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('rply_mthd_dvcd')
					},{	dataIndex: 'rply_dttm'		, text : Language.get('rply_dttm'		,'회신일시')	, width : 135 , align : 'center'
					},{	dataIndex: 'rply_cont'		, text : Language.get('rply_cont'		,'회신내용')	, width : 500 , align : 'left'
					},{	dataIndex: 'cost_yorn'		, text : Language.get('cost_yorn'		,'원가')		, width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn'), hidden : true
					},{	dataIndex: 'dsig_yorn'		, text : Language.get('dsig_yorn'		,'설계')		, width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn') , hidden : true
					},{	dataIndex: 'puch_yorn'		, text : Language.get('puch_yorn'		,'구매')		, width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn') , hidden : true
					},{	dataIndex: 'otod_yorn'		, text : Language.get('otod_yorn'		,'외주')		, width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn') , hidden : true
					},{	dataIndex: 'prod_yorn'		, text : Language.get('prod_yorn'		,'생산')		, width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn') , hidden : true
					}
				]
			}
		;
		return item;
	}
});