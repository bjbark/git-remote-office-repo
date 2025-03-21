Ext.define('module.basic.clssmast.view.ClssMastListerCate1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-clssmast-lister-cate1',
	store		: 'module.basic.clssmast.store.ClssMastCate1',
	border		: 0,
	title		: Language.get('clss_1','대 분류'),
	header 		: {
		titleAlign: 'center',
		baseCls : Ext.baseCSSPrefix + 'column-header',
		height 	: 22
	},
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig'  } ],

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
					{xtype	: 'tbseparator' , hidden : Boolean(_global.stor_grp != _global.stor_id) },
					{iconCls: Const.INSERT.icon, action : Const.INSERT.action , hidden : Boolean(_global.stor_grp != _global.stor_id) , width: 30} ,
					{iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , hidden : Boolean(_global.stor_grp != _global.stor_id) , width: 30} ,
					{xtype	: 'tbseparator' , hidden : Boolean(_global.stor_grp != _global.stor_id) },
					{iconCls: Const.DELETE.icon, action : Const.DELETE.action , hidden : Boolean(_global.stor_grp != _global.stor_id) , width: 30}
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
				items : [
					{	text : Language.get('clss_code','코드')	, dataIndex: 'clss_code'	, width: 70 , align : 'center'
					},{	text : Language.get('clss_name','분류명')	, dataIndex: 'clss_name'	, flex :  1
					},{	text : Language.get('line_stat','숨김')	, dataIndex: 'line_stat'	, width : 45,   xtype: 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center' }
				]
			};
		return item;
	}

});

