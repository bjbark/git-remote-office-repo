Ext.define('module.custom.sjflv.mtrl.imp.orderlist.view.OrderListMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-orderlist-master2',
	store		: 'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListMaster2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
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
					'-',
					'->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 70 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 120 , align : 'left'
					},{	dataIndex: 'item_hscd'	, text : Language.get('item_hscd'	,'HS Code'	) , width : 100 , align : 'left'
					},{	dataIndex: 'bzpl_name'	, text : Language.get('bzpl_name'	,'사업장'		) , width : 80 , align : 'left'
					},{	dataIndex: ''	, text : Language.get(''	,'Vendor'	) , width  : 80 , align : 'left'
					},{	dataIndex: ''	, text : Language.get(''	,'상태'		) , width :  50
					},{	dataIndex: 'qntt'	, text : Language.get(''	,'수량'		) , width : 80 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'unit_name'	, text : Language.get(''	,'단위'		) , width :  80 , xtype : 'numericcolumn'
					},{	dataIndex: 'exch_pric'	, text : Language.get(''	,'단가'		) , width :  90 , xtype : 'numericcolumn'
					},{	dataIndex: 'exch_amnt'	, text : Language.get(''	,'금액'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'exch_pric'	, text : Language.get(''	,'화페'		) , width :  80 , xtype : 'numericcolumn'
					},{	dataIndex: 'krwn_pric'	, text : Language.get(''	,'원화단가'		) , width :  90 , xtype : 'numericcolumn'
					},{	dataIndex: 'krwn_amnt'	, text : Language.get(''	,'원화금액'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ship_schd_date'	, text : Language.get(''	,'선적예정일'	) , width :  80
					},{	dataIndex: 'ordr_numb'	, text : Language.get(''	,'Order No'	) , width :  100
					},{	dataIndex: ''	, text : Language.get(''	,'수입구분'		) , width :  100 , xtype: 'lookupcolumn' , lookupValue: resource.lookup( '' ),align:'center'
					},{	dataIndex: ''	, text : Language.get(''	,'관리번호'		) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'PO Date'	) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'mdtn_prsn'	, text : Language.get(''	,'중개인'		) , width :  100
					},{	dataIndex: 'drtr_name'	, text : Language.get(''	,'담당자'		) , width :  100
					},{	dataIndex: ''	, text : Language.get(''	,'가격조건'		) , width :  100
					},{	dataIndex: ''	, text : Language.get(''	,'결제방법'		) , width :  100 , xtype: 'lookupcolumn' , lookupValue: resource.lookup( '' ),align:'center'
					},{	dataIndex: ''	, text : Language.get(''	,'결제시기'		) , width :  80
					},{	dataIndex: ''	, text : Language.get(''	,'결제기한'		) , width :  100
					},{	dataIndex: ''	, text : Language.get(''	,'적용환율'		) , width :  100 , xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	},
});