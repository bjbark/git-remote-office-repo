Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2EditorLister1', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-estimast2-editor-lister1',
	store		: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice2',
	border		: 0,
	columnLines	: true,
	split		: true,
	selModel: {selType:'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
					items : [
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get(''	, '항번'		), xtype: 'numericcolumn', summaryType: 'count'
					},{	dataIndex:	'prod_code'		, width: 120, align : 'center'	, text: Language.get(''	, '품목코드'	)
					},{	dataIndex:	'prod_name'		, width : 180, align : 'left'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	'mtrl_name'		, width : 180, align : 'left'	, text: Language.get(''	, '원단명'	)
					},{	dataIndex:	'item_line'		, width:  60, align : 'center'	, text: Language.get(''	, '골'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'bxty_name'		, width: 100, align : 'left'	, text: Language.get(''	, '상자형식'	),
					},{	dataIndex:	'item_leng'		, width:  60, align : 'right'	, text: Language.get(''	, '장'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'item_widh'		, width:  60, align : 'right'	, text: Language.get(''	, '폭'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width:  60, align : 'right'	, text: Language.get(''	, '고'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'esti_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'mxm2_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '개/m2'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'mxm2_pric'		, width: 100, align : 'right'	, text: Language.get(''	, '단가/m2'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, flex : 100, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	},
 });





