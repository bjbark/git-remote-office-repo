Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister7', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-prodbomlist-lister7',
	store		: 'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister7',
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
	features	: [{  ftype: 'grid-summary' } ],

	border : 0  ,
	title  : Language.get('','생산원료조회'),

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
					xtype : 'grid-paging',
					items : [
						'->', '-',
						{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
					],
					pagingButton : false
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
				  {	text : Language.get('item_code'		, '원료코드'	 ) , dataIndex: 'item_code' 		, width : 100 	, align : 'center'
				},{	text : Language.get('item_name'		, '원료명'		 ) , dataIndex: 'item_name' 		, width : 200 	, align : 'left'
				},{	text : Language.get('item_spec'		, '원료규격'	 ) , dataIndex: 'item_spec' 		, width : 150 	, align : 'left'
				},{	text : Language.get('used_qntt'		, '총사용량'	 ) , dataIndex: 'used_qntt' 		, width : 80  	, align : 'right', xtype:'numericcolumn', format:'#,##0.#####'
				},{	text : Language.get('lott_numb'		, 'Batch No' ) , dataIndex: 'lott_numb' 		, width : 100	, align : 'left',					
				},{	text : Language.get('lott_used_qntt', 'Batch 사용량') , dataIndex: 'lott_used_qntt'	, width : 100  	, align : 'right', xtype:'numericcolumn', format:'#,##0.#####'
				},{	text : Language.get('stok_qntt'		, 'Batch 재고량') , dataIndex: 'stok_qntt' 		, width : 100 	, align : 'right', xtype:'numericcolumn', format:'#,##0.#####'	
				
				}
			]
		};
		return item;
	},
});