Ext.define('module.custom.sjflv.prod.prodplanlist.view.ProdPlanListLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodplanlist-lister1',
	
	store		: 'module.custom.sjflv.prod.prodplanlist.store.ProdPlanListStore1',
	border		: 0,
	title		: Language.get('item','제품'),
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
		btnText = '<span style="font-size: small !important; color: white;">재고할당 등록</span>',
			item = {
				xtype	: 'grid-paging',
				dock	: 'bottom',
				items	: [
					'->',
					{ text: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action: Const.EXPORT.action, cls: 'button-style' },
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
					{	text : Language.get('',	'일자'		) , dataIndex: 'plan_date'	, width : 100, align : 'center'
					},{	text : Language.get('',	'제품코드'	) , dataIndex: 'item_code'	, width : 150, align : 'center'
					},{	text : Language.get('',	'품명'		) , dataIndex: 'item_name'	, width : 250, align : 'left'
					},{	text : Language.get('',	'규격'		) , dataIndex: 'item_spec'	, width : 100, align : 'left'
					},{	text : Language.get('',	'생산계획량') , dataIndex: 'plan_qntt'	, width : 100, align : 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text : Language.get('',	'납기일자'	) , dataIndex: 'deli_date'	, width : 100, align : 'center'
					},
				]
			};
		return item;
	}

});

