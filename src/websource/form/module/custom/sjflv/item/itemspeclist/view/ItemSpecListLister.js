Ext.define('module.custom.sjflv.item.itemspeclist.view.ItemSpecListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemspeclist-lister',
	store		: 'module.custom.sjflv.item.itemspeclist.store.ItemSpecList',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">Specification발행</span>'	, action : 'ReportAction'	, cls: 'button1-style'	,width:  110} , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:  'line_stat'	, width: 50 , align : 'center', text : Language.get('line_stat'		,'상태'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'acct_bacd_name', width: 70, align : 'center',	text: Language.get( 'acct_bacd_name', '계정구분')
					},{	dataIndex:	'item_code'	, width: 60, align : 'left',	text: Language.get( 'item_code'		, '품목코드'	),align : 'center'
					},{	dataIndex:	'item_name'	, width: 250, align : 'left',	text: Language.get( 'item_name'		, '품명'		),align : 'left'
					},{	dataIndex:	'item_spec'	, width: 150, align : 'left',	text: Language.get( 'item_spec'		, '품목규격'	),align : 'left'
					},{	dataIndex:	'unit_name'	, width: 100, align : 'left',	text: Language.get( 'unit_name'		, '수불단위'	)
					},{	dataIndex:	'lcls_name'	, width: 100, align : 'left',	text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'	, width: 100, align : 'left',	text: Language.get( 'mcls_name'		, '중분류'		)
					},{	dataIndex:	'scls_name'	, width: 100, align : 'left',	text: Language.get( 'scls_name'		, '소분류'		)
					}
				]
			};
		return item;
	}
 });