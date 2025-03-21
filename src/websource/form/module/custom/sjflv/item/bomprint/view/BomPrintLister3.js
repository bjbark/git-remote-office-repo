Ext.define('module.custom.sjflv.item.bomprint.view.BomPrintLister3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-bomprint-lister3',
	store		: 'module.custom.sjflv.item.bomprint.store.BomPrintLister3',
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
	features	: [{  ftype: 'grid-summary' } ],

	border : 0  ,
	title  : Language.get('','배합기준'),

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
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					{	text : '<span class="write-button">제품 표준서 발행</span>', action : 'printAction'	, cls: 'button-style', width : 110} ,
					'->',
					{	text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action , cls: 'button-style'	}
				]
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
				{	text : Language.get('revs_numb'	, '리비전'		) , dataIndex: 'revs_numb'	, width : 55, xtype: 'numericcolumn'
				},{	text : Language.get('adpt_date'	, '적용일자'		) , dataIndex: 'adpt_date'	, width : 80, align : 'center'
				},{	text : Language.get('line_seqn'	, '순번'			) , dataIndex: 'line_seqn'	, width : 45 ,
				},{	text : Language.get('levl_str'	, '레벨'			) , dataIndex: 'levl_str'	, width : 80
				},{	text : Language.get('item_code'	, '자재코드'		) , dataIndex: 'item_code'	, width : 70 ,   align : 'center'
				},{	text : Language.get('item_name'	, '품명'			) , dataIndex: 'item_name'	, width : 160
				},{	text : Language.get('item_spec'	, '규격'			) , dataIndex: 'item_spec'	, width : 100
				},{	text : Language.get('mixx_rate'	, '배합비'		) , dataIndex: 'mixx_rate'	, width : 60,    align : 'right'
				},{	text : Language.get('caca'		, 'CAS'			) , dataIndex: 'caca'	, width : 80
				},{	text : Language.get('fema'		, 'FEMA'		) , dataIndex: 'fema'	, width : 80
				},{	text : Language.get('wdgb'		, 'GB'			) , dataIndex: 'wdgb'	, width : 80
				},{	text : Language.get('kfda'		, 'KFDA'		) , dataIndex: 'kfda'	, width : 80
				},{	text : Language.get(''			, '담당자'		) , dataIndex: ''	, width : 80
				},{	text : Language.get('adpt_date'	, '등록일시'		) , dataIndex: 'adpt_date'	, width : 80
				}

			]
		};
		return item;
	},
});





