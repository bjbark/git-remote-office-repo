Ext.define('module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodmtrlcost-lister',
	store		: 'module.custom.sjflv.prod.prodmtrlcost.store.ProdMtrlCost',
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
					{ dataIndex: 'real_end'			, text : Language.get('real_end'	,'작업일자'	)	, width :  90 , align : 'center',
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'제품명'		)	, width : 265 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'	,'제품규격'	)	, width : 160 , align : 'left'
					},{ dataIndex: 'batch_no'		, text : Language.get('batch_no'	,'Batch No'	)	, width :  100 , align : 'left'
					},{ dataIndex: 'prod_cnt_result', text : Language.get('prod_cnt_result'	,'생산량'		)	, width :  75 , align : 'right', xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.###'
					}
				]
			}
		;
		return item;
	}
});