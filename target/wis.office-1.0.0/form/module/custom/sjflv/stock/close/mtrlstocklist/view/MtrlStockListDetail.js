Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlstocklist-lister-detail',
	store		: 'module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockListDetail',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],
//	border		: 0,
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
				pagingButton : false,
				items	: [
					'->', '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'일자'		) , width : 120 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'적요'		) , width : 120 , align : 'left'

					},{ dataIndex: 'base_qntt'		, text : Language.get('base_qntt'		,'이월 수량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'base_amnt'		, text : Language.get('base_amnt'		,'이월 금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',

					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고 수량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_pric'		,'입고 금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',

					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고 수량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'ostt_amnt'		, text : Language.get('ostt_pric'		,'출고 금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',

					},{ dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'재고 수량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'stok_amnt'		, text : Language.get('stok_pric'		,'재고 금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',

					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});