Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail3', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estientry2-lister-detail3',
	store: 'module.custom.hantop.sale.estientry2.store.EstiEntry2Detail3',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }/*, { ptype:'filterbar'  }*/],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-','->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'			, width :  40, align : 'center'	, text: Language.get('line_seqn'	, '순번'		)
					},{	dataIndex:	'sbsc_name'			, width : 230, align : 'center'	, text: Language.get('sbsc_name'	, '항목명'	)
					},{	dataIndex:	'sbsc_bacd'			, width :  80, align : 'center'	, text: Language.get('sbsc_bacd'	, '항목분류'	), hidden : true
					},{	dataIndex:	'esti_amnt'			, width : 100, align : 'right'	, text: Language.get('esti_amnt'	, '견적금액'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'vatx_amnt'			, width : 100, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세액'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'			, width : 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype : 'numericcolumn' , format: '#,##0'
					}
				]
			};
		return item;
	}
});
