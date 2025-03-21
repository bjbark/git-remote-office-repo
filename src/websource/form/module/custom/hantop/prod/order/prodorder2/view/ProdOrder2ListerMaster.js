Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodorder2-lister-master',
	store		: 'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }, { ptype:'filterbar'} ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'lotddilMaster',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'-',{	text : '확정/취소',
						menu : [
								{	text : '확정', action : 'confmAction'			},
								{	text : '취소', action : 'cofmCancelAction'	}
							]
						},
					'-', '->', '-',
					{	text : '<span class="write-button">최적화</span>', action : 'reworkAction',	itemId : 'rework', cls: 'button1-style',width:70	}
					, '-',
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
					, '-',
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
					{	dataIndex: 'otmz_yorn'		, width:  60, align : 'center'	, text: Language.get('otmz_yorn'		, '최적화'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'otmz_dttm'		, width: 130, align : 'center'	, text: Language.get('otmz_dttm'		, '최적화일시'	)
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get('invc_numb'		, '계획번호'	)
					},{	dataIndex: 'plan_date'		, width: 100, align : 'center'	, text: Language.get('plan_date'		, '계획일자'	),
						renderer:function(val){
							var value;
							if(val != ''){
								value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							}else{
								value = '';
							}
							return value;
						}
					},{	dataIndex: 'cofm_yorn'		, width:  60, align : 'center'	, text: Language.get('cofm_yorn'		, '확정'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'wdbf_item_qntt'	, width:  66, align : 'right'	, text: Language.get('wdbf_item_qntt'	, 'BF품목수'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdbf_cutt_qntt'	, width:  66, align : 'right'	, text: Language.get('wdbf_cutt_qntt'	, 'BF절단수'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdbf_ndqt_ttsm'	, width:  66, align : 'right'	, text: Language.get('wdbf_ndqt_ttsm'	, 'BF길이합'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdbf_bsmt_leng'	, width:  76, align : 'right'	, text: Language.get('wdbf_bsmt_leng'	, 'BF자재길이'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdbf_bsmt_ndqt'	, width:  76, align : 'right'	, text: Language.get('wdbf_bsmt_ndqt'	, 'BF자재소요'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdbf_efcn'		, width:  60, align : 'right'	, text: Language.get('wdbf_efcn'		, 'BF효율'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdsf_item_qntt'	, width:  66, align : 'right'	, text: Language.get('wdbf_item_qntt'	, 'SF품목수'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdsf_cutt_qntt'	, width:  66, align : 'right'	, text: Language.get('wdbf_cutt_qntt'	, 'SF절단수'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdsf_ndqt_ttsm'	, width:  66, align : 'right'	, text: Language.get('wdbf_ndqt_ttsm'	, 'SF길이합'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdsf_bsmt_leng'	, width:  76, align : 'right'	, text: Language.get('wdbf_bsmt_leng'	, 'SF자재길이'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdsf_bsmt_ndqt'	, width:  76, align : 'right'	, text: Language.get('wdbf_bsmt_ndqt'	, 'SF자재소요'	), xtype:'numericcolumn',
					},{	dataIndex: 'wdsf_efcn'		, width:  60, align : 'right'	, text: Language.get('wdbf_efcn'		, 'SF효율'	), xtype:'numericcolumn',
					},{	dataIndex: 'remk_text'		, width: 200, align : 'center'	, text: Language.get('remk_text'		, '비고'		)
					}
				]
			};
		return item;
	}
});
