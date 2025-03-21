Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanMaster4', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-prodplan-master4',
	store	: 'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster4',
//	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-prodplan-worker-search2'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

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
					{	dataIndex:	'wkct_name'	, width: 100, align : 'left'	, text: Language.get(''	, '공정명'	)
					},{	dataIndex:	'wkct_stnm'	, width:  80, align : 'left'	, text: Language.get(''	, '보조명'	)
					},{	dataIndex:	'wkun_dvcd'	, width:  90, align : 'center'	, text: Language.get(''	, '작업단위'), xtype : 'lookupcolumn' , lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex:	'plan_qntt'	, width: 100, align : 'right'	, text: Language.get(''	, '소요량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'not_qntt'	, width: 100, align : 'right'	, text: Language.get(''	, '미계획'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'unit_name'	, width:  90, align : 'center'	, text: Language.get(''	, '수량단위')
					}
				]
			}
		;
		return item;
	}

});
