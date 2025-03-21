Ext.define('module.custom.aone.item.itemclass.view.ItemClassListerExcel', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-itemclass-lister-excel',
	store		: 'module.custom.aone.item.itemclass.store.ItemClassExcel',
	border 		: 0  ,
	features	: [{ ftype : 'grid-summary' , remote : true } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		//me.store = module.item.store.itemclass.ItemClass.
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
//				xtype  : 'toolbar',
//				dock   : 'bottom',
				xtype  : 'grid-paging',
//				hidden : Boolean(_global.stor_grp != '1') , /* 본사인 경우만 동작을 하도록 한다 */
				items:
				[
					'->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action  }
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items	: [
				{	text: Language.get('clss_code','코드' )	, dataIndex: 'clss_code'	, width: 100
				},{	text: Language.get('clas_levl','차수' )	, dataIndex: 'clas_levl'	, width:  50
				},{	text: Language.get('clss_name','차수명')	, dataIndex: 'clss_name'	, width: 120 ,  summaryType : 'count'
				},{	text: Language.get('clss_desc','분류명')	, dataIndex: 'clss_desc'	, flex :   1
				},{	text: Language.get('line_stat','숨김')	, dataIndex: 'line_stat'	, width:  40, align : 'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat') }
			]
		};
		return item;
	}
});


