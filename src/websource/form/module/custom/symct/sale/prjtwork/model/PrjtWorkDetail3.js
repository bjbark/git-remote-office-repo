Ext.define('module.custom.symct.sale.prjtwork.model.PrjtWorkDetail3',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{name: 'work_schd_dvcd',		type: 'string'},		//작업일정구분코드
		{name: 'id',					type: 'string'},		//ID
		{name: 'seqn',					type: 'float' },		//순번
		{name: 'name',					type: 'string'},		//설계요소명
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_code',				type: 'string'},		//공정코드
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'progress',				type: 'string'},		//
		{name: 'progressbyworklog',		type: 'string'},		//
		{name: 'relevance',				type: 'float' },		//
		{name: 'type',					type: 'string'},		//
		{name: 'typeld',				type: 'string'},		//
		{name: 'description',			type: 'string'},		//
		{name: 'code',					type: 'string'},		//
		{name: 'level',					type: 'float' },		//
		{name: 'status',				type: 'string'},		//
		{name: 'depends',				type: 'string'},		//
		{name: 'start',					type: 'string'} ,		//착수예정일
		{name: 'duration',				type: 'float' },		//소요일수
		{name: 'end',					type: 'string'} ,		//종료예정일
		{name: 'startismilestone',		type: 'string'},		//
		{name: 'endismilestone',		type: 'string'},		//
		{name: 'collapsed',				type: 'string'},		//
		{name: 'canwrite',				type: 'string'},		//
		{name: 'canadd',				type: 'string'},		//
		{name: 'candelete',				type: 'string'},		//
		{name: 'canaddlssue',			type: 'string'},		//
		{name: 'haschild',				type: 'string'},		//
		{name: 'starttime',				type: 'string'},		//
		{name: 'endtime',				type: 'string'},		//
		{name: 'roleid',				type: 'string'},		//책임자id
		{name: 'rsps_name',				type: 'string'},		//책임자명
		{name: 'ivst_pcnt',				type: 'float' },		//투입인원
		{name: 'need_mnhr',				type: 'float' },		//소요공수
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
