Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder2-lister-detail',
	store: 'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail',

	border		: 0 ,
	columnLines	: true ,
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
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'-','->',
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
					{	dataIndex: 'invc_numb'			, width: 110, align : 'center'	, text: Language.get('invc_numb'		, '견적번호'		)
					},{	dataIndex: 'line_seqn'			, width:  40, align : 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex: 'ispl_name'			, width: 100, align : 'left'	, text: Language.get('ispl_name'		, '설치위치'		)
					},{	dataIndex: 'modl_name'			, width: 110, align : 'left'	, text: Language.get('modl_name'		, '모델명'			)
					},{	dataIndex: 'wdbf_itid'			, width: 120, align : 'left'	, text: Language.get('wdbf_itid'		, 'BF자재'		)
					},{	dataIndex: 'wdsf_itid'			, width: 120, align : 'left'	, text: Language.get('wdsf_itid'		, 'SF자재'		)
					},{	dataIndex: 'wdsf_rate_name'		, width:  80, align : 'center'	, text: Language.get('wdsf_rate_name'	, '창형태'			)  //창짝비율명
					},{	dataIndex: 'wndw_dirt_dvcd'		, width:  50, align : 'center'	, text: Language.get('wndw_dirt_dvcd'	, '창방향'			)  //창짝비율명
					},{	dataIndex: 'item_widh'			, width:  70, align : 'right'	, text: Language.get('item_widh'		, '길이(W)'		)
					},{	dataIndex: 'item_hght'			, width:  70, align : 'right'	, text: Language.get('item_hght'		, '높이(H)'		)
					},{	dataIndex: 'item_widh_1fst'		, width:  70, align : 'right'	, text: Language.get('item_widh_1fst'	, '길이1(W)'		)
					},{	dataIndex: 'item_hght_1fst'		, width:  70, align : 'right'	, text: Language.get('item_hght_1fst'	, '높이1(H)'		)
					},{	dataIndex: 'inwp_itid'			, width:  70, align : 'center'	, text: Language.get('inwp_itid'		, '내부랩핑'		)
					},{	dataIndex: 'otwp_itid'			, width:  60, align : 'center'	, text: Language.get('otwp_itid'		, '외부랩핑'		)
					},{	dataIndex: 'ings_tick'			, width:  80, align : 'center'	, text: Language.get('ings_tick'		, '내부유리두께'		)
					},{	dataIndex: 'otgs_tick'			, width:  80, align : 'center'	, text: Language.get('otgs_tick'		, '외부유리두께'		)
					},{	dataIndex: 'ings_itid'			, width: 100, align : 'left'	, text: Language.get('ings_itid'		, '내부유리종류'		)
					},{	dataIndex: 'invc_qntt'			, width:  60, align : 'right'	, text: Language.get('invc_qntt'		, '수량'			)
					},{	dataIndex: 'moss_itid'			, width:  60, align : 'center'	, text: Language.get('moss_itid'		, '방충망'			)
					},{	dataIndex: 'copr_stor_name'		, width: 140, align : 'left'	, text: Language.get('copr_stor_name'	, '제휴점명'		)
					},{	dataIndex: 'vald_date'			, width:  90, align : 'center'	, text: Language.get('vald_date'		, '유효일자'		)
					},{	dataIndex: 'cont_schd_date'		, width:  90, align : 'center'	, text: Language.get('cont_schd_date'	, '시공일자'		)
					},{	dataIndex: 'cstm_esti_numb'		, width: 120, align : 'center'	, text: Language.get('cstm_esti_numb'	, '고객견적번호'		)
					},{	dataIndex: 'scen_addr_1fst'		, width: 300, align : 'left'	, text: Language.get('scen_addr_1fst'	, '시공주소'		)
					},{	dataIndex: 'remk_text'			, width: 200, align : 'left'	, text: Language.get('remk_text'		, '비고'			)
					}
				]
			};
		return item;
	}
});
