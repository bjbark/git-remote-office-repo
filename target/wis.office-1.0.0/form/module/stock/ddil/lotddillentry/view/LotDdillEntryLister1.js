Ext.define('module.stock.ddil.lotddillentry.view.LotDdillEntryLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotddillentry-lister1',
	store		: 'module.stock.ddil.lotddillentry.store.LotDdillEntry1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'}],
	columnLines	: true,
	initComponent : function () {
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'master',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					{	text : '<span class="write-button">실사대장 작성</span>', action : 'writeAction', cls: 'button1-style'	},

					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'lott_numb'	, text : Language.get('lott_numb'	,'LOT번호'	) , width : 120 , align : 'center'
					},{	dataIndex: 'wrhs_name'	, text : Language.get('wrhs_name'	,'창고명'	) , width : 150 , align : 'left',hidden:true
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 140 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , flex  :  80 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'bfre_qntt'	, text : Language.get('bfre_qntt'	,'전일재고'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'	, text : Language.get('istt_qntt'	,'당일입고'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'당일출고'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'tdtt_qntt'	, text : Language.get('tdtt_qntt'	,'당일재고'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  :  20
					}
				]
			}
		;
		return item;
	}
});