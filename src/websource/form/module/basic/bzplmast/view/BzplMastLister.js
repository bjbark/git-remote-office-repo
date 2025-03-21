Ext.define('module.basic.bzplmast.view.BzplMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bzplmast-lister'			,
	store		: 'module.basic.bzplmast.store.BzplMast'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'bzpl_idcd'		, width:  80, align : 'left'	, text: Language.get( 'bzpl_idcd'      , '사업장ID'	), hidden : true
					},{	dataIndex:	'bzpl_code'		, width:  80, align : 'center'	, text: Language.get( 'bzpl_code'      , '사업장코드')
					},{	dataIndex:	'bzpl_name'		, width: 120, align : 'left'	, text: Language.get( 'bzpl_name'      , '사업장명'	)
					},{	dataIndex:	'bzct_dvcd'		, width:  80, align : 'left'	, text: Language.get( 'bzct_dvcd'      , '사업부문'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'bzct_dvcd' ), hidden : true
					},{	dataIndex:	'puch_wrhs_idcd', width:  80, align : 'left'	, text: Language.get( 'puch_wrhs_idcd' , '구매창고ID') , hidden : true
					},{	dataIndex:	'puch_wrhs_name', width: 120, align : 'left'	, text: Language.get( 'puch_wrhs_name' , '구매창고'	), hidden : true
					},{	dataIndex:	'post_code'		, width:  60, align : 'center'	, text: Language.get( 'post_code'      , '우편번호'	)
					},{	dataIndex:	'addr_1fst'		, flex :   3, align : 'left'	, text: Language.get( 'bzpl_addr'      , '사업장주소')
					},{	dataIndex:	'addr_2snd'		, flex :   2, align : 'left'	, text: Language.get( 'bzpl_addr_detl' , '사업장상세주소')
					},{	dataIndex:	'tele_numb'		, width: 100, align : 'center'	, text: Language.get( 'tele_numb'      , '전화번호'	)
					},{	dataIndex:	'faxi_numb'		, width: 100, align : 'center'	, text: Language.get( 'faxi_numb'      , '팩스번호'	)
					},{	dataIndex:	'prod_bzpl_yorn', width:  70, align : 'left'	, text: Language.get( 'prod_bzpl_yorn' , '생산사업장') , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'rpst_bzpl_yorn', width:  70, align : 'left'	, text: Language.get( 'rpst_bzpl_yorn' , '대표사업장') , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'buss_name'		, width: 120, align : 'left'	, text: Language.get( 'buss_name'      , '사업명'	)
					},{	dataIndex:	'boss_name'		, width:  80, align : 'left'	, text: Language.get( 'boss_name'      , '대표자명'	)
					},{	dataIndex:	'buss_numb'		, width:  90, align : 'left'	, text: Language.get( 'buss_numb'      , '사업자등록번호')
					},{	dataIndex:	'corp_numb'		, width: 100, align : 'left'	, text: Language.get( 'corp_numb'      , '법인번호'	)
					},{	dataIndex:	'buss_type'		, width:  70, align : 'left'	, text: Language.get( 'buss_type'      , '업태'		)
					},{	dataIndex:	'buss_kind'		, width:  70, align : 'left'	, text: Language.get( 'buss_kind'      , '업종'		)
					}
				]
			}
		;
		return item;
	}
});
