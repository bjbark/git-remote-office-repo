Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryMaster1', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-workentry-master1',
	store	: 'module.custom.iypkg.prod.workentry.store.WorkEntryMaster1',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } /*, { ptype:'filterbar', renderHidden : true  }*/],

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
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'	, '수주일자'		)
					},{	dataIndex:	'cstm_name'		, width: 160, align : 'left'	, text: Language.get('cstm_name'	, '거래처'		)
					},{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get('item_name'	, '품명'			)
					},{	dataIndex:	'prod_leng'		, width:  60, align : 'right'	, text: Language.get('prod_leng'	, '장'			), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'prod_widh'		, width:  60, align : 'right'	, text: Language.get('prod_widh'	, '폭'			), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'prod_hght'		, width:  60, align : 'right'	, text: Language.get('prod_hght'	, '고'			), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'wkct_stnm'		, width:  80, align : 'left'	, text: Language.get('wkct_stnm'	, '진행공정'		)
					},{	dataIndex:	'indn_qntt'		, width:  80, align : 'right'	, text: Language.get('indn_qntt'	, '지시량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'prog_stat_dvcd', width:  80, align : 'center'	, text: Language.get('prog_stat_dvcd', '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('prog_stat_dvcd'),
					}
				]
			}
		;
		return item;
	}
});
