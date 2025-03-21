Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-oemmast-lister-detail',
	store		: 'module.custom.sjflv.sale.order.oemmast.store.OemMastDetail'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
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
					'->', '-' ,
					{	text : '<span class="write-button">인수증 출력</span>', action : 'printAction',cls: 'button1-style'}, '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : 'deleteAction' ,cls: 'button-style' }, '-' ,
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
					{	xtype: 'rownumberer'	, text : Language.get(''	,'순번'	) , width : 50  , align : 'center'
					},{ dataIndex: 'invc_date'	, text : Language.get(''	,'출고일자'	) , width : 75  , align : 'center'
					},{ dataIndex: 'item_code'	, text : Language.get(''	,'품목코드'	) , width : 120 , align : 'center',
					},{ dataIndex: 'item_name'	, text : Language.get(''	,'품목명'	) , width : 250 , align : 'left',
					},{ dataIndex: 'item_spec'	, text : Language.get(''	,'규격'	) , width : 180 , align : 'left'						
					},{ dataIndex: 'qntt'		, text : Language.get(''	,'출고수량'	) , width : 100 , align : 'right' , xtype : 'numericcolumn', format	: '#,##0.####', summaryType: 'sum'
					},{ dataIndex: 'lott_numb'	, text : Language.get(''	,'배치번호'	) , width : 150 , align : 'left'
					},{ dataIndex: 'invc_numb'	, text : Language.get(''	,'출고번호'	) , width : 150 , align : 'left'
					},{ dataIndex: 'wrhs_name'	, text : Language.get(''	,'출고창고'	) , width : 150 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});