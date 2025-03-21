Ext.define('module.sale.order.saleorder3.view.SaleOrder3ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-saleorder3-lister-detail',

	store: 'module.sale.order.saleorder3.store.SaleOrder3Detail',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{	text : '<span class="write-button">생산지시</span>'	, action : 'prorAction'	, cls: 'button1-style',
						hidden	: (_global.options.acpt_direct_order==0),
					} , '-',
					{	text : '<span class="write-button">생산지시(일괄)</span>'	, action : 'prorAction2'	, cls: 'button1-style', width : 90,
						hidden	: (_global.options.acpt_direct_order==0),
					} , '-',
					{	text : '<span class="write-button">지시서발행</span>', action : 'writeAction', cls: 'button1-style',
						hidden	: (_global.stor_id.toUpperCase()!= 'N1000NBOLT1000'?true:false)},
					{ text : Const.DELETE.text, iconCls : Const.DELETE.icon, action : 'deleteAction2', cls: 'button-style' , hidden : true},
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
					{	dataIndex: 'line_seqn'			, width:  50, align : 'center'	, text: Language.get('line_seqn'			, '항번'		)
					},{	dataIndex: 'invc_numb'			, width: 150, align : 'center'	, text: Language.get('wkod_numb'			,'지시번호'		), hidden: false,
					},{	dataIndex: 'item_code'			, width:  75, align : 'center'	, text: Language.get('item_code'			, '품목코드'	)
					},{	dataIndex: 'item_name'			, width: 250, align : 'left'	, text: Language.get('item_name'			, '품명'		)
					},{	dataIndex: 'item_spec'			, width: 100, align : 'left'	, text: Language.get('item_spec'			, '규격'		)
					},{ dataIndex: 'item_clss_bacd_name', width: 160, align : 'left'	, text: Language.get('item_clss_bacd_name'	, '품목군'		)
					},{ dataIndex: 'item_bacd_name'		, width: 100, align : 'left'	, text: Language.get('item_bacd_name'		, '품목구분'	)
					},{ dataIndex: 'make_bacd_name'		, width: 100, align : 'left'	, text: Language.get('make_bacd_name'		, '제조구분'	)
					},{ dataIndex: 'mtrl_bacd_name'		, width: 100, align : 'left'	, text: Language.get('mtrl_bacd_name'		, '재질'		)
					},{ dataIndex: 'srfc_proc_yorn'		, width:  70, align : 'center'	, text: Language.get('srfc_proc_yorn'		, '표면처리'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'emgc_yorn'			, width:  70, align : 'center'	, text: Language.get('emgc_yorn'			, '긴급'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'drwg_yorn'			, width:  70, align : 'center'	, text: Language.get('drwg_yorn'			, '도면확인'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'unit_name'			, width:  60, align : 'center'	, text: Language.get('unit_name'			, '단위'		)
					},{	dataIndex: 'invc_qntt'			, width:  80, align : 'right'	, text: Language.get('invc_qntt'			, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'invc_pric'			, width:  80, align : 'right'	, text: Language.get('invc_pric'			, '단가'		), xtype: 'numericcolumn'
					},{	dataIndex: 'sply_amnt'			, width:  80, align : 'right'	, text: Language.get('sply_amnt'			, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'			, width:  80, align : 'right'	, text: Language.get('vatx_amnt'			, '부가세'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'invc_amnt'			, width:  80, align : 'right'	, text: Language.get('invc_amnt'			, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'deli_date2'			, width:  80, align : 'center'	, text: Language.get('deli_date2'			, '납기일자'	),
						renderer:function(val){
							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							return value;
						}
					},{	dataIndex: 'pdsd_yorn'			, width:  80, align : 'center'	, text: Language.get('pdsd_yorn'			, '생산지시'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'drwg_numb'			, width: 100, align : 'left'	, text: Language.get('drwg_numb'			, '도면번호'	)
					},{ dataIndex: 'item_wigt'			, width: 80, align : 'right'	, text: Language.get('item_wigt'			, '중량정보'	), xtype : 'numericcolumn'
					},{ dataIndex: 'cstm_lott_numb'		, width: 100, align : 'center'	, text: Language.get('cstm_lott_numb'		, 'LOT번호'	)
					},{	dataIndex: 'user_memo'			, flex :  20, align : 'left'	, text: Language.get('user_memo'			, '비고'		), minWidth : 200
					}
				]
			};
		return item;
	}
});
