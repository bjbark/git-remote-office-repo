Ext.define('module.custom.komec.item.bomlist.view.BomListMtrlLister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-komec-bomlist-mtrl-lister2',
	store		: 'module.custom.komec.item.bomlist.store.BomListMtrlLister2',
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
		me.columns = me.columnItem();
		me.callParent();
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





