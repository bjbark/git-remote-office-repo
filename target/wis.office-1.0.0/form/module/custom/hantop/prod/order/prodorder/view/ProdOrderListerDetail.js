Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder-lister-detail',
	store: 'module.custom.hantop.prod.order.prodorder.store.ProdOrderDetail',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'} ],

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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'-',
					{	text : '<span class="write-button">품목지시 취소</span>', action : 'itemCancelAction'	, cls: 'button1-style', width:90	},

					'-','->','->','->','->','-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'	}
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
					{	dataIndex:	'line_seqn'			, width :  40, align : 'center'	, text: Language.get('line_seqn'			, '순번'		)
					},{	dataIndex:	'ispl_name'			, width : 100, align : 'left'	, text: Language.get('ispl_name'			, '설치위치'	)
					},{	dataIndex:	'modl_name'			, width : 110, align : 'left'	, text: Language.get('modl_name'			, '모델명'	)
					},{	dataIndex:	'wdbf_itid'			, width : 120, align : 'left'	, text: Language.get('wdbf_itid'			, 'BF자재'	)
					},{	dataIndex:	'wdsf_itid'			, width : 120, align : 'left'	, text: Language.get('wdsf_itid'			, 'SF자재'	)
					},{	dataIndex:	'wdsf_rate_name'	, width : 120, align : 'left'	, text: Language.get('wdsf_rate_name'		, '창형태'	)  //창짝비율명
					},{	dataIndex:	'wndw_dirt_dvcd'	, width :  50, align : 'center'	, text: Language.get('wndw_dirt_dvcd'		, '창방향'	)  //창짝비율명
					},{	dataIndex:	'item_widh'			, width :  70, align : 'right'	, text: Language.get('item_widh'			, '길이(W)'	)
					},{	dataIndex:	'item_hght'			, width :  70, align : 'right'	, text: Language.get('item_hght'			, '높이(H)'	)
					},{	dataIndex:	'item_widh_1fst'	, width :  70, align : 'right'	, text: Language.get('item_widh_1fst'		, '길이1(W)'	)
					},{	dataIndex:	'item_hght_1fst'	, width :  70, align : 'right'	, text: Language.get('item_hght_1fst'		, '높이1(H)'	)
					},{	dataIndex:	'inwp_itid'			, width :  70, align : 'center'	, text: Language.get('inwp_itid'			, '내부랩핑'	)
					},{	dataIndex:	'otwp_itid'			, width :  60, align : 'center'	, text: Language.get('otwp_itid'			, '외부랩핑'	)
					},{	dataIndex:	'ings_tick'			, width :  80, align : 'center'	, text: Language.get('ings_tick'			, '내부유리두께'	)
					},{	dataIndex:	'otgs_tick'			, width :  80, align : 'center'	, text: Language.get('otgs_tick'			, '외부유리두께'	)
					},{	dataIndex:	'ings_itid'			, width : 100, align : 'left'	, text: Language.get('ings_itid'			, '내부유리종류'	)
					},{	dataIndex:	'otgs_itid'			, width : 100, align : 'left'	, text: Language.get('otgs_itid'			, '외부유리종류'	)
					},{	dataIndex:	'ings_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('ings_fixd_itid'		, '내부FIX유리종류'	)
					},{	dataIndex:	'otgs_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('otgs_fixd_itid'		, '외부FIX유리종류'	)
					},{	dataIndex:	'invc_qntt'			, width :  60, align : 'right'	, text: Language.get('invc_qntt'			, '수량'		)
					},{	dataIndex:	'inhd_left_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_left_itid'		, '핸들내부(좌)')
					},{	dataIndex:	'inhd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_righ_itid'		, '핸들내부(우)')
					},{	dataIndex:	'othd_left_itid'	, width : 120, align : 'left'	, text: Language.get('othd_left_itid'		, '핸들외부(좌)')
					},{	dataIndex:	'othd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('othd_righ_itid'		, '핸들외부(우)')
					},{	dataIndex:	'clee_innr'			, width :  90, align : 'left'	, text: Language.get('clee_innr'			, '크리센트(내부)')
					},{	dataIndex:	'clee_otsd'			, width :  90, align : 'left'	, text: Language.get('clee_otsd'			, '크리센트(외부)')
					},{	dataIndex:	'hndl_hght'			, width :  65, align : 'right'	, text: Language.get('hndl_hght'			, '핸들높이'	)
					},{	dataIndex:	'moss_itid'			, width :  60, align : 'center'	, text: Language.get('moss_itid'			, '방충망'		)
					},{	dataIndex:	'mult_hole_yorn'	, width :  60, align : 'center'	, text: Language.get('mult_hole_yorn'		, '배수홀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'efcn_grad_dvcd'	, width : 100, align : 'center'	, text: Language.get('efcn_grad_dvcd'		, '효율등급'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('efcn_grad_dvcd')
					},{	dataIndex:	'remk_text'			, width : 200, align : 'left'	, text: Language.get('remk_text'			, '비고'		)
					}
				]
			};
		return item;
	}
});
