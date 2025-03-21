Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlstocklist-lister-detail2',
	store		: 'module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockListDetail2',

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
					{	xtype: 'rownumberer'		, width:  40, text: '순번', align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('item_code'		,'거래처'		) , width : 160 , align : 'center'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 160 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 200 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 130 , align : 'left'
					},{ dataIndex: 'lead_time'		, text : Language.get('lead_time'		,'리드타임'		) , width : 130 , align : 'center'			// 시간단위		
					//},{ dataIndex: 'base_qntt'		, text : Language.get('base_qntt'		,'사용량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					//},{ dataIndex: 'base_amnt'		, text : Language.get('base_amnt'		,'재고량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'base_qntt'		, text : Language.get('base_qntt'		,'사용량'		) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'base_amnt'		, text : Language.get('base_amnt'		,'재고량'		) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.options.mes_system_type.toUpperCase() != 'SJFLV'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});