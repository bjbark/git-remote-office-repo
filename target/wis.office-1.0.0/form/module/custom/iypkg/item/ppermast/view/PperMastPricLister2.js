Ext.define('module.custom.iypkg.item.ppermast.view.PperMastPricLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-ppermast-pric-lister2',
	store		: 'module.custom.iypkg.item.ppermast.store.PperMastPric2',
	border		: 0,
	columnLines	: true,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'pric'},
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
					{	dataIndex:	'cstm_name'			, width: 200, align : 'left'    , text: Language.get( 'cstm_name'	, '거래처명'		)
					},{	dataIndex:	'kgrm_pric2'		, width:  80, align : 'right'   , text: Language.get( 'kgrm_pric'	, '단가/Kg'		), xtype : 'numericcolumn',
					},{	dataIndex:	'tons_pric2'		, width:  80, align : 'right'   , text: Language.get( 'tons_pric'	, '단가/Ton'		), xtype : 'numericcolumn',
					},{	dataIndex:	'adpt_date'			, width: 100, align : 'center'  , text: Language.get( 'adpt_date'	, '적용일자'		),
						renderer : function(val){
							if(val != '' || val != null){
								return val.substr(0,4).concat('-',val.substr(4,2),'-',val.substr(6,2));
							}else{
								return null;
							}
						}
					},{	dataIndex:	'befr_kgrm_pric'	, width:  90, align : 'right'   , text: Language.get( 'kgrm_pric2'	, '이전단가/Kg'	), xtype : 'numericcolumn',
					},{	dataIndex:	'befr_tons_pric'	, width:  90, align : 'right'   , text: Language.get( 'tons_pric2'	, '이전단가/Ton'	), xtype : 'numericcolumn',
					},{	dataIndex:	'chag_date'			, width: 100, align : 'center'  , text: Language.get( 'updt_dttm'	, '변경일자'		),
					}
				]
			};
		return item;
	},

 });





