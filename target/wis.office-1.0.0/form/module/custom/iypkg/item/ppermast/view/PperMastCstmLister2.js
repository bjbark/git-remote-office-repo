Ext.define('module.custom.iypkg.item.ppermast.view.PperMastCstmLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-ppermast-cstm-lister2',
	store		: 'module.custom.iypkg.item.ppermast.store.PperMastCstm2',
	border		: 0,
	columnLines	: true,
	features: [{ftype :'grid-summary'}],
	plugins	: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'cstm'},
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{
						text	: '원단 매입처/매출처 정보',
						columns	: [
							{	dataIndex:	'cstm_name'				, width:  200, align : 'left'   , text: Language.get( 'cstm_name'	, '거래처명'		),
								sortable	: true
							}
						]
					},{
						text	: 'Loss(%)',
						columns	: [
							{	dataIndex:	'bxsw_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'SW'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxdw_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'DW'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxtw_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'TW'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxaa_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'AA골'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxee_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'E골'		), xtype : 'numericcolumn',
								sortable	: true,
							}
						]
					},{
						text	: '가공비(원)',
						columns	: [
							{	dataIndex:	'bxsw_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'SW'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxdw_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'DW'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxtw_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'TW'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxaa_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'AA골'		), xtype : 'numericcolumn',
								sortable	: true,
							},{	dataIndex:	'bxee_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'E골'		), xtype : 'numericcolumn',
								sortable	: true,
							}
						]
					}
				]
			};
		return item;
	},

 });
