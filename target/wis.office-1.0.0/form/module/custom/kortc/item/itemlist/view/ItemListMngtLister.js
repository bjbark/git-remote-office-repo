Ext.define('module.custom.kortc.item.itemlist.view.ItemListMngtLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-mngtlister'			,
	store		: 'module.custom.kortc.item.itemlist.store.ItemListMngt'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },

	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
							]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'item_idcd'			, width:  80 , align : 'center'	, text: Language.get( 'item_idcd'		, '순번'	) ,
					},{	dataIndex:	'mngt_sbsc_name'	, width:  400, align : 'left'	, text: Language.get( 'mngt_sbsc_name'	, '관리항목명'	),
					},{	dataIndex:	'mngt_sbsc_valu'	, flex : 1   , align : 'left'	, text: Language.get( 'mngt_sbsc_valu'	, '관리항목값'	),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true
						},
					}
				]
			}
		;
		return item;
	},

	listeners:{
		edit:function(){
			Ext.ComponentQuery.query('module-itemlist-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
});
