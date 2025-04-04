Ext.define('module.custom.sjflv.mtrl.imp.reportmast.view.ReportMastListerDetail', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-reportmast-lister-detail',
	store		: 'module.custom.sjflv.mtrl.imp.reportmast.store.ReportMastListerDetail',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],


	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {

		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex: ''	, text : Language.get(''	,'란번호'		) , width : 70 , align : 'left'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 70 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: 'item_hscd'	, text : Language.get('item_hscd'	,'HS Code'	) , width : 120 , align : 'left'
					},{	dataIndex: ''	, text : Language.get(''	,'B/L No'		) , width :  120 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'통관수량'		) , width :  120 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'단위'		) , width :  50 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'단가'		) , width :  90 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'금액'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'화페'		) , width :  60 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'원화단가'		) , width :  90 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'원화금액'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'순중량'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'과세가격($)'	) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'총과세가격(원)') , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	}
 });