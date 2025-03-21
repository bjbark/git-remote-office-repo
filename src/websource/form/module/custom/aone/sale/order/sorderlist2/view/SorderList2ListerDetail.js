Ext.define('module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist2-lister-detail',
	store		: 'module.custom.aone.sale.order.sorderlist2.store.SorderList2Detail',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('acpt_date'		,'주문일자'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 150 , align : 'left',
						render:function(){
							return '<span data-qwidth="200" '+'data-qtip="'+value+'">'+value+'</span>';
						}
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'		) , width :  80 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width :  50 , align : 'center'
					},{ dataIndex: 'cstm_lott_numb'	, text : Language.get('cstm_lott_numb'	,'LOT번호'	) , width : 100 , align : 'center',hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV',
					},{ dataIndex: 'cstm_lott_numb'	, text : Language.get('cstm_lott_numb'	,'고객 LOT번호'	) , width : 100 , align : 'center',hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{ dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt'		,'주문수량'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고수량'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'qntt'			, text : Language.get(''				,'미출고잔량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_pric'		, text : Language.get('invc_pric'		,'단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sply_amnt'		, text : Language.get('sply_amnt'		,'금액'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width :  70 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'		, text : Language.get('invc_amnt'		,'합계금액'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_numb'		, text : Language.get('acpt_numb'		,'주문번호'		) , width : 100 , align : 'center'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});