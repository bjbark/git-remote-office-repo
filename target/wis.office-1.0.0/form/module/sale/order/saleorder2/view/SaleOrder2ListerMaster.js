Ext.define('module.sale.order.saleorder2.view.SaleOrder2ListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-saleorder2-lister-master',

	store		: 'module.sale.order.saleorder2.store.SaleOrder2Master',

	width		: 515,
	minWidth	: 200,
	split		: true,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
						hidden	: !_global.auth.auth_sale_1001,
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text	: '승인/승인취소',
						hidden	: !_global.auth.auth_sale_1001,
						menu	: [
							{	text : '승인', action : 'okAction'
							},{	text : '승인취소', action : 'okCancelAction'
							}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">엑셀 Upload</span>', action : 'uploadAction'	, cls: 'button1-style',
						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : '<span class="write-button">수주복사</span>'	, action : 'copyAction'		, cls: 'button1-style',
						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : '<span class="write-button">출고지시</span>'	, action : 'orderAction'	, cls: 'button1-style',
						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction',
						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style',
						hidden	: !_global.auth.auth_sale_1003
					},{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style',
						hidden	: !_global.auth.auth_sale_1003
					},{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' ,
					} , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' ,
						hidden	: !_global.auth.auth_sale_1003
					}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype: 'rownumberer'  , width:50
					},{	dataIndex: 'crte_name'		, width:  65, align : 'left'	, text: Language.get('crte_name'		, '수주등록자'	)
					},{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '수주상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'crte_dttm'		, width:  80, align : 'center'	, text: Language.get('crte_dttm'		, '생성일자'		)
					},{	dataIndex: 'updt_dttm'		, width:  80, align : 'center'	, text: Language.get('updt_dttm'		, '수정일자'		)
					},{	dataIndex: 'item_count'		, width:  65, align : 'center'	, text: Language.get('item_count'		, '건별품목수'		)
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'line_seqn'		, width:  40, align : 'center'	, text: Language.get('line_seqn'		, '항번'			), hidden : true
					},{	dataIndex: 'cstm_lott_numb'	, width:  80, align : 'center'	, text: Language.get('cstm_lott_numb'	, 'LOT번호'		)
					},{	dataIndex: 'item_idcd'		, width: 120, align : 'center'	, text: Language.get('item_idcd'		, '품번'			)
					},{	dataIndex: 'item_name'		, width: 170, align : 'left'	, text: Language.get('item_name'		, '품명'			)
					},{	dataIndex: 'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'		, '규격'			)
					},{	dataIndex: 'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('invc_qntt'		, '발주수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'upid_qntt'		, width:  80, align : 'right'	, text: Language.get('upid_qntt'		, '미납수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'deli_date'		, width:  95, align : 'center'	, text: Language.get('deli_date'		, '(협력사)납기일자'	)
					},{	dataIndex: 'cstm_offr_date'	, width:  80, align : 'center'	, text: Language.get('cstm_offr_date'	, '발주일자'		)
					},{	dataIndex: 'cstm_deli_date'	, width:  80, align : 'center'	, text: Language.get('cstm_deli_date'	, '납기일자'		)
					},{	dataIndex: 'cstm_drtr_name'	, width:  70, align : 'left'	, text: Language.get('cstm_drtr_name'	, '담당자명'		)
					},{	dataIndex: 'remk_text'		, width: 120, align : 'left'	, text: Language.get('remk_text'		, '후공정부서 및 거래처')
					},{	dataIndex: 'user_memo'		, width: 120, align : 'left'	, text: Language.get('user_memo'		, '발주품목비고'		)
					},{	dataIndex: 'deli_chge_resn'	, width: 100, align : 'left'	, text: Language.get('deli_chge_resn'	, '(협력사)변경사유'	)
					},{	dataIndex: 'invc_pric'		, width:  80, align : 'right'	, text: Language.get('invc_pric'		, '단가'			), xtype: 'numericcolumn'
					},{	dataIndex: 'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'		, '금액'			), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'sysm_memo'		, width:  80, align : 'left'	, text: Language.get('sysm_memo'		, '진행상태'		)
					}
				]
			};
		return item;
	}
});
