Ext.define('module.custom.aone.sale.esti.estimast.model.EstiMastMaster', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1  	//amd차수
		},{	name: 'new_amnd_degr'		, type: 'float'  	//amd차수
		},{	name: 'max_amnd_degr'		, type: 'float'  	//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장
		},{	name: 'item_cnt'			, type: 'float'		//품목수
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//invoice일자
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처id
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'esti_amnt'			, type: 'float'		//견적금액
		},{	name: 'wkct_name'			, type: 'string'	//가공비명
		},{	name: 'qntt'				, type: 'float'		//수량
		},{	name: 'pric'				, type: 'float'		//단가
		},{	name: 'amnt'				, type: 'float'		//금액
		},{	name: 'comp_prft'			, type: 'string'	//기업이윤(%)
		},{	name: 'comp_prft2'			, type: 'string'	//기업이윤금액
		},{	name: 'work_time'			, type: 'string'	//작업시간(H)
		},{	name: 'work_time2'			, type: 'string'	//작업시간단가
		},{	name: 'work_time3'			, type: 'string'	//작업시간금액
		},{	name: 'make_cost'			, type: 'string'	//가공비값
		},{	name: 'sum_ttsm_amnt'		, type: 'float'		//견적합계금액
		},{	name: 'ordr_dvcd'			, type: 'float'		//오더구분코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'esti_dvcd'			, type: 'string'	//견적구분코드
		},{	name: 'user_name'			, type: 'string'	//작성자
		},{	name: 'sale_pric'			, type: 'string'	//판매단가
		},{	name: 'esti_case_name'		, type: 'string'	//견적명
		},{	name: 'sral_numb'			, type: 'string'	//시리얼번호
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'dept_idcd'			, type: 'string'	//부서id
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자id
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'dlvy_cond'			, type: 'string'	//인도조건
		},{	name: 'esti_vald_term'		, type: 'string'	//견적유효기간
		},{	name: 'excg_rate_chge_yorn'	, type: 'string'	//환율변경여부
		},{	name: 'paym_cond'			, type: 'string'	//지불조건
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'memo'				, type: 'string'	//메모
		},{	name: 'poor_cont'			, type: 'string'	//의뢰(불량)내역
		},{	name: 'esti_amnt'			, type: 'float'		//견적금액
		},{	name: 'esti_vatx'			, type: 'float'		//견적부가세
		},{	name: 'ttsm_amnt'			, type: 'float'		//합계금액
		},{	name: 'crny_dvcd'			, type: 'string'	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float'		//환율
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue : 0		// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		},{	name: 'acpt_cofm_yorn'		, type: 'string' , defaultValue : 0		// 수주확정여부
		},{	name: 'modi_yorn'			, type: 'string' , defaultValue : 'n'	//수정 변수
		}
	]
});