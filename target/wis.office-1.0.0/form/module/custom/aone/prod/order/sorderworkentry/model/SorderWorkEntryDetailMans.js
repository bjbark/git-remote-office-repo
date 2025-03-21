Ext.define('module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryDetailMans', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'line_seqn'			, type: 'float' , defaultValue : 0		// 순번
		},{	name: 'invc_date'			, type: 'string', serialize: Ext.util.Format.dateToStr		//INVOICE일자
		},{	name: 'work_pcnt_dvcd'		, type: 'string' 		//작업인원구분코드
		},{	name: 'work_sttm'			, type: 'string'	//작업시작시간
		},{	name: 'work_edtm'			, type: 'string'	//작업종료시간
		},{	name: 'work_pcnt'			, type: 'float' , defaultValue : 0		//작업인원
		},{	name: 'work_mnhr'			, type: 'float'	, defaultValue : 0		//작업공수
		},{	name: 'need_time'			, type: 'float'
		},{	name: 'drtr_idcd'			, type: 'string'		//담당자ID
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'uper_seqn'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'disp_seqn'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'user_idcd'			, type: 'string'		//유저ID
		},{	name: 'user_name'			, type: 'string'		//유저ID
		},{	name: 'user_memo'			, type: 'string'		//작업내용(사용자메모)
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue :  0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue :  0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue : '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : '0'		// ROW마감
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
		},{	name: 'uper_seqn'			, type: 'float'  , defaultValue : 0		//상위순번
		},{	name: 'disp_seqn'			, type: 'float'  , defaultValue : 0		//표시순번
		},{	name: 'totl_time'			, type: 'float'  ,		//총합 시간
		}
	]
});