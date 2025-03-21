Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrWkctDetail1', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-prodordr-wkctdetail1',
	store	: 'module.custom.iypkg.prod.prodordr.store.ProdOrdrWkctDetail1',

	features: [{ftype :'grid-summary'}],
	selModel: { selType: 'checkboxmodel', mode : 'MULTI' },

	initComponent: function () {
		var me = this;
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
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'wkct_name'		, width: 100, align : 'left'	, text: Language.get('wkct_name'	, '공정명'		)
					},{	dataIndex:	'wkct_stnm'		, width: 100, align : 'left'	, text: Language.get('wkct_stnm'	, '보조명'		)
					},{	dataIndex:	'wkun_dvcd'		, width:  80, align : 'center'	, text: Language.get('wkun_dvcd'	, '작업단위'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex:	'need_qntt'		, width:  70, align : 'right'	, text: Language.get('need_qntt'	, '소요량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'plan_qntt'		, width:  70, align : 'right'	, text: Language.get('plan_qntt'	, '계획량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'indn_qntt'		, width:  90, align : 'right'	, text: Language.get('indn_qntt'	, '지시량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'unit_name'		, width:  80, align : 'center'	, text: Language.get('unit_name'	, '수량단위'	)
					}
				]
			}
		;
		return item;
	}

});
