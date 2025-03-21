Ext.define('module.prod.order.workentry.view.WorkEntryListerSjungProductHistory', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister-sjung-history',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntry',
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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: ''		, text : Language.get(''	,'주문구분'		) , width : 100 , align : 'center'
					},{	dataIndex: ''		, text : Language.get(''	,'제품코드'		) , width : 100 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'품명'		) , width : 200 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'Batch No'	) , width : 100 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'지시수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ dataIndex: ''		, text : Language.get(''	,'생산수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ dataIndex: ''		, text : Language.get(''	,'시작일시'		) , width : 120 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'종료일시'		) , width : 120 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'작업자'		) , width : 100 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'포장작업자'	) , width : 80  , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'설비번호'		) , width : 80  , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'포장단위'		) , width : 100 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'라벨수량'		) , width : 100 , align : 'center',
					},{ dataIndex: ''		, text : Language.get(''	,'특이사항'		) , width : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	},
});