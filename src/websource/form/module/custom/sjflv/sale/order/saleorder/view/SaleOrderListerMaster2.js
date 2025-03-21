Ext.define('module.custom.sjflv.sale.order.saleorder.view.SaleOrderListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-saleorder-lister-master2',
	store		: 'module.custom.sjflv.sale.order.saleorder.store.SaleOrderMaster2',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],
	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		var hidden = !(_global.hqof_idcd=='N1000INKOP');
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem(hidden);
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', } , '-' ,
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function (hidden) {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'수주일자'			) , width :  80, align : 'center'
					},{	dataIndex: 'dvcd'			, text : Language.get('dvcd'			,'구분'			) , width :  50, align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처'			) , width : 120, align : 'left'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 120, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 100, align : 'left'
					},{	dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt'		,'주문수량'			) , width :  80, align : 'right' ,xtype : 'numericcolumn'
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'			) , width :  80, align : 'left'
					},{	dataIndex: 'user_name'		, text : Language.get('user_name'		,'영업담당'			) , width :  80, align : 'left'
					},{	dataIndex: 'dely_cstm_name'	, text : Language.get('dely_cstm_name'	,'납품처'			) , width : 120, align : 'left'
					},{	dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , width : 120, align : 'left'
					}
				]
			}
		return item;
	}
});
