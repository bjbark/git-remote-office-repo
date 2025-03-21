Ext.define('module.cust.cstmlist.view.CstmListDeliLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmlist-deli-lister',
	store		: 'module.cust.cstmlist.store.CstmListDeli',
	border		: 0,
	columnLines	: true,
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
				items	: [
					{	dataIndex:	'dlvy_drtr_name'		, width:  80, align : 'left'   , text: Language.get( 'dlvy_drtr_name'	, '납품담당자명'	),
					},{	dataIndex:	'trnt_mean_dvcd'		, width:  80, align : 'left'   , text: Language.get( 'trnt_mean_dvcd'	, '운송수단'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'trnt_mean_dvcd' ),
					},{	dataIndex:	'dlvy_tele_numb'		, width: 100, align : 'left'   , text: Language.get( 'dlvy_tele_numb'	, '배송전화번호'	),
					},{	dataIndex:	'dlvy_hdph_numb'		, width: 100, align : 'left'   , text: Language.get( 'dlvy_hdph_numb'	, '납품휴대폰번호'),
					},{	dataIndex:	'dlvy_faxi_numb'		, width: 100, align : 'left'   , text: Language.get( 'dlvy_faxi_numb'	, '납품팩스번호'	),
					},{	dataIndex:	'dlvy_mail_addr'		, width: 180, align : 'left'   , text: Language.get( 'dlvy_mail_addr'	, '납품이메일'	),
					},{	dataIndex:	'dlvy_zpcd'				, width: 80, align : 'left'   , text: Language.get( 'dlvy_zpcd'			, '우편번호'		),
					},{	dataIndex:	'dlvy_addr_1fst'		, flex:    3, align : 'left'   , text: Language.get( 'dlvy_addr_1fst'	, '배송주소1'	), name			: 'dlvy_addr_1fst',
					},{	dataIndex:	'dlvy_addr_2snd'		, flex :   2, align : 'left'   , text: Language.get( 'dlvy_addr_2snd'	, '배송주소2'	),
					},{	dataIndex:	'dlvy_remk_text'		, flex :   1, align : 'left'   , text: Language.get( 'dlvy_remk_text'	, '납품비고'		),
					},{	dataIndex:	'dlvy_lcal_dvcd'		, width : 100, align : 'left'   , text: Language.get( 'dlvy_lcal_dvcd'	, '배송지역'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup('dlvy_lcal_dvcd'),
					},{	dataIndex:	'rpst_dlvy_yorn'		, width:  80, align : 'left'   , text: Language.get( 'rpst_dlvy_yorn'	, '대표납품여부'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
					}
				]
			};
		return item;
	}
 });





