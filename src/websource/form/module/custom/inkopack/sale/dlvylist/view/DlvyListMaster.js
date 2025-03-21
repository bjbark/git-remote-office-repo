Ext.define('module.custom.inkopack.sale.dlvylist.view.DlvyListMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inkopack-dlvylist-master',
	store		: 'module.custom.inkopack.sale.dlvylist.store.DlvyListMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		var hidden = !(_global.hqof_idcd=='N1000INKOP');
		me.paging  = me.pagingItem();
		me.columns	= me.columnItem(hidden);
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
//					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function (hidden) {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'dlvy_mthd_dvcd'	, width:  65, align: 'center'	, text: Language.get('dlvy_mthd_dvcd'	, '배송방법'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('trnt_mthd_dvcd'),
					},{	dataIndex: 'dlvy_date'		, width: 130, align: 'center'	, text: Language.get(''					, '배송일자'		)
					},{	dataIndex: 'cstm_name'		, width: 170, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: ''				, width:  80, align: 'right'	, text: Language.get(''					, 'BOX수량'		)
					},{	dataIndex: 'pric_burd_dvcd'	, width:  80, align: 'center'	, text: Language.get('pric_burd_dvcd'	, '운임부담'		) , xtype : 'lookupcolumn' , lookupValue : [['1', '자사'],['2','고객사']]
					},{	dataIndex: 'dlvy_exps'		, width:  80, align: 'right'	, text: Language.get('dlvy_exps'		, '배송비'			) , xtype : 'numericcolumn'
					},{	dataIndex: 'dlvy_addr'		, width: 250, align: 'left'		, text: Language.get('dlvy_addr'		, '주소'			)
					},{	dataIndex: 'dlvy_tele_numb'	, width: 120, align: 'center'	, text: Language.get('dlvy_tele_numb'	, '전화번호'		)
					},{	dataIndex: 'rctr_name'		, width:  90, align: 'center'	, text: Language.get('rctr_name'		, '수취인명'		)
					},{	dataIndex: 'dlvy_atcl'		, width: 200, align: 'left'		, text: Language.get('dlvy_atcl'		, '전달사항'		)
					},{	dataIndex: 'dlvy_hope_date'	, width: 130, align: 'center'	, text: Language.get('dlvy_hope_date'	, '배송희망일자'		)
					}
				]
			};
		return item;
	}
});
