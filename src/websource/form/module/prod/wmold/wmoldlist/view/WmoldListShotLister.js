Ext.define('module.prod.wmold.wmoldlist.view.WmoldListShotLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wmoldlist-shot-lister',
	store		: 'module.prod.wmold.wmoldlist.store.WmoldListShot',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId	: 'detail' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'seq'			, text : Language.get('seq'				,'순번'		)	, width :  40 , align : 'center'
					},{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		)	, width :  80 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center',hidden:true
					},{ dataIndex: 'invc_date'		, text : Language.get('date'			,'일자'		)	, width : 100 , align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'작업번호'	)	, width : 160 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		)	, flex  :   1 , minWidth: 120
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	)	, width : 120 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'작업품명'	)	, flex  :   1 , minWidth: 120
					},{ dataIndex: 'work_shot'		, text : Language.get('work_shot'		,'작업SHOT'	)	, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'updt_shot'		, text : Language.get('updt_shot'		,'수정SHOT'	)	, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'temp_totl_shot'	, text : Language.get('temp_totl_shot'	,'누계SHOT'	)	, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'totl_shot'		, text : Language.get('totl_shot'		,'누계SHOT'	)	, width : 100 , xtype : 'numericcolumn',hidden:true,
					}
				]
			}
		;
		return item;
	}
});