Ext.define('module.custom.aone.item.itemlist.view.ItemListMngtLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-mngtlister'			,
	store		: 'module.custom.aone.item.itemlist.store.ItemListMngt'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI'},
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
				items : [ {dataIndex:	'line_seqn'			, width:  60, align : 'center'	, text: Language.get( 'line_seqn'	, '순번'		)
					},{	dataIndex:	'item_idcd'			, width:  80 , align : 'center'	, text: Language.get( 'item_idcd'		, '품목ID'	) ,hidden : true
					},{	dataIndex:	'mngt_sbsc_name'	, width:  600, align : 'left'	, text: Language.get( 'mngt_sbsc_name'	, '관리항목명'	),
					},{	dataIndex:	'mngt_sbsc_valu'	, flex : 1   , align : 'left'	, text: Language.get( 'mngt_sbsc_valu'	, '관리항목 값'	),
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
			Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
});
