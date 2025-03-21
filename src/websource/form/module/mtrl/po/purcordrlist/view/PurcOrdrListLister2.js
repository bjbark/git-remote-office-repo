Ext.define('module.mtrl.po.purcordrlist.view.PurcOrdrListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordrlist-lister2',
	store		: 'module.mtrl.po.purcordrlist.store.PurcOrdrList2',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
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

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'	, text : Language.get('line_clos'		,'마감'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos'), align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'		,'거래처명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'		,'품목코드'	) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'		,'품명'		) , width : 270 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'		,'규격'		) , width : 220 , align : 'left'
					},{ dataIndex: 'deli_date'	, text : Language.get('deli_date'		,'납기일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'offr_qntt'	, text : Language.get('offr_qntt'		,'발주수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'	, text : Language.get('istt_qntt'		,'입고수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'qntt'		, text : Language.get('upid_baln_qntt'	,'미납잔량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_numb'	, text : Language.get('offr_numb'		,'발주번호'	) , width : 150 , align : 'center'
					},{ dataIndex: 'invc_date'	, text : Language.get('offr_date'		,'발주일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});