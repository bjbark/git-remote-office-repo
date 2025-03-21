Ext.define('module.qc.basic.iteminspstd.view.ItemInspStdItem1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-iteminspstd-lister-item1'			,
	store		: 'module.qc.basic.iteminspstd.store.ItemInspStdItem1'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	title  		:  Language.get('','등록품목'),
	header 		: {
		titleAlign: 'center',
		baseCls : Ext.baseCSSPrefix + 'column-header',
		height 	: 22

	},
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults : {style: 'text-align: center'},
				items : [
					{	dataIndex: 'insp_type_idcd'	, text : Language.get('insp_type_idcd'	,'검사유형id')	, width : 150 , align : 'center',hidden : true
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드')	, width :100  , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')		, width :250  , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'품목규격')	, flex	: 1   , minWidth	: 90
					}
				]
			}
		;
		return item;
	}
});