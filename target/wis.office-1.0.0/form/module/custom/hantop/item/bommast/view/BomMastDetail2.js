Ext.define('module.custom.hantop.item.bommast.view.BomMastDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bommast-detail2',
	store		: 'module.custom.hantop.item.bommast.store.BomMastDetail2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
				items : [
						'->', '-',
//						{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
					]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wndw_modl_code'	, width : 100 , align : 'center'	, text : Language.get('wndw_modl_code'		,'창호모델코드'	)
					},{ dataIndex: 'wndw_modl_idcd'	, flex  :   1 , align : 'left'		, text : Language.get('modl_name'			,'모델명'			), summaryType: 'count'
					},{ dataIndex: 'wdbf_itid'		, width : 100 , align : 'left'		, text : Language.get('wdbf_itid'			,'BF품목'		)
					},{ dataIndex: 'wdsf_itid'		, width : 100 , align : 'left'		, text : Language.get('wdsf_itid'			,'SF품목'		)
					}
				]
			}
		;
		return item;
	}
});