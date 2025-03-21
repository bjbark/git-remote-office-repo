Ext.define('module.prod.cvic.cvicanal.view.CvicAnalLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cvicanal-lister1',
	store		: 'module.prod.cvic.cvicanal.store.CvicAnal1',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
					{	dataIndex: 'cvic_code'	, text : Language.get('cvic_code'	,'설비코드'	) , width : 80 , align : 'center'
					},{ dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 1
					}
				]
			}
		;
		return item;
	}
});