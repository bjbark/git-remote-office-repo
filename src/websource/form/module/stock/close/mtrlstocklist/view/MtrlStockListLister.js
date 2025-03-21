Ext.define('module.stock.close.mtrlstocklist.view.MtrlStockListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlstocklist-lister',
	store		: 'module.stock.close.mtrlstocklist.store.MtrlStockList',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
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
					{	dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고명'		) , width : 150 , align : 'left' , hidden : true
					},{	dataIndex: 'zone_rack'		, text : Language.get('zone_rack'		,'구역명'		) , width :  80 , align : 'center', hidden : _global.hq_id.toUpperCase()!='N1000A-ONE' ? true : false,
					},{	dataIndex: 'zone_flor'		, text : Language.get('zone_flor'		,'층'		) , width :  80 , align : 'center', hidden : _global.hq_id.toUpperCase()!='N1000A-ONE' ? true : false,
					},{	dataIndex: 'zone_colm'		, text : Language.get('zone_colm'		,'열'		) , width :  80 , align : 'center', hidden : _global.hq_id.toUpperCase()!='N1000A-ONE' ? true : false,
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 150 , align : 'center'
					},{ dataIndex: 'acct_bacd'		, text : Language.get('acct_bacd'		,'계정구분'		) , width :  80 , align : 'center', hidden: _global.options.mes_system_type =='Frame',
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'base_qntt'		, text : Language.get('base_qntt'		,'이월'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'재고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'safe_qntt'		, text : Language.get('safe_qntt'		,'안전재고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9', hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
					},{ dataIndex: 'defy_qntt'		, text : Language.get('defy_qntt'		,'과부족'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9', hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});