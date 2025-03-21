Ext.define('module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Cost', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'line_seqn'			, type: 'float'	, defaultValue : 1		//
		},{	name: 'trde_exps_dvcd'		, type: 'string'	//비용구분
		},{	name: 'krwn_amnt'			, type: 'float'	, defaultValue : 0		//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'	, defaultValue : 0		//원화부가세
		},{	name: 'total'				, type: 'float'	, defaultValue : 0		//합계
		},{	name: 'paym_date'			, type: 'string' , serialize: Ext.util.Format.dateToStr//지급일
		},{	name: 'paym_cstm_name'		, type: 'string'	//지급처
		},{	name: 'orig_invc_numb'		, type: 'string'	//원invoice번호
		},{	name: 'orig_amnd_degr'		, type: 'float'	, defaultValue : 1		//원AMD차수
		},{	name: 'orig_seqn'			, type: 'float'	, defaultValue : 1		//원순번
		},{	name: 'new_invc_numb'		, type: 'string'	//




		},{	name: 'user_memo'			, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'		//찾기명
		},{	name: 'updt_user_name'		, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'		//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		},{ name: 'item_idcd'			, type: 'string'
		},{ name: 'mtrl_bacd'			, type: 'string'
		},{ name: 'mtrl_bacd_name'		, type: 'string'
		},{ name: 'item_clss_bacd'		, type: 'string'
		},{ name: 'item_bacd'			, type: 'string'
		},{ name: 'make_bacd'			, type: 'string'
		},{ name: 'srfc_proc_yorn'		, type: 'string'
		},{ name: 'emgc_yorn'			, type: 'string'
		},{ name: 'drwg_numb'			, type: 'string'
		},{ name: 'prod_lott_numb'		, type: 'string'
		},{ name: 'item_clss_bacd_name'	, type: 'string'
		},{ name: 'item_bacd_name'		, type: 'string'
		},{ name: 'make_bacd_name'		, type: 'string'
		},{ name: 'cstm_prcs_numb'		, type: 'string'
		},{ name: 'cstm_mold_code'		, type: 'string'
		},{ name: 'prod_lott_numb'		, type: 'string'
		},{ name: 'cstm_idcd'			, type: 'string'
		}
	],

});