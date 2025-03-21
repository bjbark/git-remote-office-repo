Ext.define('module.cust.cstmvist.view.CstmVistListerList', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmvist-lister-list',
	store		: 'module.cust.cstmvist.store.CstmVistList',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],
	initComponent: function () {
		var me		= this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'},
					'-',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items	: [
				    {	dataIndex:	'cstm_idcd'			, width:  80, align : 'center' , text: Language.get( 'cstm_idcd'		, '거래처ID'	), hidden : true
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center' , text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'   , text: Language.get( 'cstm_name'		, '거래처명'	)
					},{dataIndex:	'vist_date'			, width:  80, align : 'center' , text: Language.get( 'vist_date'		, '방문일자'	)
					},{	dataIndex:	'vist_empy_name'	, width: 150, align : 'left'   , text: Language.get( 'vist_empy_name'	, '방문사원'	)
					},{	dataIndex:	'vist_purp_dvcd'	, width:  80, align : 'center' , text: Language.get( 'vist_purp_dvcd'	, '방문목적'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'vist_purp_dvcd' )
					},{	dataIndex:	'vist_stat_dvcd'	, width:  80, align : 'center' , text: Language.get( 'vist_stat_dvcd'	, '방문상태'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'vist_stat_dvcd' )
					},{	dataIndex:	'vist_recd'			, flex : 100, align : 'left'   , text: Language.get( 'vist_recd'		, '방문기록'	)
					},{	dataIndex:	'dwup_date'			, width:  80, align : 'center' , text: Language.get( 'dwup_date'		, '작성일자'	)
					}
				]
			};
		return item;
	}
});