Ext.define('module.cust.cstmlist.view.CstmItemPriceLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmlist-itempric'			,
	store		: 'module.cust.cstmlist.store.CstmItemPriceLister'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-cstmlist-worker-search'}];
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
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cont_date'		, width: 100, align : 'center'	, text: Language.get('cont_date'	, '계약일자'	)
					},{	dataIndex:	'item_clss_bacd_name', width: 200, align : 'left'	, text: Language.get( 'item_clss_bacd_name'	, '품목군'	), hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{	dataIndex: 'item_name'		, width: 200, align : 'left'	, text: Language.get('item'			, '품명'		)
					},{	dataIndex: 'item_code'		, width:  95, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex: 'item_spec'		, width:  95, align : 'center'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex: 'drtr_name'		, width: 100, align : 'center'	, text: Language.get('drtr'			, '담당자'		)
					},{	dataIndex: 'pric_dvcd'		, width:  80, align : 'left'	, text: Language.get('pric_dvcd'	, '단가구분'	), xtype: 'lookupcolumn',lookupValue : resource.lookup('pric_dvcd')
					},{	dataIndex: 'cont_pric'		, width:  80, align : 'right'	, text: Language.get('cont_pric'	, '계약단가'	), xtype: 'numericcolumn'
					},{	dataIndex: 'deli_dcnt'		, width:  80, align : 'right'	, text: Language.get('deli_dcnt'	, '납기일수'	), xtype: 'numericcolumn'
					},{	dataIndex: 'trmn_date'		, width: 100, align : 'center'	, text: Language.get('trmn_date'	, '해지일자'	)
					}
				]
			}
		;
		return item;
	},

});