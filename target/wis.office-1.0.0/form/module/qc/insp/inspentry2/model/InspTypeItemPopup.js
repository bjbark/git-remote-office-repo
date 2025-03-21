Ext.define('module.qc.insp.inspentry2.model.InspTypeItemPopup',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'insp_type_idcd'		, type: 'string'	, defaultValue : _global.hqof_idcd		//검사유형ID
		},{	name: 'seqn'				, type: 'string'	//순번
		},{	name: 'line_seqn'			, type: 'string'	//순번
		},{	name: 'insp_sbsc_name'		, type: 'string'	//검사항목명
		},{	name: 'insp_mthd_dvcd'		, type: 'string'	//검사방법구분코드
		},{	name: 'insp_levl_uppt'		, type: 'string'	//검사수준상
		},{	name: 'insp_levl_midl'		, type: 'string'	//검사수준중
		},{	name: 'insp_levl_lprt'		, type: 'string'	//검사수준하
		},{	name: 'insp_cond'			, type: 'string'	//검사조건
		},{	name: 'rslt_iput_dvcd'		, type: 'string'	//결과입력구분코드
		},{	name: 'goal_levl'			, type: 'string'	//목표수준
		},{	name: 'uppr_valu'			, type: 'string'	//상한값
		},{	name: 'lwlt_valu'			, type: 'string' 	//하한값
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'uper_seqn'			, type: 'float'		//상위순번
		},{	name: 'disp_seqn'			, type: 'float'		//표시순번
		},{	name: 'insp_cvic_idcd'		, type: 'string'	//설비코드
		},{	name: 'cvic_name'			, type: 'string'	//설비이름
		},{	name: 'base_name'			, type: 'string'	//검사항목명
		},{	name: 'msmt_valu'			, type: 'float'		//측정값
		},{	name: 'judt_dvcd'			, type: 'string'	//판정구분
		},{	name: 'invc_numb'			, type: 'string'	//
		},{	name: 'wkct_insp_dvcd'		, type: 'string'	//검사구분
		},{	name: 'insp_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd') , serialize: Ext.util.Format.dateToStr	//검사일자
		},{	name: 'wkod_numb'			, type: 'string'	//작업지시번호
		},{	name: 'item_idcd'			, type: 'string'
		},{	name: 'lott_numb'			, type: 'string'	// lot번호
		},{	name: 'wkct_idcd'			, type: 'string'
		},{	name: 'wkct_name'			, type: 'string'
		},{	name: 'indn_qntt'			, type: 'float'		//검사수량
		},{	name: 'good_qntt'			, type: 'float'		//합격수량
		},{	name: 'poor_qntt'			, type: 'float'		//불량수량
		},{	name: 'msmt_valu_1fst'		, type: 'string'		//x1
		},{	name: 'msmt_valu_2snd'		, type: 'string'		//x2
		},{	name: 'msmt_valu_3trd'		, type: 'string'		//x3
		},{	name: 'msmt_valu_4frt'		, type: 'string'		//x4
		},{	name: 'msmt_valu_5fit'		, type: 'string'		//x5
		},{	name: 'insp_strt_time'		, type: 'string', serialize: Ext.util.Format.dateToStr	//검사시간

		},{	name: 'insp_type_name'		, type: 'string'	//검사유형명
		},{	name: 'ctq_sbsc_yorn'		, type: 'string'	//ctq 항목여부
		},{	name: 'msmt_mthd_dvcd'		, type: 'string'	//측정방법
		},{	name: 'insp_levl'			, type: 'string'	//검사수준
		},{	name: 'lott_judt_stnd'		, type: 'string'	//lot판정기준
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'	//찾기명
		},{	name: 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	//수정UI
		},{	name: 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'	//생성UI
		}
	]
});
