Ext.define('module.custom.kitec.prod.castchecklist.view.CastCheckListMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-castchecklist-master',
	store		: 'module.custom.kitec.prod.castchecklist.store.CastCheckListMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					'->','-' ,
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'	) , width : 150 , align : 'center',
					},{	dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'	) , width : 150 , align : 'left',
					},{	dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태'	) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd')
					},{	dataIndex: 'cvic_kind_dvcd'	, text : Language.get('cvic_kind_dvcd'	,'설비종류'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_kind_dvcd')
					}
				]
			}
		;
		return item;
	}
});