Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.model.PurcOrdrCostDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'line_seqn'			, type: 'int'	, defaultValue : 1			//순번
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'istt_qntt'			, type: 'float'			//수량
		},{	name: 'istt_pric'			, type: 'float'			//단가
		},{	name: 'istt_amnt'			, type: 'float'			//금액
		},{	name: 'istt_vatx'			, type: 'float'			//금액
		},{	name: 'ttsm_amnt'			, type: 'float'			//금액
		},{	name: 'cont_pric'			, type: 'float'			//invoice단가
		},{	name: 'sett_pric'			, type: 'float'			//원화단가
		},{	name: 'sett_amnt'			, type: 'float'			//원화금액
		},{	name: 'offr_numb'			, type: 'string'
		},{	name: 'offr_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'uper_seqn'			, type: 'float'			//상위순번
		},{	name: 'disp_seqn'			, type: 'float'			//표시순번

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