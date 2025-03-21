Ext.define('module.user.menuauth.view.MenuAuthListerMaster', {extend     : 'Ext.tree.Panel',
	alias      : 'widget.module-menuauth-lister-master',
	store      : 'module.user.menuauth.store.MenuAuthMaster',
	border     : 0,
	columnLines: true ,// 컬럼별 라인 구분
	rootVisible: false , // 최상위 node 숨김
	rowLines   : true,
	stripeRows : true,
	singleExpand : false,
	plugins    : [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.pagingItem() ];
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  item = {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var	me = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	text : Language.get('menu_nm','메뉴명') , dataIndex: 'text' , flex : 1 , xtype : 'treecolumn' // width : 247
					}
				]
			};
		return item;
	}
});