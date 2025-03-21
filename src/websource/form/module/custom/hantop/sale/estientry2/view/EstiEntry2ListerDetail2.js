Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estientry2-lister-detail2',
	store: 'module.custom.hantop.sale.estientry2.store.EstiEntry2Detail2',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }/*, { ptype:'filterbar'  }*/],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff2',
						hidden	: true,
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					}, '-','->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
//				pagingButton : false
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
					{	dataIndex:	'bfsf_dvcd'		, width :  80, align : 'center'	, text: Language.get('bfsf_dvcd'	, 'BF/SF'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('bfsf_dvcd')
					},{	dataIndex:	'item_idcd'		, width : 150, align : 'left'	, text: Language.get('item_idcd'	, '자재'		)
					},{	dataIndex:	'bsmt_leng'		, width :  90, align : 'right'	, text: Language.get('bsmt_leng'	, '원자재길이'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'cont'			, width :  80, align : 'right'	, text: Language.get('cont'			, '본수'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'cutt_leng'		, width :  80, align : 'right'	, text: Language.get('cutt_leng'	, '절단계'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'cutt_union'	, flex  :   1, align : 'left'	, text: Language.get('cutt_union'	, '절단규격'	)
					}
				]
			};
		return item;
	}
});
