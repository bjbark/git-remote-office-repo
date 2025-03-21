Ext.define('module.cust.cstmlist.view.CstmListDrtrLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmlist-drtr-lister',
	store		: 'module.cust.cstmlist.store.CstmListDrtr',
	border		: 0,
	columnLines	: true,
	features: [{ftype :'grid-summary'}],

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
				items   : [
					{	dataIndex:	'drtr_name'				, width:  80, align : 'left'   , text: Language.get( 'drtr_name'	, '담당자명'		),
					},{	dataIndex:	'wkps_name'				, width:  80, align : 'left'   , text: Language.get( 'wkps_name'	, '직위'			),
					},{	dataIndex:	'dept_name'				, width: 120, align : 'left'   , text: Language.get( 'dept_name'	, '부서명'		),
					},{	dataIndex:	'drtr_tele_numb'		, width: 100, align : 'left'   , text: Language.get( 'tele_numb'	, '전화번호'		),
					},{	dataIndex:	'drtr_hdph_numb'		, width: 100, align : 'left'   , text: Language.get( 'hdph_numb'	, '휴대폰번호'	),
					},{	dataIndex:	'drtr_faxi_numb'		, width: 100, align : 'left'   , text: Language.get( 'faxi_numb'	, '팩스번호'		),
					},{	dataIndex:	'drtr_mail_addr'		, width: 180, align : 'left'   , text: Language.get( 'mail_addr'	, '이메일'		),
					},{	dataIndex:	'drtr_dvcd'				, width: 100, align : 'left'   , text: Language.get( 'drtr_dvcd'	, '담당업무'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'drtr_dvcd' ),
					},{	dataIndex:	'rpst_drtr_yorn'		, width:  70, align : 'left'   , text: Language.get( 'rpst_drtr_yorn', '대표담당'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
					},{	dataIndex:	'remk_text'				, flex :   1, align : 'left'   , text: Language.get( 'remk_text'	, '비고'			),
					}
				]
			};
		return item;
	}
 });
