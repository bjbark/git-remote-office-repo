Ext.define('module.custom.hantop.sale.estientry.view.EstiEntryListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estientry-lister-detail',
	store: 'module.custom.hantop.sale.estientry.store.EstiEntryDetail',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }/*, { ptype:'filterbar'  }*/],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff2',
						hidden	: true,
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'-',
					{	text : '<span class="write-button">▲</span>', action : 'updownAction'	, cls: 'button1-style', width:30 , itemId:'up'		},
					'-',
					{	text : '<span class="write-button">▼</span>', action : 'updownAction'	, cls: 'button1-style', width:30 , itemId:'down'	},
					{	text : '<span class="write-button">수동/자동 전환</span>'	, action : 'changeAction'		, cls: 'button1-style',width : 90 	},
					{	text : '<span class="write-button">품목 소요량 계산</span>'	, action : 'workAction2'		, cls: 'button1-style' ,width : 110	},
					'-','->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
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
					{	dataIndex:	'line_seqn'			, width :  40, align : 'center'	, text: Language.get('line_seqn'			, '순번'		)
					},{	dataIndex:	'ispl_name'			, width : 100, align : 'center'	, text: Language.get('ispl_name'			, '설치위치'	)
					},{	dataIndex:	'base_name'			, width :  80, align : 'center'	, text: Language.get('base_name'			, '브랜드명'	)
					},{	dataIndex:	'brnd_bacd'			, width :  80, align : 'center'	, text: Language.get('brnd_bacd'			, '브랜드코드'	), hidden : true
					},{	dataIndex:	'modl_name'			, width : 110, align : 'center'	, text: Language.get('modl_name'			, '모델명'		)
					},{	dataIndex:	'wdsf_rate_name'	, width : 120, align : 'left'	, text: Language.get('wdsf_rate_name'		, '창형태'		)	//창짝비율명
					},{	dataIndex:	'wdbf_itid'			, width : 120, align : 'left'	, text: Language.get('wdbf_itid'			, 'BF자재'	)
					},{	dataIndex:	'wdsf_itid'			, width : 120, align : 'left'	, text: Language.get('wdsf_itid'			, 'SF자재'	)
					},{	dataIndex:	'item_widh'			, width :  70, align : 'right'	, text: Language.get('item_widh'			, '길이(W)'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'			, width :  70, align : 'right'	, text: Language.get('item_hght'			, '높이(H)'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_widh_1fst'	, width :  70, align : 'right'	, text: Language.get('item_widh_1fst'		, '길이1(W)'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght_1fst'	, width :  70, align : 'right'	, text: Language.get('item_hght_1fst'		, '높이1(H)'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'rpst_wryp_name'	, width :  80, align : 'center'	, text: Language.get('rpst_wryp_name'		, '대표색상'	)
					},{	dataIndex:	'inwp_itid'			, width : 110, align : 'center'	, text: Language.get('inwp_itid'			, '내부랩핑'	)
					},{	dataIndex:	'otwp_itid'			, width : 110, align : 'center'	, text: Language.get('otwp_itid'			, '외부랩핑'	)
					},{	dataIndex:	'ings_tick'			, width :  80, align : 'center'	, text: Language.get('ings_tick'			, '내부유리두께'	)
					},{	dataIndex:	'otgs_tick'			, width :  80, align : 'center'	, text: Language.get('otgs_tick'			, '외부유리두께'	)
					},{	dataIndex:	'ings_itid'			, width : 100, align : 'left'	, text: Language.get('ings_itid'			, '내부유리종류'	), hidden : true
					},{	dataIndex:	'otgs_itid'			, width : 100, align : 'left'	, text: Language.get('otgs_itid'			, '외부유리종류'	), hidden : true
					},{	dataIndex:	'ings_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('ings_fixd_itid'		, '내부FIX유리종류'	), hidden : true
					},{	dataIndex:	'otgs_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('otgs_fixd_itid'		, '외부FIX유리종류'	), hidden : true
					},{	dataIndex:	'invc_qntt'			, width :  60, align : 'right'	, text: Language.get('invc_qntt'			, '수량'		), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'wdbf_auto_cutt_yorn', width :  80, align : 'center', text: Language.get('wdbf_auto_cutt_yorn'	, 'BF자동절단'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdbf_auto_weld_yorn', width :  80, align : 'center', text: Language.get('wdbf_auto_weld_yorn'	, 'BF자동용접'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdsf_auto_cutt_yorn', width :  80, align : 'center', text: Language.get('wdsf_auto_cutt_yorn'	, 'SF자동절단'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdsf_auto_weld_yorn', width :  80, align : 'center', text: Language.get('wdsf_auto_weld_yorn'	, 'SF자동용접'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'inhd_left_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_left_itid'		, '핸들내부(좌)'), hidden : true
					},{	dataIndex:	'inhd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_righ_itid'		, '핸들내부(우)'), hidden : true
					},{	dataIndex:	'othd_left_itid'	, width : 120, align : 'left'	, text: Language.get('othd_left_itid'		, '핸들외부(좌)'), hidden : true
					},{	dataIndex:	'othd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('othd_righ_itid'		, '핸들외부(우)'), hidden : true
					},{	dataIndex:	'clee_innr'			, width :  90, align : 'left'	, text: Language.get('clee_innr'			, '크리센트(내부)'), hidden : true
					},{	dataIndex:	'clee_otsd'			, width :  90, align : 'left'	, text: Language.get('clee_otsd'			, '크리센트(외부)'), hidden : true
					},{	dataIndex:	'vent_plac_dvcd'	, width :  60, align : 'center'	, text: Language.get('vent_plac_dvcd'		, 'VENT'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('vent_plac_dvcd')
					},{	dataIndex:	'hndl_hght'			, width :  65, align : 'right'	, text: Language.get('hndl_hght'			, '핸들높이'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'wdbf_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('wdbf_incl_yorn'		, '틀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdsf_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('wdsf_incl_yorn'		, '짝'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'moss_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('moss_incl_yorn'		, '망'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'moss_itid'			, width : 100, align : 'center'	, text: Language.get('moss_itid'			, '방충망'		)
					},{	dataIndex:	'bfrn_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('bfrn_incl_yorn'		, 'BF보강재'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'mult_hole_yorn'	, width :  60, align : 'center'	, text: Language.get('mult_hole_yorn'		, '배수홀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'efcn_grad_dvcd'	, width : 100, align : 'center'	, text: Language.get('efcn_grad_dvcd'		, '효율등급'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('efcn_grad_dvcd')
					},{	dataIndex:	'remk_text'			, width : 200, align : 'left'	, text: Language.get('remk_text'			, '비고'		)
					}
				]
			};
		return item;
	}
});
