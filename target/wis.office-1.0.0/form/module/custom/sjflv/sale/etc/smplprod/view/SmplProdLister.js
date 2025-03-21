Ext.define('module.custom.sjflv.sale.etc.smplprod.view.SmplProdLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-smplprod-lister'			,
	store		: 'module.custom.sjflv.sale.etc.smplprod.store.SmplProd'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'->', '-' ,
					{	text : '<span class="write-button">생산실적 등록</span>'	, action : 'prodAction'		, cls: 'button1-style', width : 90},
					'->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: ''		, text : Language.get(''	,'상태')		, width : 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'접수일자')	, width : 90	, align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'접수번호')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'변경찻수')	, width : 80	, xtype :'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd'),align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'거래처코드')	, width : 80	, align : 'left'
					},{	dataIndex: ''		, text : Language.get(''	,'거래처명')	, width : 140	, align : 'right'
					},{	dataIndex: ''		, text : Language.get(''	,'거래처담당자')	, width : 80	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: ''		, text : Language.get(''	,'전화번호')	, width : 100	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: ''		, text : Language.get(''	,'요청납기일')	, width : 90	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: ''		, text : Language.get(''	,'담당자명')	, width : 80	, align : 'center',xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex: ''		, text : Language.get(''	,'품목코드')	, width : 80	, align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'품명')		, width : 200	, align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'규격')		, width : 80	, align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'품목메모')	, width : 80	, align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'요청수량')	, width : 80	, align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'무상여부')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'공급가')		, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'부가세')		, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'합격금액')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'생산일자')	, width : 90
					},{	dataIndex: ''		, text : Language.get(''	,'생산담당')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'생산수량')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'출고일자')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'출고담당')	, width : 80
					},{	dataIndex: ''		, text : Language.get(''	,'출고수량')	, width : 80
					}
				]
			}
		;
		return item;
	}
});
