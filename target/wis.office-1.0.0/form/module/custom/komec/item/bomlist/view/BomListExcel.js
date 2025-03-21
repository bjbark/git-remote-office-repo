Ext.define('module.custom.komec.item.bomlist.view.BomListExcel', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-bomlist-excel',
	store		: 'module.custom.komec.item.bomlist.store.BomListExcel',
	border		: 0,
	title		: Language.get('','BOM TREE'),
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->',
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{  dataIndex: 'item_code'		, text : '품목코드'		, width : 160
					},{ dataIndex: 'item_name'		, text : '품명'			, width : 200
					},{ dataIndex: 'item_spec'		, text : '규격'			, width : 130
					},{ dataIndex: 'mixx_rate'		, text : '배합비'		, width : 60	, xtype : 'numericcolumn',
					},{ dataIndex: 'caca'			, text : 'CAS'			, width : 80
					},{ dataIndex: 'fema'			, text : 'FEMA'			, width : 80
					},{ dataIndex: 'wdgb'			, text : 'GB'			, width : 80
					},{ dataIndex: 'kfda'			, text : 'KFDA'			, width : 80
					},{ dataIndex: 'adpt_date'		, text : '등록일자'		, width : 90 , align:'center'
					}
				]
			};
		return item;
	}

});

