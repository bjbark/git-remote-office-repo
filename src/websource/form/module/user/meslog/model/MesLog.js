Ext.define('module.user.meslog.model.MesLog',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'dept_idcd',				type: 'string'},		//부서ID
		{name: 'dept_code',				type: 'string'},		//부서ID
		{name: 'dept_name',				type: 'string'},		//부서명
		{name: 'dept_stnm',				type: 'string'},		//부서약칭
		{name: 'dept_engl_name',		type: 'string'},		//부서영문명
		{name: 'dept_engl_stnm',		type: 'string'},		//부서영문약칭
		{name: 'strt_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , //시작일자
		{name: 'endd_date',				type: 'string'},		//종료일자
		{name: 'dept_dvcd',				type: 'string'},		//부서구분코드
		{name: 'tele_numb',				type: 'string'},		//전화번호
		{name: 'faxi_numb',				type: 'string'},		//팩스번호
		{name: 'bzpl_idcd',				type: 'string'},		//사업장ID
		{name: 'exps_dvcd',				type: 'string'},		//비용구분코드
		{name: 'remk_text',				type: 'string'},		//비고
		{name: 'addr_1',				type: 'string'},		//상세주소1
		{name: 'addr_2',				type: 'string'},		//상세주소2
		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float', defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
		{name: 'prnt_dept_code',		type: 'string'},		//상위부서코드
		{name: 'prnt_dept_name',		type: 'string'},		//상위부서명
		{name: 'log_idcd',				type: 'float'},
		{name: 'used_dttm',				type: 'sting', convert : Ext.util.Format.strToDateTime},
		{name: 'user_idcd',				type: 'float' },
		{name: 'crud_dvcd',				type: 'string'},
		{name: 'idcd',					type: 'string'},
		{name: 'program',				type: 'string'},
		{name: 'address',				type: 'string' },
		{name: 'name',					type: 'string'},
	]
});
