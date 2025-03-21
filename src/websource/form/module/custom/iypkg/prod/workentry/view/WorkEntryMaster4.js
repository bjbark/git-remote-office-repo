Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryMaster4', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-workentry-master4',
	store	: 'module.custom.iypkg.prod.workentry.store.WorkEntryMaster4',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],

	initComponent: function () {
		var me = this;
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
					{	dataIndex:	'invc_numb'		, width: 100, align : 'center'	, text: Language.get(''	, '지시번호'	)
					},{	dataIndex:	'wkct_name'		, width: 100, align : 'left'	, text: Language.get(''	, '공정명'		)
					},{	dataIndex:	'wkct_stnm'		, width:  80, align : 'left'	, text: Language.get(''	, '보조명'		)
					},{	dataIndex:	'wkun_dvcd'		, width:  80, align : 'center'	, text: Language.get(''	, '작업단위'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex:	'indn_qntt'		, width:  80, align : 'right'	, text: Language.get(''	, '지시량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'unprod'		, width:  80, align : 'right'	, text: Language.get(''	, '미생산'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'prog_stat_dvcd', width:  60, align : 'center'	, text: Language.get(''	, '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('prog_stat_dvcd'),
					},{	dataIndex:	'unit_name'		, width:  80, align : 'center'	, text: Language.get(''	, '수량단위'	)
					}
				]
			}
		;
		return item;
	}

});
