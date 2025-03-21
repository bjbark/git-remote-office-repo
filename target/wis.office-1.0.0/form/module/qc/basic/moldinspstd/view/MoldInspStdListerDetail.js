Ext.define('module.qc.basic.moldinspstd.view.MoldInspStdListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-moldinspstd-lister-detail',
	store		: 'module.qc.basic.moldinspstd.store.MoldInspStdDetail'	,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'순번')		, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'mold_code'	, text : Language.get('acpt_numb'	,'금형코드')	, width : 100 , align : 'left'
					},{ dataIndex: 'mold_name'	, text : Language.get('acpt_case_name','금형명')	, width : 300 , align : 'left'
					},{ dataIndex: 'mold_spec'	, text : Language.get('mold_spec'	,'금형규격')	, flex  : 1   , align : 'left'
					}
				]
			}
		;
		return item;
	}
});