Ext.define('module.custom.iypkg.item.asmtmast.view.AsmtMastDetail', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-asmtmast-detail',
	store		: 'module.custom.iypkg.item.asmtmast.store.AsmtMastDetail',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					,'-','->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style', itemId : 'detail'},
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
					{	dataIndex:	'cstm_code'		, width:  80, align : 'center'		,	text: Language.get( ''		, '거래처코드'	),summaryType: 'count'
					},{	dataIndex:	'cstm_name'		, width: 200, align : 'left'		,	text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	'puch_pric'		, width:  80, align : 'right'		,	text: Language.get( ''		, '매입단가'	),xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'adpt_date'		, width:  80, align : 'center'		,	text: Language.get( ''		, '적용일자'	),
						renderer:function(val){
							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							return value;
						}
					},{	dataIndex:	'befr_pric'		, width:  80, align : 'right'		,	text: Language.get( ''		, '이전단가'	)
					},{	dataIndex:	'updt_dttm'		, width:  80, align : 'center'		,	text: Language.get( ''		, '변경일자'	),
						renderer : Ext.util.Format.dateRenderer('Y-m-d')
					}
				]
			};
		return item;
	}

 });