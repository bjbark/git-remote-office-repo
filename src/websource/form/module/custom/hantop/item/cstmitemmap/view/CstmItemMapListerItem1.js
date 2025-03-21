Ext.define('module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmitemmap-lister-item1',
	store		: 'module.custom.hantop.item.cstmitemmap.store.CstmItemMapItem1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-cstmitemmap-lister-item'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_idcd'	, text : Language.get('item_idcd'	,'품목id') , width : 200 , align : 'left',hidden : true
					},{	dataIndex: 'brnd_name'	, text : Language.get('brnd_name'	,'브랜드') , width : 70 , align : 'left'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드') , width : 200 , align : 'left'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품목명'	) , width : 230 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'	) , width : 100 , align : 'left'
					},{ dataIndex: 'cont_pric'	, text : Language.get('cont_pric'	,'계약단가') , width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'기타사항') , flex  : 100 , minWidth:80, align : 'left'
					}
				]
			}
		;
		return item;
	}
});
