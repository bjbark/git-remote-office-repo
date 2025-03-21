Ext.define('module.custom.iypkg.mtrl.purc.npaysumlist.view.NpaySumListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-npaysumlist-lister',
	store		: 'module.custom.iypkg.mtrl.purc.npaysumlist.store.NpaySumList',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'cstm_name'			, width: 230, align : 'left' ,	text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'carr_amnt'			, width: 120, align : 'right',	text: Language.get( 'carr_amnt'		, '기초이월'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'befr_pric'			, width: 120, align : 'right',	text: Language.get( 'befr_pric'		, '전월잔액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'istt_amnt'			, width: 120, align : 'right',	text: Language.get( 'istt_amnt'		, '공급가액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'istt_vatx'			, width: 120, align : 'right',	text: Language.get( 'istt_vatx'		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 120, align : 'right',	text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'txbl_ttsm'			, width: 120, align : 'right',	text: Language.get( 'txbl_ttsm'		, '지급금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'unpay'				, width: 120, align : 'right',	text: Language.get( 'unpay'			, '미지급잔액'	), xtype : 'numericcolumn', summaryType: 'sum'

					}
				]
			};
		return item;
	}
 });