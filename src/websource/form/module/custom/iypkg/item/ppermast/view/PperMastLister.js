Ext.define('module.custom.iypkg.item.ppermast.view.PperMastLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-ppermast-lister',
	store		: 'module.custom.iypkg.item.ppermast.store.PperMast',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'lister'},
					'-',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'}
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
					{	dataIndex:	'pper_code'			,	text: Language.get( ''		, '원지코드'		), width: 100, align : 'center', summaryType: 'count'
					},{	dataIndex:	'pper_name'			,	text: Language.get( ''		, '원지명'		), width: 210, align : 'left'
					},{	dataIndex:	'pnyg_volm'			,	text: Language.get( ''		, '평량(g/m2)'	), width:  80, align : 'right' ,xtype:'numericcolumn'
					},{	dataIndex:	'stnd_leng'			,	text: Language.get( ''		, '표준길이/m2'	), width:  90, align : 'right' ,xtype:'numericcolumn'
					},{	dataIndex:	'kgrm_pric'			,	text: Language.get( ''		, '표준단가/Kg'	), width:  90, align : 'right' ,xtype:'numericcolumn'
					},{	dataIndex:	'tons_pric'			,	text: Language.get( ''		, '표준단가/Ton'	), width:  90, align : 'right' ,xtype:'numericcolumn'
					},{	dataIndex:	'mxm2_pric'			,	text: Language.get( ''		, '표준단가/m2'	), width:  90, align : 'right' ,xtype:'numericcolumn'
					}
				]
			};
		return item;
	}
 });