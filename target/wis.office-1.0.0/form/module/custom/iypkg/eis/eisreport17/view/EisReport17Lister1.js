Ext.define('module.custom.iypkg.eis.eisreport17.view.EisReport17Lister1', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport17-lister1',
	store		: 'module.custom.iypkg.eis.eisreport17.store.EisReport17',
	border		: 0,
	width		: 317,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.columns = me.columnItem();
		me.callParent();
	},


	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'item_name'			, width: 103, align : 'left'	, text: Language.get( ''	, '공정명'	)
					},{	dataIndex:	'line_stat'			, width: 103, align : 'left'	, text: Language.get(''		, '자체생산'	)
					},{	dataIndex:	'item_code'			, width: 103, align : 'left'	, text: Language.get(''		, '외주생산'	)
					}
				]
			};
		return item;
	}
 });