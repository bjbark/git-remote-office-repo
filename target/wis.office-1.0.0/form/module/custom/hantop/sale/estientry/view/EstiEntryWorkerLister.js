Ext.define('module.custom.hantop.sale.estientry.view.EstiEntryWorkerLister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-estientry-worker-lister',
	store	: 'module.custom.hantop.sale.estientry.store.EstiEntryWorkerLister',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'}],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-',
					{	text : '<span class="write-button">계산</span>'	, action : 'calAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">복사</span>'	, action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">색상일괄변경</span>'	, action : 'printAction'	, cls: 'button1-style'	} , '-',
					'->', '-',
					{	text: Const.INSERT.text , iconCls: Const.INSERT.icon , action : Const.INSERT.action ,cls: 'button-style' },
					{	text: Const.MODIFY.text , iconCls: Const.MODIFY.icon , action : Const.MODIFY.action ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},




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
					},{	dataIndex:	'item_widh'			, width :  70, align : 'right'	, text: Language.get('item_widh'			, '길이(W)'	)
					},{	dataIndex:	'item_hght'			, width :  70, align : 'right'	, text: Language.get('item_hght'			, '높이(H)'	)
					},{	dataIndex:	'item_widh_1fst'	, width :  70, align : 'right'	, text: Language.get('item_widh_1fst'		, '길이1(W)'	)
					},{	dataIndex:	'item_hght_1fst'	, width :  70, align : 'right'	, text: Language.get('item_hght_1fst'		, '높이1(H)'	)
					},{	dataIndex:	'rpst_wryp_name'	, width :  80, align : 'center'	, text: Language.get('rpst_wryp_name'		, '대표색상'	)
					},{	dataIndex:	'inwp_itid'			, width : 110, align : 'center'	, text: Language.get('inwp_itid'			, '내부랩핑'	)
					},{	dataIndex:	'otwp_itid'			, width : 110, align : 'center'	, text: Language.get('otwp_itid'			, '외부랩핑'	)
					},{	dataIndex:	'ings_tick'			, width :  80, align : 'center'	, text: Language.get('ings_tick'			, '내부유리두께'	)
					},{	dataIndex:	'otgs_tick'			, width :  80, align : 'center'	, text: Language.get('otgs_tick'			, '외부유리두께'	)
					},{	dataIndex:	'ings_itid'			, width : 100, align : 'left'	, text: Language.get('ings_itid'			, '내부유리종류'	), hidden : true
					},{	dataIndex:	'otgs_itid'			, width : 100, align : 'left'	, text: Language.get('otgs_itid'			, '외부유리종류'	), hidden : true
					},{	dataIndex:	'ings_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('ings_fixd_itid'		, '내부FIX유리종류'	), hidden : true
					},{	dataIndex:	'otgs_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('otgs_fixd_itid'		, '외부FIX유리종류'	), hidden : true
					},{	dataIndex:	'invc_qntt'			, width :  60, align : 'right'	, text: Language.get('invc_qntt'			, '수량'		)
					},{	dataIndex:	'invc_pric'			, width :  60, align : 'right'	, text: Language.get('invc_pric'			, '단가'		)
					},{	dataIndex:	'invc_amnt'			, width :  60, align : 'right'	, text: Language.get('invc_amnt'			, '금액'		)
					},{	dataIndex:	'inhd_left_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_left_itid'		, '핸들내부(좌)'), hidden : true
					},{	dataIndex:	'inhd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_righ_itid'		, '핸들내부(우)'), hidden : true
					},{	dataIndex:	'othd_left_itid'	, width : 120, align : 'left'	, text: Language.get('othd_left_itid'		, '핸들외부(좌)'), hidden : true
					},{	dataIndex:	'othd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('othd_righ_itid'		, '핸들외부(우)'), hidden : true
					},{	dataIndex:	'clee_innr'			, width :  90, align : 'left'	, text: Language.get('clee_innr'			, '크리센트(내부)'), hidden : true
					},{	dataIndex:	'clee_otsd'			, width :  90, align : 'left'	, text: Language.get('clee_otsd'			, '크리센트(외부)'), hidden : true
					},{	dataIndex:	'vent_plac_dvcd'	, width :  60, align : 'center'	, text: Language.get('vent_plac_dvcd'		, 'VENT'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('vent_plac_dvcd')
					},{	dataIndex:	'hndl_hght'			, width :  65, align : 'right'	, text: Language.get('hndl_hght'			, '핸들높이'	)
					},{	dataIndex:	'wdbf_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('wdbf_incl_yorn'		, '틀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdsf_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('wdsf_incl_yorn'		, '짝'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'moss_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('moss_incl_yorn'		, '망'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'moss_itid'			, width : 100, align : 'center'	, text: Language.get('moss_itid'			, '방충망'		)
					},{	dataIndex:	'bfrn_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('bfrn_incl_yorn'		, 'BF보강재'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'mult_hole_yorn'	, width :  60, align : 'center'	, text: Language.get('mult_hole_yorn'		, '배수홀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'efcn_grad_dvcd'	, width : 100, align : 'center'	, text: Language.get('efcn_grad_dvcd'		, '효율등급'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('efcn_grad_dvcd')
					},{	dataIndex:	'wdbf_auto_cutt_yorn', width :  80, align : 'center', text: Language.get('wdbf_auto_cutt_yorn'	, 'BF자동절단'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdbf_auto_weld_yorn', width :  80, align : 'center', text: Language.get('wdbf_auto_weld_yorn'	, 'BF자동용접'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdsf_auto_cutt_yorn', width :  80, align : 'center', text: Language.get('wdsf_auto_cutt_yorn'	, 'SF자동절단'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'wdsf_auto_weld_yorn', width :  80, align : 'center', text: Language.get('wdsf_auto_weld_yorn'	, 'SF자동용접'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'remk_text'			, width : 200, align : 'left'	, text: Language.get('remk_text'			, '비고'		)
					}
				]
			}
		;
		return item;
	},

});
