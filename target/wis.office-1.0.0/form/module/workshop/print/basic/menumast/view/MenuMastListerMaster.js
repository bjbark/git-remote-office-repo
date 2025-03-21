Ext.define('module.workshop.print.basic.menumast.view.MenuMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-workshop-menu-lister-master',

	store		: 'module.workshop.print.basic.menumast.store.MenuMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">메인이미지</span>'	, action : 'fileAction'		, cls: 'button1-style'	},
					'-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'}
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
					{	dataIndex:	'prnt_name'			, minWidth: 120, flex : 1, align : 'left'   , text: Language.get( 'prnt_name'      , '상위메뉴'	)
					},{	dataIndex:	'dspl_rank'			, width:  60, align : 'right'  , text: Language.get( 'dspl_rank'      , '순위'		), xtype: 'numericcolumn'
					},{	dataIndex:	'clss_name'			, minWidth: 120, flex : 1, align : 'left'   , text: Language.get( 'clss_name'      , '메뉴명'		)
					},{	dataIndex:	'esti_typl_yorn'	, width:  60, align : 'center' , text: Language.get( 'esti_typl_yorn' , '견적여부'	), xtype: 'lookupcolumn',lookupValue:resource.lookup('yorn')
					}
				]
			};
		return item;
	}
 });
