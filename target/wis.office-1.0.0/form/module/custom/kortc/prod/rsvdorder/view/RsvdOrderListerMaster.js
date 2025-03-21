Ext.define('module.custom.kortc.prod.rsvdorder.view.RsvdOrderListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-rsvdorder-lister-master',

	store		: 'module.custom.kortc.prod.rsvdorder.store.RsvdOrderMaster',

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

					{	text : '<span class="write-button">오더 복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">오더 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
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
					{	dataIndex: 'line_clos'		, width:  70, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 140, align : 'center'	, text: Language.get('acpt_numb'		, '오더번호'		)
					},{	dataIndex: 'cstm_name'		, width: 230, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'invc_date'		, width: 130, align : 'center'	, text: Language.get('acpt_date'		, '오더일자'		)
					},{	dataIndex: 'item_cnt'		, width:  70, align : 'right'	, text: Language.get('item_cnt'			, '품목수'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			};
		return item;
	}
});
