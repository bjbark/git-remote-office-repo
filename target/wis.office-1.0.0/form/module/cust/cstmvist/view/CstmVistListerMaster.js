Ext.define('module.cust.cstmvist.view.CstmVistListerMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmvist-lister-master',
	store		: 'module.cust.cstmvist.store.CstmVistMaster',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],
	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me  = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'cstm_idcd'			, width:  80, align : 'center' , text: Language.get( 'cstm_idcd'		, '거래처ID'		), hidden : true
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center' , text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'   , text: Language.get( 'cstm_name'		, '거래처명'		)
					},{	dataIndex:	'cstm_stnm_1fst'	, width: 100, align : 'left'   , text: Language.get( 'cstm_stnm_1fst'	, '약칭'			), hidden : true
					},{	dataIndex:	'engl_name'			, width: 180, align : 'left'   , text: Language.get( 'engl_name'		, '영문명'		), hidden : true
					},{	dataIndex:	'engl_stnm'			, width: 120, align : 'left'   , text: Language.get( 'engl_stnm'		, '영문약칭'		), hidden : true
					},{	dataIndex:	'mngt_bzpl_name'	, width: 120, align : 'left'   , text: Language.get( 'mngt_bzpl_name'	, '관리사업장명'	), hidden : true
					},{	dataIndex:	'mail_addr'			, width: 120, align : 'left'   , text: Language.get( 'mail_addr'		, '이메일주소'	), hidden : true
					},{	dataIndex:	'corp_dvcd'			, width:  80, align : 'center' , text: Language.get( 'corp_dvcd'		, '법인구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'corp_dvcd' ), hidden : true
					},{	dataIndex:	'faxi_numb'			, width: 100, align : 'center' , text: Language.get( 'faxi_numb'		, '팩스번호'		), hidden : true
					},{	dataIndex:	'home_page_addr'	, width: 100, align : 'left'   , text: Language.get( 'home_page_addr'	, '홈페이지주소'	), hidden : true
					},{	dataIndex:	'buss_numb'			, width: 100, align : 'center' , text: Language.get( 'buss_numb'		, '사업자등록번호'), hidden : true
					},{	dataIndex:	'corp_numb'			, width:  80, align : 'center' , text: Language.get( 'corp_numb'		, '법인번호'		), hidden : true
					},{	dataIndex:	'boss_name'			, width:  80, align : 'left'   , text: Language.get( 'boss_name'		, '대표자명'		), hidden : true
					},{	dataIndex:	'tele_numb'			, width: 110, align : 'center' , text: Language.get( 'tele_numb'		, '전화번호'		), hidden : true
					},{	dataIndex:	'buss_type'			, width: 100, align : 'left'   , text: Language.get( 'buss_type'		, '업태'			), hidden : true
					},{	dataIndex:	'buss_kind'			, width: 170, align : 'left'   , text: Language.get( 'buss_kind'		, '업종'			), hidden : true
					},{	dataIndex:	'sale_cstm_yorn'	, width:  60, align : 'center' , text: Language.get( 'sale_cstm_yorn'	, '매출'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'puch_cstm_yorn'	, width:  60, align : 'center' , text: Language.get( 'puch_cstm_yorn'	, '매입'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'expt_cstm_yorn'	, width:  60, align : 'center' , text: Language.get( 'expt_cstm_yorn'	, '수출'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'incm_cstm_yorn'	, width:  60, align : 'center' , text: Language.get( 'incm_cstm_yorn'	, '수입'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'etcc_cstm_yorn'	, width:  60, align : 'center' , text: Language.get( 'etcc_cstm_yorn'	, '기타'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'otod_cstm_yorn'	, width:  60, align : 'center' , text: Language.get( 'otod_cstm_yorn'	, '외주'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'rpst_cstm_idcd'	, width: 100, align : 'center' , text: Language.get( 'rpst_cstm_idcd'	, '대표거래처ID'	), hidden : true
					},{	dataIndex:	'blto_idcd_1fst'	, width: 100, align : 'center' , text: Language.get( 'blto_idcd_1fst'	, '청구처ID1'	), hidden : true
					},{	dataIndex:	'blto_idcd_2snd'	, width: 100, align : 'center' , text: Language.get( 'blto_idcd_2snd'	, '청구처ID2'	), hidden : true
					},{	dataIndex:	'scrt_sett_dvcd'	, width:  80, align : 'center' , text: Language.get( 'scrt_sett_dvcd'	, '담보설정구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup('scrt_sett_dvcd'), hidden : true
					},{	dataIndex:	'scrt_sett_amnt'	, width:  90, align : 'right'  , text: Language.get( 'scrt_sett_amnt'	, '담보설정금액'	), xtype: 'numericcolumn', summaryType: 'sum', hidden : true
					},{	dataIndex:	'cnio_dvcd'			, width: 100, align : 'center' , text: Language.get( 'cnio_dvcd'		, '국내외구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup('cnio_dvcd'), hidden : true
					},{	dataIndex:	'sale_drtr_name'	, width:  80, align : 'left'   , text: Language.get( 'sale_drtr_name'	, '영업담당자'	), hidden : true
					},{	dataIndex:	'sale_dept_name'	, width:  80, align : 'left'   , text: Language.get( 'sale_dept_name'	, '영업부서'		), hidden : true
					},{	dataIndex:	'insp_kind_dvcd'	, width: 100, align : 'center' , text: Language.get( 'insp_kind_dvcd'	, '검사종류구분'	), xtype: 'lookupcolumn', lookupValue: resource.lookup('insp_kind_dvcd'), hidden : true
					}
				]
			};
		return item;
	}
});