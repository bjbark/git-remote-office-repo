Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2EditorLister3', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-estimast2-editor-lister3',
	store		: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice4',
	border		: 0,
	columnLines	: true,
	selModel: {selType:'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me     = this;
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get(''	, '항번'		), xtype: 'numericcolumn', summaryType: 'count'
					},{	dataIndex:	'prod_code'		, width: 120, align : 'center'	, text: Language.get(''	, '품목코드'	)
					},{	dataIndex:	'prod_name'		, width : 180, align : 'left'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	'mtrl_name'		, width : 180, align : 'left'	, text: Language.get(''	, '원단명'		)
					},{	dataIndex:	'item_line'		, width:  60, align : 'center'	, text: Language.get(''	, '골'		), xtype: 'numericcolumn'
					},{	dataIndex:	'bxty_name'		, width: 100, align : 'left'	, text: Language.get(''	, '상자형식'	),
					},{	dataIndex:	'item_leng'		, width:  60, align : 'right'	, text: Language.get(''	, '장'		), xtype: 'numericcolumn'
					},{	dataIndex:	'item_widh'		, width:  60, align : 'right'	, text: Language.get(''	, '폭'		), xtype: 'numericcolumn'
					},{	dataIndex:	'item_hght'		, width:  60, align : 'right'	, text: Language.get(''	, '고'		), xtype: 'numericcolumn'
					},{	dataIndex:	'esti_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'mxm2_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '개/m2'	), xtype: 'numericcolumn'
					},{	dataIndex:	'mxm2_pric'		, width: 100, align : 'right'	, text: Language.get(''	, '단가/m2'	), xtype: 'numericcolumn'
					},{	dataIndex:	'user_memo'		, flex : 100, align : 'left'	, text: Language.get(''	, '비고'		)
					}
				]
			};
		return item;
	},

 });





