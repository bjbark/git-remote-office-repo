Ext.define('module.stock.close.mtrlstocklist.view.MtrlStockListWrhs', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlstocklist-wrhs',
	store		: 'module.stock.close.mtrlstocklist.store.MtrlStockListWrhs',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
//					'->', '-' ,
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'zone_name'		, text : Language.get('zone_name'		,'구역명'		) , width : 150 , align : 'left'
					},{	dataIndex: 'zone_rack'		, text : Language.get('zone_rack'		,'랙'		) , width :  80 , align : 'center'
					},{ dataIndex: 'zone_flor'		, text : Language.get('zone_flor'		,'층'		) , width :  80 , align : 'center'
					},{ dataIndex: 'zone_colm'		, text : Language.get('zone_colm'		,'칸'		) , width :  80 , align : 'center'
					},{ dataIndex: 'zone_idcd'		, text : Language.get('zone_idcd'		,'랙ID'		) , width : 120 , align : 'left' , hidden : true,
					}
				]
			}
		;
		return item;
	}
});