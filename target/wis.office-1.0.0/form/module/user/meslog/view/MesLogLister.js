Ext.define('module.user.meslog.view.MesLogLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-meslog-lister'			,
	store		: 'module.user.meslog.store.MesLog'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
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
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,

				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'used_dttm'		, text : Language.get('used_dttm'		,'사용일시')		, width : 140	, align : 'center'
					},{	dataIndex: 'name'			, text : Language.get(''				,'사용자명')			, width :  160
					},{ dataIndex: 'crud_dvcd'		, text : Language.get(''				,'CRUD')		, width :  50	, align : 'left'
					},{ dataIndex: 'idcd'			, text : Language.get('prgm_idcd'		,'프로그램ID')	, width : 130 , align : 'left',
					},{ dataIndex: 'program'		, text : Language.get('prgm_name'		,'프로그램명')	, width : 150
					},{ dataIndex: 'address'		, text : Language.get('used_ioad'		,'사용IP')		, width :  90	, align : 'left'
					},{ dataIndex: 'remk_text'		, text : Language.get(''				,'비고')			, flex  : 100	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});