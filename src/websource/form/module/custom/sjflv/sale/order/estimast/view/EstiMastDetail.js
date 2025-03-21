Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sjflv-estimast-detail',

	store: 'module.custom.sjflv.sale.order.estimast.store.EstiMastDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
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
					    {	dataIndex: 'line_seqn'	, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
						},{	dataIndex: 'item_name'	, width: 250, align : 'left'	, text: Language.get('item_name'	, '품명'		)
						},{	dataIndex: 'item_spec'	, width: 200, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
						},{	dataIndex: 'mtrl_yeld'	, width:  60, align : 'right'	, text: Language.get('mtrl_yeld'	, '수율'		),xtype:'numericcolumn'
						},{	dataIndex: 'make_cost'	, width:  90, align : 'right'	, text: Language.get('make_cost'	, '가공비'	),xtype:'numericcolumn'
						},{	dataIndex: 'cost_pric'	, width:  90, align : 'right'	, text: Language.get('cost_pric'	, '원가단가'	),xtype:'numericcolumn'
						},{	dataIndex: 'pfit_rate'	, width:  60, align : 'right'	, text: Language.get('pfit_rate'	, '마진'		),xtype:'numericcolumn'
						},{	dataIndex: 'esti_pric'	, width:  90, align : 'right'	, text: Language.get('esti_pric'	, '마진단가'	),xtype:'numericcolumn'
						},{	dataIndex: 'ttsm_amnt'	, width:  90, align : 'right'	, text: Language.get('ttsm_amnt'	, '견적단가'	),xtype:'numericcolumn'
						},{ dataIndex: 'acpt_numb'	, width: 120, align : 'center'  , text : Language.get('acpt_numb'	, '수주번호'	)		
					}
				]
			};
		return item;
	}
});
