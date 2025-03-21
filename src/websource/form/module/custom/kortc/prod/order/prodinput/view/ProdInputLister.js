Ext.define('module.custom.kortc.prod.order.prodinput.view.ProdInputLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodinput-lister',

	store		: 'module.custom.kortc.prod.order.prodinput.store.ProdInput',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
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
					{	dataIndex:	''		, width:  80, align : 'center'	, text: Language.get(''	, '투입일자'	)
					},{	dataIndex:	''		, width:  80, align : 'center'	, text: Language.get(''	, '진행상태'	)
					},{	dataIndex:	''		, width: 120, align : 'left'	, text: Language.get(''	, '지시번호'	)
					},{	dataIndex:	''		, width: 130, align : 'left'	, text: Language.get(''	, '거래처명'	)
					},{	dataIndex:	''		, width: 130, align : 'left'	, text: Language.get(''	, '수주번호'	)
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	''		, width:  80, align : 'center'	, text: Language.get(''	, '규격'		)
					},{	dataIndex:	''		, width:  80, align : 'left'	, text: Language.get(''	, '차종'		)
					},{	dataIndex:	''		, width: 130, align : 'left'	, text: Language.get(''	, '모델명'		)
					},{	dataIndex:	''		, width: 130, align : 'left'	, text: Language.get(''	, '공정'		)
					},{	dataIndex:	''		, width: 130, align : 'left'	, text: Language.get(''	, '설비'		)
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '작업자'		)
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '시작일시'	)
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '종료일시'	)
					},{	dataIndex:	''		, width:  80, align : 'right'	, text: Language.get(''	, '소요시간'	)
					},{	dataIndex:	'pric_adpt'		, width:  80, align : 'right'	, text: Language.get(''	, '지시수량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'optn_dvcd'		, width:  80, align : 'right'	, text: Language.get(''	, '생산수량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'optn_dvcd'		, width: 130, align : 'right'	, text: Language.get(''	, '양품수량'), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
						renderer:function(val){
							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							return value;
						}
					}
				]
			};
		return item;
	}
});
