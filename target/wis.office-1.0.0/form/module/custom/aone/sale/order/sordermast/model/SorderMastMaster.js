Ext.define('module.custom.aone.sale.order.sordermast.model.SorderMastMaster', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1,		//amend차수(재수리 차수)
		},{	name: 'ordr_dvcd'			, type: 'string'	//수주구분
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue: 1,
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0010',//진행상태
		},{	name: 'repa_stat_dvcd'		, type: 'string'	//수리상태
//		},{	name: 'item_cnt'			, type: 'float'  	//품목수
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'),convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//invoice일자
		},{ name: 'istt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//입고등록일자
		},{	name: 'brin_yorn'			, type: 'string' 	//반입여부
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처id
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'esti_dvcd'			, type: 'string'	//견적구분코드
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'deli_date2'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'ostt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//출고일자
		},{	name: 'dept_idcd'			, type: 'string'	//부서id
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자id
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'dlvy_cond'			, type: 'string'	//인도조건
		},{	name: 'esti_vald_term'		, type: 'string'	//견적유효기간
		},{	name: 'excg_rate_chge_yorn'	, type: 'string'	//환율변경여부
		},{	name: 'paym_cond'			, type: 'string'	//지불조건
		},{	name: 'remk_text'			, type: 'string'	//고장증상
		},{	name: 'memo'				, type: 'string'	//메모
		},{	name: 'acpt_case_name'		, type: 'string'	//수주건명
		},{	name: 'crny_dvcd'			, type: 'string'	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float'		//환율
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue :'0'	// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue :'0'	// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue :'0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue :'0'	// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
//		},{	name: 'acpt_cofm_yorn'		, type: 'string'	// 수주확정여부
		},{	name: 'modify'				, type: 'string', defaultValue : 'n'		//수정 변수
		},{	name: 'acpt_dvcd'			, type: 'string',   //수주구분
		},{	name: 'sral_numb'			, type: 'string'	//시리얼번호
		},{	name: 'item_imge'			, type: 'string'	//수리전 이미지1
		},{	name: 'item_imge2'			, type: 'string'	//수리전 이미지2
		},{	name: 'item_imge3'			, type: 'string'	//수리후 이미지1
		},{	name: 'item_imge4'			, type: 'string'	//수리후 이미지2
		},{	name: 'invc_qntt'			, type: 'float' , defaultValue : '1'		//수량
		},{	name: 'item_idcd'			, type: 'string'	//품목ID
		},{	name: 'item_code'			, type: 'string'	//품목코드
		},{	name: 'item_name'			, type: 'string'	//품명
		},{	name: 'item_spec'			, type: 'string'	//품목규격
		},{	name: 'prod_drtr_idcd'		, type: 'string'	//엔지니어ID
		},{	name: 'prod_drtr_name'		, type: 'string'	//엔지니어
//		},{	name: 'wkod_numb'			, type: 'string'	//작업지시번호
//		},{	name: 'wkod_seqn'			, type: 'float'		//작업지시순번
		},{	name: 'work_strt_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime     //작업시작일시
		},{	name: 'work_endd_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime     //작업종료일시
		},{	name: 'need_time'			, type: 'string' , format : '#,##0',		//작업시간
//		},{	name: 'comp_prft'			, type: 'float'
//		},{	name: 'comp_prft2'			, type: 'float'
//		},{	name: 'work_time'			, type: 'float'
//		},{	name: 'work_time2'			, type: 'float'
//		},{	name: 'work_time3'			, type: 'float'
		},{	name: 'make_cost'			, type: 'float'			//견적비
		},{	name: 'pric_time'			, type: 'float'			//시간 단가(수리비)
		},{	name: 'psep_exps_amnt'		, type: 'float'			//인건비(수리비)
		},{	name: 'prts_repa_amnt'		, type: 'float'			//부품비(수리비)
		},{	name: 'etcc_repa_amnt'		, type: 'float'			//공과잡비(수리비)
		},{	name: 'entp_pfit_amnt'		, type: 'float'			//기업마진(수리비)
		},{	name: 'repa_exps_amnt'		, type: 'float'			//수리비
		},{	name: 'invc_amnt'			, type: 'float'			//수리비
		},{	name: 'imge_numb'			, type: 'string'		//이미지넘버(invc_numb)
		},{	name: 'bill_publ_yorn'		, type: 'string'		//청구유무
		},{	name: 'bill_date'			, type: 'string',convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//청구일
		},{	name: 'bill_amnt'			, type: 'float'		//청구비
		},{	name: 'wrhs_idcd'			, type: 'string'	//창고ID
		},{	name: 'zone_idcd'			, type: 'string'	//구역ID
		}
	]
});