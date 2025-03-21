Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister2Detail', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcbillwork-lister2-detail',
	store	: 'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkDetail',

	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcbillwork-worker-lister2-search2'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
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
					{	dataIndex:	'txbl_path_dvcd', width:  70, align : 'center'	, text: Language.get('txbl_path_dvcd'	, '구분'		)
					},{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'		, '입고일자'	)
					},{	dataIndex:	'item_name'		, width: 200, align : 'left'	, text: Language.get('item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 200, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'qntt'			, width:  60, align : 'right'	, text: Language.get('qntt'				, '수량'		), xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'pric'			, width:  80, align : 'right'	, text: Language.get('pric'				, '단가'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'		, '공급가액'	), xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'		, '부가세'		), xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'		, '합계금액'	), xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					}
				]
			}
		;
		return item;
	}

});
