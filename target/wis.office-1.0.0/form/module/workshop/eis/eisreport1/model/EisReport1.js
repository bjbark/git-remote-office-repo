Ext.define('module.workshop.eis.eisreport1.model.EisReport1', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float', defaultValue : 1			//amd차수
		},{	name: 'line_seqn'			, type: 'float' , defaultValue : 1			//순번
		},{	name: 'need_dcnt'			, type: 'float' 		//소요일
		},{	name: 'dely_dcnt'			, type: 'float' 		//지연일
		},{	name: 'uper_seqn'			, type: 'int' , defaultValue : 1			//순번
		},{	name: 'disp_seqn'			, type: 'int' , defaultValue : 1			//순번
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//invoice일자
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'cstm_idcd'			, type: 'string'		//거래처코드
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납기일자
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'esti_amnt'			, type: 'float'			//견적금액
		},{	name: 'volm_qntt'			, type: 'int'			//수주량
		},{	name: 'esti_pric'			, type: 'int'			//견적단가
		},{	name: 'ttle'				, type: 'string'		//품명
		},{	name: 'prnt_colr_bacd'		, type: 'string'			//인쇄컬러분류코드
		},{	name: 'optn_psbl_yorn'		, type: 'string', defaultValue : '0'		//옵션가능여부
		},{	name: 'item_lcls_idcd'		, type: 'string'		//대분류코드
		},{	name: 'item_mcls_idcd'		, type: 'string'		//중분류코드
		},{	name: 'item_scls_idcd'		, type: 'string'		//소분류코드
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'invc_qntt'			, type: 'float'			//invoice수량
		},{	name: 'invc_pric'			, type: 'float'			//invoice단가
		},{	name: 'vatx_incl_yorn'		, type: 'string', defaultValue : '0'		//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float' , defaultValue : 0			//부가세율
		},{	name: 'colr_name'			, type: 'string'		//기초명
		},{	name: 'shet_size_dvcd'		, type: 'string'		//용지사이즈구분코드
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'invc_amnt'			, type: 'float'			//invoice금액
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'stnd_unit'			, type: 'string'		//기준단위
		},{	name: 'stnd_unit_qntt'		, type: 'float'			//기준단위수량
		},{	name: 'wrhs_idcd'			, type: 'string'		//창고ID
		},{	name: 'wrhs_name'			, type: 'string'		//창고명
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'		//납품거래처ID

		},{	name: 'dlvy_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
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
		}
	],

});