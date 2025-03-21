Ext.define('module.custom.iypkg.item.asmtmast.view.AsmtMastMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-asmtmast-master',
	store		: 'module.custom.iypkg.item.asmtmast.store.AsmtMast',
	border		: 0,
	columnLines	: true,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
				pagingButton : false,
				items : [
					,'-','->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'master'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'asmt_code'			, width:  80, align : 'center'		,	text: Language.get( ''		, '부자재코드'	),summaryType: 'count'
					},{	dataIndex:	'asmt_dvcd'			, width:  80, align : 'left'		,	text: Language.get( ''		, '자재구분'	),xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{	dataIndex:	'asmt_name'			, width: 200, align : 'left'		,	text: Language.get( ''		, '자재명'	)
					},{	dataIndex:	'asmt_spec'			, width: 120, align : 'left'		,	text: Language.get( ''		, '규격'		)
					},{	dataIndex:	'unit_name'			, width:  60, align : 'left'		,	text: Language.get( ''		, '단위'		)
					},{	dataIndex:	'stnd_pric'			, width:  80, align : 'right'		,	text: Language.get( ''		, '표준단가'	),xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}

 });