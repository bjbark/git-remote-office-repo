Ext.define('module.custom.iypkg.item.productmast.view.ProductMastPricLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-productmast-pric-lister',
	store		: 'module.custom.iypkg.item.productmast.store.ProductMastPric',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

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
					, '-'
					, '->',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
					,{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style', itemId : 'lister'},
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
					{	dataIndex:	'cstm_name'			, width: 200, align : 'center',	text: Language.get( 'cstm_name'		, '거래처명'		), summaryType: 'count'
					},{	dataIndex:	'adpt_date'			, width:  80, align : 'left'  ,	text: Language.get( 'adpt_date'		, '적용일자'		)
					},{	dataIndex:	'sale_pric'			, width:  80, align : 'right' ,	text: Language.get( 'sale_pric'		, '판매단가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'befr_pric'			, width:  80, align : 'right' ,	text: Language.get( 'befr_pric'		, '이전단가'		), xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}
 });