Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-prodbomlist-lister3',
	store		: 'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister3',
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
					xtype : 'grid-paging',
					items : [
						'->', '-',
						{ text : '<span class="write-button">OEM 발주서 발행</span>', action : 'printAction'	, cls: 'button-style'  ,width:105 	},
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
				{	text : Language.get('line_seqn'	, '순번'		) , dataIndex: 'line_seqn'	, width : 45  , xtype: 'numericcolumn', summaryType : 'count'
				},{	text : Language.get('acct_name'	,'계정구분'		) , dataIndex: 'acct_name'	, width : 80  , align : 'center'
				},{	text : Language.get('item_code'	, '품목코드'	) , dataIndex: 'item_code'	, width : 70  , align : 'center'
				},{	text : Language.get('item_name'	, '품명'		) , dataIndex: 'item_name'	, width : 160
				},{	text : Language.get('item_spec'	, '규격'		) , dataIndex: 'item_spec'	, width : 100
				},{	text : Language.get('mixx_rate'	, '배합비'		) , dataIndex: 'mixx_rate'	, width : 60  , xtype: 'numericcolumn', summaryType: 'sum'
				},{	text : Language.get('used_yorn'	, 'OEM'		) , dataIndex: 'used_yorn'	, width : 60  , xtype:'lookupcolumn',lookupValue:resource.lookup('yorn')
				},{	text : Language.get('caca'		, 'CAS'		) , dataIndex: 'caca'		, width : 80
				},{	text : Language.get('fema'		, 'FEMA'	) , dataIndex: 'fema'		, width : 80
				},{	text : Language.get('wdgb'		, 'GB'		) , dataIndex: 'wdgb'		, width : 80
				},{	text : Language.get('kfda'		, 'KFDA'	) , dataIndex: 'kfda'		, width : 80
				},{	text : Language.get('incm_cost'	, '수입원가'	) , dataIndex: 'incm_cost'	, width : 80  ,xtype:'numericcolumn'
				},{	text : Language.get('hala_numb'	, '할랄번호'	) , dataIndex: 'hala_numb'	, width : 120
				},{	text : Language.get('natr_name'	, '천연이름'	) , dataIndex: 'natr_name'	, width : 100
				},{	text : Language.get('adpt_date'	, '등록일시'	) , dataIndex: 'adpt_date'	, width : 80
				}

			]
		};
		return item;
	},
});