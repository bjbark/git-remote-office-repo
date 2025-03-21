Ext.define('module.custom.hantop.item.bommast.view.BomMastDetail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bommast-detail4',
	store		: 'module.custom.hantop.item.bommast.store.BomMastDetail4',

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
						{	text : '<span class="write-button">BOM작성</span>', action : 'bomCreateAction' , cls: 'button1-style'	} ,
					]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wdtp_idcd'		, width : 100 , align : 'center'	, text : Language.get('wdtp_idcd'		,'창호형태ID'			), hidden : true
					},{	dataIndex: 'wdtp_code'		, width : 100 , align : 'center'	, text : Language.get('wdtp_code'		,'창호형태코드'		)
					},{ dataIndex: 'wdtp_name'		, flex  :   1 , align : 'left'		, text : Language.get('wdtp_name'		,'창호형태명'			), summaryType: 'count'
					}
				]
			}
		;
		return item;
	}
});