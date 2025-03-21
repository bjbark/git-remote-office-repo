Ext.define('module.sale.order.slorlist6.view.SlorList6ListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-slorlist6-lister-master',

	store		: 'module.sale.order.slorlist6.store.SlorList6Master',

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
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
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
					},{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '수주상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'crte_dttm'		, width:  80, align : 'center'	, text: Language.get('crte_dttm'		, '생성일자'		)
					},{	dataIndex: 'updt_dttm'		, width:  80, align : 'center'	, text: Language.get('updt_dttm'		, '수정일자'		)
					},{	dataIndex: 'item_count'		, width:  65, align : 'center'	, text: Language.get('item_count'		, '건별품목수'	)
					},{	dataIndex: 'wkct_name'		, width:  60, align : 'center'	, text: Language.get('wkct_name'		, '공정상태'		)
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'cstm_lott_numb'	, width:  80, align : 'center'	, text: Language.get('cstm_lott_numb'	, 'LOT번호'		)
					},{	dataIndex: 'wkct_item_code'	, width: 120, align : 'center'	, text: Language.get('wkct_item_code'	, '품번'			)
					},{	dataIndex: 'wkct_item_name'	, width: 170, align : 'left'	, text: Language.get('wkct_item_name'	, '품명'			)
					},{	dataIndex: 'wkct_item_spec'	, width: 120, align : 'left'	, text: Language.get('wkct_item_spec'	, '규격'			), hidden : true
					},{	dataIndex: 'invc_qntt'		, width:  70, align : 'right'	, text: Language.get('invc_qntt'		, '발주수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'upid_qntt'		, width:  70, align : 'right'	, text: Language.get('upid_qntt'		, '미납수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'indn_qntt'		, width:  70, align : 'right'	, text: Language.get('indn_qntt'		, '지시수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'prod_qntt'		, width:  70, align : 'right'	, text: Language.get('prod_qntt'		, '생산수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'jan_qntt'		, width:  70, align : 'right'	, text: Language.get('jan_qntt'			, '생산잔량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'cvic_name'		, width: 100, align : 'left'	, text: Language.get('cvic_name'		, '설비명'		), hidden : true
					},{	dataIndex: 'wker_name'		, width:  80, align : 'left'	, text: Language.get('wker_name'		, '작업자'		)
					},{	dataIndex: 'strt_dttm'		, width: 130, align : 'center'	, text: Language.get('strt_dttm'		, '시작일시'		)
					},{	dataIndex: 'endd_dttm'		, width: 130, align : 'center'	, text: Language.get('endd_dttm'		, '완료(정지)일시'	)
					},{	dataIndex: 'line_seqn'		, width:  40, align : 'center'	, text: Language.get('line_seqn'		, '항번'			), hidden : true
					},{	dataIndex: 'deli_date'		, width:  95, align : 'center'	, text: Language.get('cstm_deli_date'	, '(협력사)납기일자')
					},{	dataIndex: 'cstm_offr_date'	, width:  80, align : 'center'	, text: Language.get('cstm_offr_date'	, '발주일자'		)
					},{	dataIndex: 'cstm_deli_date'	, width:  80, align : 'center'	, text: Language.get('deli_date'		, '납기일자'		) // 두인 요청사항으로 협력사 납기일자와 납기일자의 표시데이터(indexdata)를 바꿈 2020-10-07 장우영
					},{	dataIndex: 'cstm_drtr_name'	, width:  70, align : 'left'	, text: Language.get('cstm_drtr_name'	, '담당자명'		)
					},{	dataIndex: 'remk_text'		, width: 120, align : 'left'	, text: Language.get('remk_text'		, '후공정부서 및 거래처')
					},{	dataIndex: 'user_memo'		, width: 120, align : 'left'	, text: Language.get('user_memo'		, '발주품목비고'	)
					},{	dataIndex: 'deli_chge_resn'	, width: 100, align : 'left'	, text: Language.get('deli_chge_resn'	, '(협력사)변경사유'	)
					},{	dataIndex: 'sysm_memo'		, width:  80, align : 'left'	, text: Language.get('sysm_memo'		, '진행상태'		)
					}
				]
			};
		return item;
	}
});
