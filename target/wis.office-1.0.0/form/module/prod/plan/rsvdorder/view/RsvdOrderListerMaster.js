Ext.define('module.prod.plan.rsvdorder.view.RsvdOrderListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-rsvdorder-lister-master',

	store		: 'module.prod.plan.rsvdorder.store.RsvdOrderMaster',

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
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text : '승인/취소',
						menu : [
							{	text : '승인', action : 'okAction'		},
							{	text : '취소', action : 'okCancelAction'	}
						]
					},
					'-', '->', '-',

					{	text : '<span class="write-button">오더복사</span>'	, action : 'copyAction'			,cls: 'button1-style', hidden : true} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action	,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action	,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action	,cls: 'button-style' }
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'wrhs_code'		, width:  80, align : 'center'	, text: Language.get('wrhs_code'		, '창고코드'		)
					},{	dataIndex: 'wrhs_name'		, width: 200, align : 'left'	, text: Language.get('wrhs_name'		, '창고명'		)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('acpt_date'		, '주문일자'		)
					},{	dataIndex: 'max_deli'		, width:  80, align : 'center'	, text: Language.get('max_deli'			, '납기일자'		)
					},{	dataIndex: 'pcod_numb'		, width: 120, align : 'center'	, text: Language.get('pcod_nmbr'		, '고객주문번호'	) , hidden : true
					},{	dataIndex: 'drtr_name'		, width: 110, align : 'left'	, text: Language.get('sale_drtr'		, '영업담당'		)
					},{	dataIndex: 'user_memo'		, flex : 100, align : 'left'	, text: Language.get('user_memo'		, '비고'			)
					}
				]
			};
		return item;
	}
});
