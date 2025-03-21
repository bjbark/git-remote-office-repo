Ext.define('module.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttwork-lister-detail2',
	store		: 'module.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ,{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,

					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId : 'detail'}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'			) , width : 50  , align : 'center'
					},{ dataIndex: 'acpt_numb'	, text : Language.get('acpt_numb'	,'주문번호'		) , width : 120 , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 120 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'			) , flex  :   1
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'			) , width : 170
					},{ dataIndex: 'sale_unit'	, text : Language.get('sale_unit'	,'단위'			) , width : 60
					},{ dataIndex: 'trst_qntt'	, text : Language.get('trst_qntt'	,'의뢰수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'출고수량'		) , width : 90  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'		, text : Language.get('unpaid'		,'미납잔량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'	, text : Language.get('sale_pric'	,'단가'			) , width : 80  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'금액'			) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});