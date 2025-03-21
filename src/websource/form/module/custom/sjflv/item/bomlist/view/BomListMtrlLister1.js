Ext.define('module.custom.sjflv.item.bomlist.view.BomListMtrlLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-bomlist-mtrl-lister1',
	store		: 'module.custom.sjflv.item.bomlist.store.BomListMtrlLister1',
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
				{	text : Language.get('item_code'			, '자재코드'	) , dataIndex: 'item_code'	, width : 70 ,   align : 'center'
				},{	text : Language.get('item_name'			, '품명'		) , dataIndex: 'item_name'	, width : 160
				},{	text : Language.get('item_spec'			, '규격'		) , dataIndex: 'item_spec'		, width : 100
				},{	text : Language.get('caca'				, 'CAS'		) , dataIndex: 'caca'	, width : 80
				},{	text : Language.get('fema'				, 'FEMA'	) , dataIndex: 'fema'	, width : 80
				},{	text : Language.get('wdgb'				, 'GB'		) , dataIndex: 'wdgb'	, width : 80
				},{	text : Language.get('kfda'				, 'KFDA'	) , dataIndex: 'kfda'	, width : 80
				},{	text : Language.get('drtr_name'			, '담당자'	) , dataIndex: ''	, width : 80
				}
			]
		};
		return item;
	},
});





