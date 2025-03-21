Ext.define('module.custom.sjflv.item.bomlist.view.BomListMtrlLister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-bomlist-mtrl-lister2',
	store		: 'module.custom.sjflv.item.bomlist.store.BomListMtrlLister2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	border : 0  ,
	title  : Language.get('','배합기준'),

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
					{	text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action , cls: 'button-style', hidden : (_global.auth.auth_down_excel_1001) ? false : true	} // 23.10.05 - 엑셀다운 권한이 있는 경우  버튼 활성화
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items	: [
				{	xtype: 'rownumberer'		, width:  50, text: '순번', align : 'center'
				},{	text : Language.get('item_code'			, '제품코드'	) , dataIndex: 'item_code'	, width : 70 ,   align : 'center'
				},{	text : Language.get('item_name'			, '제품명'	) , dataIndex: 'item_name'	, width : 160
				},{	text : Language.get('mixx_rate'			, '배합비'	) , dataIndex: 'mixx_rate'	, width : 60  ,   xtype: 'numericcolumn'
				},{	text : Language.get('revs_numb'			, '리비전'	) , dataIndex: 'revs_numb'	, width : 50
				},{	text : Language.get('invc_date'			, '적용일자'	) , dataIndex: 'adpt_date'	, width : 80
				}
			]
		};
		return item;
	},
});





