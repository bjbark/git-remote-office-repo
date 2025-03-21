Ext.define('module.custom.iypkg.sale.sale.salesumlist.view.SaleSumListLister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-salesumlist-lister',
	store	: 'module.custom.iypkg.sale.sale.salesumlist.store.SaleSumList',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'}],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '3'){
				return 'text-warn';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-','->','->','->','->','-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
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
					{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	'prod_spec'		, width: 130, align : 'left'	, text: Language.get(''	, '상자규격'	)
					},{	dataIndex:	'cstm_name'		, width: 170, align : 'left'	, text: Language.get(''	, '매출처'		)
					},{	dataIndex:	'ostt_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '출고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_pric'		, width: 100, align : 'right'	, text: Language.get(''	, '단가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_amnt'		, width: 120, align : 'right'	, text: Language.get(''	, '공급가액'	), xtype: 'numericcolumn'
					},{	dataIndex:	'm2'			, width:  80, align : 'right'	, text: Language.get(''	, '총m2'		), xtype: 'numericcolumn'
					}
				]
			}
		;
		return item;
	}

});
