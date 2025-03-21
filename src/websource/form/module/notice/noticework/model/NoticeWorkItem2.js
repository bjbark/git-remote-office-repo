Ext.define('module.notice.noticework.model.NoticeWorkItem2',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'rank',					type: 'float' },		//순번
		{name: 'empy_idcd',				type: 'string'},		//사원ID
		{name: 'empy_name',				type: 'string'},		//사원명
		{name: 'insp_yorn',				type: 'string'},		//열람여부
		{name: 'insp_dttm',				type: 'string'},		//열람일시
		{name: 'ansr_cont',				type: 'string'},		//답내용
		{name: 'user_idcd',				type: 'string'},		//사원번호(dept_mast)
		{name: 'user_name',				type: 'string'},		//사원명(dept_mast)
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'line_seqn',				type: 'float'} ,		//순번
		{name: 'empy_dvcd',				type: 'string'},		//직원구분코드
		{name: 'empy_idcd',				type: 'string'},		//사원ID
		{name: 'empy_name',				type: 'string'},		//사원명
		{name: 'wkrn_name',				type: 'string'},		//직급
		{name: 'dept_name',				type: 'string'},		//부서

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
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
	]
});
