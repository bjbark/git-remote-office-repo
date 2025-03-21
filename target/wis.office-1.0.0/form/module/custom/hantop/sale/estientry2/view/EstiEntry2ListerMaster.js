Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2ListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-estientry2-lister-master',
	store		: 'module.custom.hantop.sale.estientry2.store.EstiEntry2Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'}],

	viewConfig: {
		markDirty: false,
		loadMask : false
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'-',{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},'-',{	text : '확정/취소',
						menu : [
							{	text : '확정', action : 'cofmAction'			},
							{	text : '취소', action : 'cofmCancelAction'	}
						]
					},


					'-', '->', '-',
					{	text : '<span class="write-button">자재소요내역 집계표</span>', action : 'detailprintAction', cls: 'button1-style',width : 110	},
					{	text : '<span class="write-button">견적서 발행</span>', action : 'estiprintAction'	, cls: 'button1-style',width : 80	},
					{	text : '<span class="write-button">견적금액업로드</span>', action : 'priceAction'		, cls: 'button1-style',width : 90,  hidden : true 	},
					{	text : '<span class="write-button">시공 요청서 발행</span>', action : 'requestAction'	, cls: 'button1-style',width : 95 	},
					{	text : '<span class="write-button">소요량 계산</span>'	, action : 'workAction'		, cls: 'button1-style' 	},
					{	text : '<span class="write-button">엑셀업로드</span>'	, action : 'uploadAction'	, cls: 'button1-style'	},
					{	text : '<span class="write-button">견적복사</span>'		, action : 'copyAction'		, cls: 'button1-style', hidden : true 	}, '-',
					{	text : '<span class="write-button">견적서 발행</span>'	, action : 'printAction'	, cls: 'button1-style', hidden : true	}, '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' } , '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '마감'			),xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos'),filter:true
					},{	dataIndex: 'cofm_yorn'		, width:  60, align : 'center'	, text: Language.get('cofm_yorn'		, '수주확정'		),xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),filter:true
					},{	dataIndex: 'acpt_cofm_dttm'	, width: 100, align : 'center'	, text: Language.get('acpt_cofm_dttm'	, '수주확정일자'		),filter:true
					},{	dataIndex: 'work_indn_yorn'	, width:  70, align : 'center'	, text: Language.get('work_indn_yorn'	, '소요량계산'		),xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),filter:true
					},{	dataIndex: 'pror_yorn'		, width:  60, align : 'center'	, text: Language.get('pror_yorn'		, '지시확정'		),xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),filter:true
					},{	dataIndex: 'cmpl_dvcd'		, width:  60, align : 'center'	, text: Language.get('cmpl_dvcd'		, '진행상태'		),xtype : 'lookupcolumn' , lookupValue : [['1','대기'],['2','진행중'],['3','완료']],filter:true
					},{	dataIndex: 'base_name'		, width:  80, align : 'center'	, text: Language.get('base_name'		, '브랜드명'		),filter:true, xtype : 'lookupcolumn' , lookupValue : resource.lookup('brnd_bacd')
					},{	dataIndex: 'invc_numb'		, width: 150, align : 'center'	, text: Language.get('invc_numb'		, '견적번호'		),filter:true
					},{	dataIndex: 'esti_dvcd'		, width:  90, align : 'center'	, text: Language.get('esti_dvcd'		, '견적구분코드'		),xtype : 'lookupcolumn' , lookupValue : resource.lookup('esti_dvcd'),filter:true, hidden : true
					},{	dataIndex: 'cstm_name'		, width:  70, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		),filter:true
					},{	dataIndex: 'copr_stor_name'	, width: 200, align : 'left'	, text: Language.get('copr_stor_name'	, '제휴점명'		),filter:true
					},{	dataIndex: 'esti_date'		, width: 100, align : 'center'	, text: Language.get('esti_date'		, '견적일자'		),filter:true
					},{	dataIndex: 'esti_date'		, width: 100, align : 'center'	, text: Language.get('esti_date'		, '발주일자'		),filter:true
					},{	dataIndex: 'cont_schd_date'	, width: 100, align : 'center'	, text: Language.get('cont_schd_date'	, '시공일자'		),filter:true
					},{	dataIndex: 'vald_date'		, width: 100, align : 'center'	, text: Language.get('vald_date'		, '유효일자'		),filter:true
					},{	dataIndex: 'ordr_numb'		, width: 150, align : 'center'	, text: Language.get('ordr_numb'		, '고객오더번호'		),filter:true
					},{	dataIndex: 'cstm_esti_numb'	, width: 150, align : 'center'	, text: Language.get('cstm_esti_numb'	, '고객견적번호'		),filter:true
					},{	dataIndex: 'scen_addr'		, width: 220, align : 'left'	, text: Language.get(''					, '시공주소'		),filter:true
					},{	dataIndex: 'drtr_name'		, width:  90, align : 'center'	, text: Language.get('drtr_name'		, '영업자'			),filter:true
					},{	dataIndex: 'atmr_drtr_name'	, width:  90, align : 'center'	, text: Language.get('atmr_drtr_name'	, '실측자'			),filter:true
					},{	dataIndex: 'acpt_numb'		, width:  90, align : 'center'	, text: Language.get('acpt_numb'		, '실측자'			),hidden : true
					},{	dataIndex: 'bsmt_loss_rate'	, width:  80, align : 'right'	, text: Language.get('bsmt_loss_rate'	, '원자재LOSS'		),xtype: 'numericcolumn'  ,filter:true
					},{	dataIndex: 'asmt_loss_rate'	, width:  80, align : 'right'	, text: Language.get('asmt_loss_rate'	, '부자재LOSS'		),xtype: 'numericcolumn'  ,filter:true
					},{	dataIndex: 'weld_loss_rate'	, width:  80, align : 'right'	, text: Language.get('weld_loss_rate'	, '용접LOSS'		),xtype: 'numericcolumn'  ,filter:true
					},{	dataIndex: 'rein_viss_itvl'	, width:  90, align : 'right'	, text: Language.get('rein_viss_itvl'	, '보강비스간격'		),xtype: 'numericcolumn'  ,filter:true
					},{	dataIndex: 'ancr_atch_itvl'	, width:  90, align : 'right'	, text: Language.get('ancr_atch_itvl'	, '앵커부착간격'		),xtype: 'numericcolumn'  ,filter:true
					},{	dataIndex: 'remk_text'		, width: 200, align : 'center'	, text: Language.get('remk_text'		, '비고'			),filter:true
					}
				]
			};
		return item;
	}
});
