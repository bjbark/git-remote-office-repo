Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail4', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-lister-detail4',
	store: 'module.custom.aone.sale.esti.estimast.store.EstiMastDetail4',

	selModel 	: { selType: 'rowmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [ '->', '-','-' ],
				pagingButton : false
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_numb'		, width : 60 , align : 'center'		, text: Language.get('invc_numb'		, '견적번호'), hidden : true
					},{ dataIndex:	'amnd_degr'		, width : 40 , align : 'center'		, text: Language.get('amnd_degr'		, '차수'	), hidden : true
					},{ dataIndex:	'esti_case_name', width : 130 , align : 'center'	, text: Language.get('esti_case_name'	, '견적명'	), hidden : true
					},{ dataIndex:	'cstm_idcd'		, width : 50 , align : 'center'		, text: Language.get('cstm_idcd'		, '거래처ID'), hidden : true
					},{ dataIndex:	'cstm_name'		, width : 130 , align : 'center'	, text: Language.get('cstm_name'		, '거래처명'), hidden : true
					},{ dataIndex:	'user_name'		, width : 70 , align : 'center'		, text: Language.get('user_name'		, '작성자명'), hidden : true
					},{ dataIndex:	'invc_date'		, width : 80 , align : 'center'		, text: Language.get('invc_date'		, '견적일'	), hidden : true
					},{ dataIndex:	'deli_date'		, width : 80 , align : 'center'		, text: Language.get('deli_date'		, '납기일'	), hidden : true
					},{ dataIndex:	'esti_dvcd'		, width : 70 , align : 'center'		, text: Language.get('esti_dvcd'		, '견적구분'), xtype : 'lookupcolumn' , lookupValue : resource.lookup('esti_dvcd'), hidden : true
					},{ dataIndex:	'item_cnt'		, width : 50 , align : 'center'		, text: Language.get('item_cnt'			, '제품수'	), hidden : true
//					},{ dataIndex:	'esti_amnt'		, width : 100 , align : 'center'	, text: Language.get('esti_amnt'		, '견적금액')
//					},{ dataIndex:	'comp_prft'		, width : 100 , align : 'center'	, text: Language.get('comp_prft'		, '기업이윤(%)')
//					},{ dataIndex:	'comp_prft2'	, width : 100 , align : 'center'	, text: Language.get('comp_prft2'		, '기업이윤금액')
//					},{ dataIndex:	'work_time'		, width : 100 , align : 'center'	, text: Language.get('work_itme'		, '작업시간(H)')
//					},{ dataIndex:	'work_time2'	, width : 100 , align : 'center'	, text: Language.get('work_itme'		, '작업시간단가')
//					},{ dataIndex:	'work_time3'	, width : 100 , align : 'center'	, text: Language.get('work_itme3'		, '작업시간금액')
					},{ dataIndex:	'wkct_name'		, width : 100 , align : 'center'	, text: Language.get('wkct_name'		, '기준'	)
					},{ dataIndex:	'qntt'			, width : 100 , align : 'center'	, text: Language.get('qntt'				, '단위')
					},{ dataIndex:	'pric'			, width : 100 , align : 'center'	, text: Language.get('pric'				, '단가'	)
					},{ dataIndex:	'amnt'			, width : 100 , align : 'center'	, text: Language.get('amnt'				, '금액'	)
//					},{ dataIndex:	'make_cost'		, width : 100 , align : 'center'	, text: Language.get('make_cost'		, '가공비'	)
//					},{ dataIndex:	'sum_ttstm_amnt', width : 100 , align : 'center'	, text: Language.get('sum_ttstm_amnt'	, '총액'	)
					}
				]
			};
		return item;
	}


});
