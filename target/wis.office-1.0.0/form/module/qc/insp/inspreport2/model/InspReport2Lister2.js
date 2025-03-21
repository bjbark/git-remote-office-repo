Ext.define('module.qc.insp.inspreport2.model.InspReport2Lister2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* INVOICE번호	*/
		},{	name: 'insp_strt_time'		, type: 'string' 	/* 검사항목순번	*/ , convert : Ext.util.Format.strToTime
		},{	name: 'insp_date'			, type: 'string' 	/* 검사일자		*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_numb'			, type: 'string' 	/* 수주번호		*/
		},{	name: 'acpt_seqn'			, type: 'string' 	/* 수주순번		*/
		},{	name: 'wkod_numb'			, type: 'string' 	/* 작업지시번호	*/
		},{	name: 'lott_numb'			, type: 'string' 	/* lot번호		*/
		},{	name: 'insp_sbsc_name'		, type: 'string' 	/* 검사항목명		*/
		},{	name: 'smli_dvcd'			, type: 'string' 	/* 초중종구분코드	*/
		},{	name: 'insp_cvic_idcd'		, type: 'string' 	/* 검사설비id	*/
		},{	name: 'insp_cond'			, type: 'string' 	/* 검사조건		*/
		},{	name: 'insp_mthd_dvcd'		, type: 'string' 	/* 검사방법구분코드*/
		},{	name: 'cvic_name'			, type: 'string' 	/* 검사장비		*/
		},{	name: 'x1'					, type: 'string' 	/* 측정값1		*/
		},{	name: 'x2'					, type: 'string' 	/* 측정값2		*/
		},{	name: 'x3'					, type: 'string' 	/* 측정값3		*/


		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue : '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/ , defaultValue : '0'
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: '_flag'				, type: 'string'
		},{	name: 'hqof_idcd'			, type: 'string', defaultValue : _global.hq_id
		}
	]
});