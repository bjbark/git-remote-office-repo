Ext.define('module.stock.isos.prodosttwait.view.ProdOsttWaitListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodosttwait-lister-detail',
	store		: 'module.stock.isos.prodosttwait.store.ProdOsttWaitDetail',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 50  , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 120 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 250
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 160
					},{ dataIndex: 'modl_name'	, text : Language.get('modl_name'	,'모델명'		) , width : 160
					},{ dataIndex: 'sale_unit'	, text : Language.get('unit_name'	,'단위'		) , width : 60
					},{ dataIndex: 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'출고수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'	, text : Language.get('sale_pric'	,'단가'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'acpt_numb'	, text : Language.get('acpt_numb'	,'주문번호'	) , width : 120
					}
				]
			}
		;
		return item;
	}
});