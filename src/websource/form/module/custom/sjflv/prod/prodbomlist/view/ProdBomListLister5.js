Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister5', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-prodbomlist-lister5',
	store		: 'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister5',
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
				{	text : Language.get('invc_numb' 		, '수주번호'	) , dataIndex: 'invc_numb'  	, width : 100 , align: 'center'	,
				},{	text : Language.get('line_seqn'			, '순번'		) , dataIndex: 'line_seqn'		, width : 40  , align: 'center'	,
				},{	text : Language.get('prnt_item_code'	, '제품코드'	) , dataIndex: 'prnt_item_code' , width : 100 , align : 'center'
				},{	text : Language.get('prnt_item_name'	, '제품명'		) , dataIndex: 'prnt_item_name' , width : 100 , align : 'left'
				},{	text : Language.get('ivst_item_code'	, '원료코드'	) , dataIndex: 'ivst_item_code' , width : 100 , align : 'center'
				},{	text : Language.get('ivst_item_name'	, '원료명'		) , dataIndex: 'ivst_item_name' , width : 150 , align : 'left'
				},{	text : Language.get('mixx_rate'			, '배합비'		) , dataIndex: 'mixx_rate'		, width : 80  , xtype: 'numericcolumn', format:'#,##0.#####'
				},{	text : Language.get('used_qntt'			, '사용량'		) , dataIndex: 'used_qntt'		, width : 80  , align: 'right', xtype:'numericcolumn', format:'#,##0.#####'
				},{	text : Language.get('stok_qntt'			, '재고량'		) , dataIndex: 'stok_qntt'		, width : 100  , align: 'right', xtype:'numericcolumn', format:'#,##0.#####'
				}

			]
		};
		return item;
	},
});