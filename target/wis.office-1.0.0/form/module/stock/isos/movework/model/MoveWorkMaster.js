Ext.define('module.stock.isos.movework.model.MoveWorkMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호		*/
		},{	name: 'invc_date'			, type: 'string' 	/* INVOICE일자		*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'istt_bzpl_idcd'		, type: 'string' 	/* 입고사업장ID			*/
		},{	name: 'istt_wrhs_idcd'		, type: 'string' 	/* 입고창고ID			*/
		},{	name: 'ostt_bzpl_idcd'		, type: 'string' 	/* 출고사업장ID			*/
		},{	name: 'ostt_wrhs_idcd'		, type: 'string' 	/* 출고창고ID			*/
		},{	name: 'move_hope_date'		, type: 'string' 	/* 이동희망일자			*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'trns_yorn'			, type: 'string' 	/* 수송여부				*/
		},{	name: 'reqt_dept_idcd'		, type: 'string' 	/* 요청부서ID			*/
		},{	name: 'reqt_drtr_idcd'		, type: 'string' 	/* 요청담당자ID			*/
		},{	name: 'remk_text'			, type: 'string' 	/* 비고				*/
		},{	name: 'proc_dept_idcd'		, type: 'string' 	/* 처리부서ID			*/
		},{	name: 'proc_drtr_idcd'		, type: 'string' 	/* 처리담당자ID			*/
		},{	name: 'istt_bzpl_name'		, type: 'string' 	/* istt_bzpl_name	*/
		},{	name: 'ostt_bzpl_name'		, type: 'string' 	/* ostt_bzpl_name	*/
		},{	name: 'istt_wrhs_name'		, type: 'string' 	/* istt_wrhs_name	*/
		},{	name: 'ostt_wrhs_name'		, type: 'string' 	/* ostt_wrhs_name	*/
		},{	name: 'reqt_dept_name'		, type: 'string' 	/* reqt_dept_name	*/
		},{	name: 'reqt_drtr_name'		, type: 'string' 	/* reqt_drtr_name	*/
		},{	name: 'proc_dept_name'		, type: 'string' 	/* proc_dept_name	*/
		},{	name: 'proc_drtr_name'		, type: 'string' 	/* proc_drtr_name	*/
		},{	name: 'user_memo'			, type: 'string' 	/* 사용자메모			*/
		},{	name: 'sysm_memo'			, type: 'string' 	/* 시스템메모			*/
		},{	name: 'prnt_idcd'			, type: 'string' 	/* 부모ID				*/
		},{	name: 'line_levl'			, type: 'float' 	/* ROW레벨			*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float' 	/* ROW순서			*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string' 	/* ROW상태			*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string' 	/* ROW마감			*/ , defaultValue: '0'
		},{	name: 'find_name'			, type: 'string' 	/* 찾기명				*/
		},{	name: 'updt_user_name' 		, type: 'string' 	/* 수정사용자명			*/
		},{	name: 'updt_ipad'			, type: 'string' 	/* 수정IP				*/
		},{	name: 'updt_dttm'			, type: 'string' 	/* 수정일시				*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string' 	/* 수정ID				*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string' 	/* 수정UI				*/
		},{	name: 'crte_user_name'		, type: 'string' 	/* 생성사용자명			*/
		},{	name: 'crte_ipad'			, type: 'string' 	/* 생성IP				*/
		},{	name: 'crte_dttm'			, type: 'string' 	/* 생성일시				*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string' 	/* 생성ID				*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string' 	/* 생성UI				*/
		},{	name: '_flag'				, type: 'string'
		}
	]
});