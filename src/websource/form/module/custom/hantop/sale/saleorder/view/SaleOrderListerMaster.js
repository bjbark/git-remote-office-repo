Ext.define('module.custom.hantop.sale.saleorder.view.SaleOrderListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleorder-lister-master',
	store		: 'module.custom.hantop.sale.saleorder.store.SaleOrderMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		var hidden = !(_global.hqof_idcd=='N1000INKOP');
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem(hidden);
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',

					'-', '->', '-',
					{	text : '<span class="write-button">출고</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',

					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' ,
						hidden : _global.hq_id.toUpperCase()=='N1000HNTOP'? true : false}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function (hidden) {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40, align: 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align: 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'pdsd_yorn'		, width:  60, align: 'center'	, text: Language.get('pdsd_yorn'		, '생산계획'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, width: 75, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'line_seqn'		, width:  40, align: 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex: 'cstm_name'		, width: 200, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'cstm_code'		, width:  80, align: 'center'	, text: Language.get('cstm_code'		, '거래처코드'		),hidden:true
					},{	dataIndex: 'invc_date'		, width:  80, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'cstm_drtr_name'	, width:  80, align: 'left'		, text: Language.get('cstm_drtr_name'	, '고객담당자'		)
					},{	dataIndex: 'deli_date'		, width:  80, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'pcod_numb'		, width: 120, align: 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'		)
					},{	dataIndex: 'drtr_name'		, width:  80, align: 'left'		, text: Language.get('sale_drtr_name'	, '영업담당자'		)
					},{	dataIndex: 'item_code'		, width: 120, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex: 'item_name'		, width: 260, align: 'left'		, text: Language.get('item'				, '품목명'			)
					},{	dataIndex: 'item_spec'		, width: 150, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
					},{	dataIndex: 'invc_qntt'		, width:  80, align: 'right'	, text: Language.get('acpt_qntt'		, '수주수량'		), xtype : 'numericcolumn'
//					},{	dataIndex: 'invc_pric'		, width:  80, align: 'right'	, text: Language.get('invc_pric'		, '품목단가'		), xtype : 'numericcolumn'
					},{	dataIndex: 'invc_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '금액'			), xtype : 'numericcolumn',hidden : true
					},{	dataIndex: 'wndw_area'		, width:  80, align: 'right'	, text: Language.get('wndw_area'		, '총면적'			), xtype : 'numericcolumn'
					},{	dataIndex: 'wdbf_cost'		, width:  80, align: 'right'	, text: Language.get('wdbf_cost'		, 'BF원가'		), xtype : 'numericcolumn'
					},{	dataIndex: 'wdsf_cost'		, width:  80, align: 'right'	, text: Language.get('wdsf_cost'		, 'SF원가'		), xtype : 'numericcolumn'
					},{	dataIndex: 'wdmf_cost'		, width:  80, align: 'right'	, text: Language.get('wdmf_cost'		, 'MF원가'		), xtype : 'numericcolumn'
					},{	dataIndex: 'wdsf_glss_cost'	, width:  80, align: 'right'	, text: Language.get('wdsf_glss_cost'	, '유리원가'		), xtype : 'numericcolumn'
					},{	dataIndex: 'tmmk_pric'		, width:  80, align: 'right'	, text: Language.get('tmmk_pric'		, '임가공단가'		), xtype : 'numericcolumn'
					},{	dataIndex: 'totl_cost'		, width:  80, align: 'right'	, text: Language.get('totl_cost'		, '견적금액'		), xtype : 'numericcolumn'
					},{	dataIndex: 'ostt_date'		, width:  80, align: 'center'	, text: Language.get('ostt_date'		, '출고일자'		)
					},{	dataIndex: 'ostt_qntt'		, width:  70, align: 'right'	, text: Language.get('ostt_qntt'		, '출고수량'		), xtype : 'numericcolumn'
					},{	dataIndex: 'upid_baln_qntt'	, width:  70, align: 'right'	, text: Language.get('upid_baln_qntt'	, '미납잔량'		), xtype : 'numericcolumn'
					},{	dataIndex: 'sale_amnt'		, width:  80, align: 'right'	, text: Language.get('ostt_amnt'		, '출고금액'		), xtype : 'numericcolumn'
					},{	dataIndex: 'user_memo'		, flex : 100, align: 'left'		, text: Language.get('user_memo'		, '비고'			)
					},{	dataIndex: 'new_line_seqn'	, hidden : true
					}
				]
			};
		return item;
	}
});
