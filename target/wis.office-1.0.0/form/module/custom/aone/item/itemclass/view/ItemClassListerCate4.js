Ext.define('module.custom.aone.item.itemclass.view.ItemClassListerCate4', { extend: 'Axt.grid.Panel',


	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-itemclass-lister-cate4',
	store		: 'module.custom.aone.item.itemclass.store.ItemClassCate4',


	border		: 0  ,
	title		: Language.get('clss_4','4차분류'),
	header		: {
		titleAlign: 'center',
		baseCls : Ext.baseCSSPrefix + 'column-header',
		height 	: 22
	},

	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				hidden	: Boolean(_global.stor_grp != _global.stor_id) , /* 본사인 경우만 동작을 하도록 한다 */
				items	: [
					'->',
					{xtype: 'tbseparator' },
					{iconCls: Const.INSERT.icon, action : Const.INSERT.action , width: 30} ,
					{iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , width: 30} ,
					{xtype: 'tbseparator'  },
					{iconCls: Const.DELETE.icon, action : Const.DELETE.action , width: 30}
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items	: [
					{	text : Language.get('clss_code','코드')	, dataIndex: 'clss_code'   	, width: 50
					},{	text : Language.get('clss_name','분류명')	, dataIndex: 'clss_name'	, flex :  1
					},{	text : Language.get('line_stat','숨김')	, dataIndex: 'line_stat'	, width : 45,   xtype: 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center' }
				]
			};
		return item;
	}
});





