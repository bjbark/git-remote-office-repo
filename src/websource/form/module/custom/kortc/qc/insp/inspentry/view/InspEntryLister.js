Ext.define('module.custom.kortc.qc.insp.inspentry.view.InspEntryLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry-lister',
	store		: 'module.custom.kortc.qc.insp.inspentry.store.InspEntryLister',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
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
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'		, width:  90, align : 'center'	, text: Language.get( ''		, '입고일자'	)
					},{	dataIndex:	'lott_numb'		, width:  90, align : 'center'	, text: Language.get( ''		, 'LOT NO'	)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	'crty_bacd_name', width:  90, align : 'center'	, text: Language.get( ''		, '차종'		)
					},{	dataIndex:	'item_code'		, width:  80, align : 'center'	, text: Language.get( ''		, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 250, align : 'left'	, text: Language.get( ''		, '품명'		)
					},{	dataIndex:	'istt_qntt'		, width:  80, align : 'right'	, text: Language.get( ''		, '입고수량'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'remk_text'		, flex:    1, align : 'left'	, text: Language.get( ''		, '비고'		)
					}
				]
			};
		return item;
	}
 });