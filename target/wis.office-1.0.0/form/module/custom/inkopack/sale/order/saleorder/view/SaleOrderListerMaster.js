Ext.define('module.custom.inkopack.sale.order.saleorder.view.SaleOrderListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inkopack-saleorder-lister-master',
	store		: 'module.custom.inkopack.sale.order.saleorder.store.SaleOrderMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
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
					{	text	: '승인/취소',
						hidden	: (_global.options.acpt_fix_yorn==0),
						menu	: [
							{	text : '승인', action : 'okAction'
							},{	text : '취소', action : 'okCancelAction'
							}
						]
					},
					'-', '->', '-',
					{text : '납기분석'	, iconCls: 'icon-chart',     action : 'ganttAction' , cls: 'button-style'} , '-' ,
					{	text : '<span class="write-button">수주복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">출고지시</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
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
					},{	dataIndex: 'invc_numb'		, width: 120, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'line_seqn'		, width:  40, align: 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'cstm_code'		, width:  70, align: 'center'	, text: Language.get('cstm_code'		, '거래처코드'		)
					},{	dataIndex: 'invc_date'		, width:  80, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'cstm_drtr_name'	, width:  80, align: 'left'		, text: Language.get('cstm_drtr_name'	, '고객담당자'		)
					},{	dataIndex: 'deli_date'		, width:  80, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'pcod_numb'		, width: 120, align: 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'		)
					},{	dataIndex: 'drtr_name'		, width:  80, align: 'left'		, text: Language.get('sale_drtr_name'	, '영업담당자'		)
					},{	dataIndex: 'item_code'		, width:  80, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex: 'item_name'		, width: 230, align: 'left'		, text: Language.get('item_name'		, '품명'			)
					},{	dataIndex: 'item_spec'		, width:  90, align: 'left'		, text: Language.get('item_spec'		, '규격'			)
					},{	dataIndex: 'invc_qntt'		, width:  70, align: 'right'	, text: Language.get('acpt_qntt'		, '수주수량'		), xtype : 'numericcolumn'
					},{	dataIndex: 'invc_pric'		, width:  70, align: 'right'	, text: Language.get('invc_pric'		, '단가'			), xtype : 'numericcolumn'
					},{	dataIndex: 'invc_amnt'		, width:  90, align: 'right'	, text: Language.get('invc_amnt'		, '합계금액'		), xtype : 'numericcolumn'
					},{	dataIndex: 'ostt_date'		, width:  80, align: 'center'	, text: Language.get('ostt_date'		, '출고일자'		)
					},{	dataIndex: 'ostt_qntt'		, width:  70, align: 'right'	, text: Language.get('ostt_qntt'		, '출고수량'		), xtype : 'numericcolumn'
					},{	dataIndex: 'upid_baln_qntt'	, width:  70, align: 'right'	, text: Language.get('upid_baln_qntt'	, '미납잔량'		), xtype : 'numericcolumn'
					},{	dataIndex: 'sale_amnt'		, width:  80, align: 'right'	, text: Language.get('ostt_amnt'		, '출고금액'		), xtype : 'numericcolumn'
					},{	dataIndex: 'spec_horz'		, width:  60, align: 'right'	, text: Language.get('spec_horz'		, '규격가로'		), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'spec_vrtl'		, width:  60, align: 'right'	, text: Language.get('spec_vrtl'		, '규격세로'		), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'spec_tick'		, width:  60, align: 'right'	, text: Language.get('spec_tick'		, '규격두께'		), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'bath_qntt'		, width:  80, align: 'right'	, text: Language.get('bath_qntt'		, 'batch수량'		), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'colr_ccnt'		, width:  60, align: 'right'	, text: Language.get('colr_ccnt'		, '컬러도수'		), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'liqu_type'		, width:  60, align: 'left'		, text: Language.get('liqu_type'		, '액형'			), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'fabc_widh'		, width:  60, align: 'right'	, text: Language.get('fabc_widh'		, '원단폭'			), xtype : 'numericcolumn' , hidden: hidden
					},{	dataIndex: 'proc_bacd'		, width:  60, align: 'center'	, text: Language.get('proc_bacd'		, '가공분류'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('proc_bacd')
					},{	dataIndex: 'nutc_valu'		, width:  60, align: 'center'	, text: Language.get('nutc_valu'		, '넛찌값'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'hole_yorn'		, width:  60, align: 'center'	, text: Language.get('hole_yorn'		, '타공여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'stnd_yorn'		, width:  60, align: 'center'	, text: Language.get('stnd_yorn'		, '스텐드여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'uppr_open_yorn'	, width:  90, align: 'center'	, text: Language.get('uppr_open_yorn'	, '상단오픈여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),
					},{	dataIndex: 'lwrp_open_yorn'	, width:  90, align: 'center'	, text: Language.get('lwrp_open_yorn'	, '하단오픈여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),
					},{	dataIndex: 'left_open_yorn'	, width:  90, align: 'center'	, text: Language.get('left_open_yorn'	, '좌측오픈여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),
					},{	dataIndex: 'righ_open_yorn'	, width:  90, align: 'center'	, text: Language.get('righ_open_yorn'	, '우측오픈여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),
					},{	dataIndex: 'zipr_yorn'		, width:  60, align: 'center'	, text: Language.get('zipr_yorn'		, '지퍼여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'roll_perc_poch'	, width:  90, align: 'right'	, text: Language.get('roll_perc_poch'	, 'ROLL당파우치'	), xtype : 'numericcolumn'
					},{	dataIndex: 'ygls_tick'		, width:  70, align: 'right'	, text: Language.get('ygls_tick'		, '유광두께'		), xtype : 'numericcolumn'
					},{	dataIndex: 'ngls_tick'		, width:  70, align: 'right'	, text: Language.get('ngls_tick'		, '무광두께'		), xtype : 'numericcolumn'
					},{	dataIndex: 'poch_wdth'		, width:  80, align: 'right'	, text: Language.get('poch_wdth'		, '파우치넓이'		), xtype : 'numericcolumn'
					},{	dataIndex: 'poch_hght'		, width:  80, align: 'right'	, text: Language.get('poch_hght'		, '파우치높이'		), xtype : 'numericcolumn'
					},{	dataIndex: 'poch_tick'		, width:  80, align: 'right'	, text: Language.get('poch_tick'		, '파우치두께'		), xtype : 'numericcolumn'
					},{	dataIndex: 'item_tick'		, width:  70, align: 'right'	, text: Language.get('item_tick'		, '품목두께'		), xtype : 'numericcolumn'
					},{	dataIndex: 'real_item_tick'	, width:  80, align: 'right'	, text: Language.get('real_item_tick'	, '실품목두께'		), xtype : 'numericcolumn'
					},{	dataIndex: 'user_memo'		, width: 100, align: 'left'		, text: Language.get('user_memo'		, '비고'			)
					},{	dataIndex: 'pdsd_yorn'		, width:  80, align: 'left'		, text: Language.get('pdsd_yorn'		, '생산계획여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					}
				]
			};
		return item;
	}
});
