Ext.define('module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryMaster', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'),convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//invoice일자
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처id
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'deli_date2'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'pdod_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//지시일정
		},{	name: 'dept_idcd'			, type: 'string'	//부서id
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자id
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'dlvy_cond'			, type: 'string'	//인도조건
		},{	name: 'esti_vald_term'		, type: 'string'	//견적유효기간
		},{	name: 'acpt_case_name'		, type: 'string'	//주문명
		},{	name: 'excg_rate_chge_yorn'	, type: 'string'	//환율변경여부
		},{	name: 'paym_cond'			, type: 'string'	//지불조건
		},{	name: 'memo'				, type: 'string'	//메모
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
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		},{	name: 'acpt_cofm_yorn'		, type: 'string'	// 수주확정여부
		},{	name: 'modi_yorn'			, type: 'string', defaultValue : 'n'		//수정 변수
		},{	name: 'ordr_dvcd'			, type: 'string'	//상태
		},{	name: 'acpt_stat_dvcd'		, type: 'string'	//진행상태
		},{	name: 'repa_stat_dvcd'		, type: 'string'	//수리상태
		},{	name: 'acpt_dvcd'			, type: 'string'	//입고유형
		},{	name: 'item_cnt'			, type: 'float'		//품목수
		},{	name: 'clss_desc'			, type: 'string'	//수리품목
		},{	name: 'item_idcd'			, type: 'string'	//품목ID
		},{	name: 'item_name'			, type: 'string'	//품명
		},{	name: 'item_spec'			, type: 'string'	//규격
		},{	name: 'sral_numb'			, type: 'string'	//Serial No
		},{	name: 'invc_qntt'			, type: 'string'	//수량
		},{	name: 'remk_text'			, type: 'string'	//고장증상
		},{	name: 'esti_amnt'			, type: 'float'		//견적금액
		},{	name: 'prod_drtr_name'		, type: 'string'	//엔지니어 이름
		},{	name: 'prod_drtr_idcd'		, type: 'string'	//엔지니어 ID
		},{	name: 'plan_date'			, type: 'string'	//작업계획일정
		},{	name: 'need_qntt'			, type: 'float'		//부품 소요수량
		},{	name: 'line_seqn'			, type: 'float'		//
		},{	name: 'wkod_numb'			, type: 'string'	//수주 번호
		},{	name: 'wkod_seqn'			, type: 'float'		//수주 차수
		},{	name: 'work_invc_numb'		, type: 'string'	//작업보고 invc번호
		},{	name: 'entryImage'			, type: 'string'	//처리이미지1
		},{	name: 'entryImage2'			, type: 'string'	//처리이미지2
		}
	]
});