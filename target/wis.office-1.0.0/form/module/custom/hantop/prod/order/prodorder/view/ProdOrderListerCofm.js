Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofm', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodorder-lister-cofm',
	store		: 'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofm',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'} ],

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
						toggleGroup:'cofm',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'-'
					, '->', '-',
					{	text : '<span class="write-button">최적화</span>'	, action : 'reworkAction'		,itemId : 'cofm', cls: 'button1-style' 	},
					,'-',
					{	text : '<span class="write-button">확정</span>'		, action : 'cofm'				,itemId : 'cofms', cls: 'button1-style' 	},
					,'-',
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
					{	dataIndex: 'pror_yorn'		, width:  60, align : 'center'	, text: Language.get('pror_yorn'		, '지시확정'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('invc_numb'		, '창호견적번호'	)
					},{	dataIndex: 'esti_dvcd'		, width:  90, align : 'center'	, text: Language.get('esti_dvcd'		, '견적구분코드'	) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('esti_dvcd')
					},{	dataIndex: 'copr_stor_name'	, width: 180, align : 'left'	, text: Language.get('copr_stor_name'	, '제휴점명'		)
					},{	dataIndex: 'esti_date'		, width: 100, align : 'center'	, text: Language.get('esti_date'		, '발주일자'		)
					},{	dataIndex: 'cont_schd_date'	, width: 100, align : 'center'	, text: Language.get('cont_schd_date'	, '시공일자'		)
					},{	dataIndex: 'vald_date'		, width: 100, align : 'center'	, text: Language.get('vald_date'		, '유효일자'		)
					},{	dataIndex: 'ordr_numb'		, width: 100, align : 'center'	, text: Language.get('ordr_numb'		, '오더번호'		)
					},{	dataIndex: 'cstm_esti_numb'	, width: 150, align : 'center'	, text: Language.get('cstm_esti_numb'	, '고객견적번호'	)
					},{	dataIndex: 'scen_addr'		, width: 360, align : 'left'	, text: Language.get(''					, '시공주소'		)
					},{	dataIndex: 'drtr_name'		, width:  90, align : 'center'	, text: Language.get('drtr_name'		, '영업자'		)
					},{	dataIndex: 'atmr_drtr_name'	, width:  90, align : 'center'	, text: Language.get('atmr_drtr_name'	, '실측자'		)

					},{	dataIndex: 'bsmt_loss_rate'	, width:  80, align : 'right'	, text: Language.get('bsmt_loss_rate'	, '원자재LOSS'	), xtype: 'numericcolumn'
					},{	dataIndex: 'asmt_loss_rate'	, width:  80, align : 'right'	, text: Language.get('asmt_loss_rate'	, '부자재LOSS'	), xtype: 'numericcolumn'
					},{	dataIndex: 'weld_loss_rate'	, width:  80, align : 'right'	, text: Language.get('weld_loss_rate'	, '용접LOSS'		), xtype: 'numericcolumn'
					},{	dataIndex: 'rein_viss_itvl'	, width:  90, align : 'right'	, text: Language.get('rein_viss_itvl'	, '보강비스간격'	), xtype: 'numericcolumn'
					},{	dataIndex: 'ancr_atch_itvl'	, width:  90, align : 'right'	, text: Language.get('ancr_atch_itvl'	, '앵커부착간격'	), xtype: 'numericcolumn'
					},{	dataIndex: 'remk_text'		, width: 200, align : 'center'	, text: Language.get('remk_text'		, '비고'			)
					}
				]
			};
		return item;
	}
});
