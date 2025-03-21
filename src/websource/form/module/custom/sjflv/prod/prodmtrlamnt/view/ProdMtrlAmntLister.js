Ext.define('module.custom.sjflv.prod.prodmtrlamnt.view.ProdMtrlAmntLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodmtrlamnt-lister',
	store		: 'module.custom.sjflv.prod.prodmtrlamnt.store.ProdMtrlAmnt',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
		ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
		trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
		leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
	} ],
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
				pagingButton : false,
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{ dataIndex: ''			, text : Language.get(''	,'입고일'		)	, width :  90 , align : 'center',
					},{ dataIndex: ''		, text : Language.get(''	,'입고LOT'	)	, width : 120 , align : 'left'
					},{ dataIndex: ''		, text : Language.get(''	,'입고량'		)	, width :  80 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'입고단가'	)	, width :  90 , align : 'right', xtype :'numericcolumn', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'입고금액'	)	, width : 110 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'출고일'		)	, width :  90 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''	,'출고LOT'	)	, width : 120 , align : 'left', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'출고량'		)	, width :  80 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'출고단가'	)	, width :  90 , align : 'right', xtype :'numericcolumn', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'출고금액'	)	, width : 110 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'재고LOT'	)	, width : 120 , align : 'left'
					},{ dataIndex: ''		, text : Language.get(''	,'재고량'		)	, width :  80 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'재고단가'	)	, width :  90 , align : 'right', xtype :'numericcolumn', format	: '#,##0.###'
					},{ dataIndex: ''		, text : Language.get(''	,'재고금액'	)	, width : 110 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					}
				]
			}
		;
		return item;
	}
});