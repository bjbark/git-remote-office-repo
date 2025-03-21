Ext.define('module.workshop.print.basic.menumast.view.MenuMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-workshop-menu-lister-detail',

	store: 'module.workshop.print.basic.menumast.store.MenuMastDetail',

	border : 0 ,
	columnLines: true ,
	features: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'}
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'dspl_rank'			, width:  40, align : 'center' , text: Language.get( 'dspl_rank'		, '순위'			), xtype: 'numericcolumn'
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'   , text: Language.get( 'item_name'		, '제목'			)
					},{	dataIndex:	'clss_desc'			, width: 220, align : 'left'   , text: Language.get( 'clss_desc'		, '품명'			)
					},{	dataIndex:	'lkup_kind_dvcd'	, width:  90, align : 'center' , text: Language.get( 'lkup_kind_dvcd'	, '종류구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'lkup_kind_dvcd' ),
					},{	dataIndex:	'pric_dvcd'			, width:  90, align : 'center' , text: Language.get( 'pric_dvcd'		, '단가구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'pric_dvcd' ),
					}
				]
			};
		return item;
	}
 });
