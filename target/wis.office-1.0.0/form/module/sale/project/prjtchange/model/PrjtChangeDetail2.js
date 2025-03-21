Ext.define('module.sale.project.prjtchange.model.PrjtChangeDetail2',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트ID
		{name: 'dsig_schd_dvcd',		type: 'string'},		//설계일정구분코드
		{name: 'id',					type: 'string'},		//id
		{name: 'seqn',					type: 'string'},		//순번
		{name: 'name',					type: 'string'},		//이름
		{name: 'progress',				type: 'string'},		//진행률
		{name: 'progressbyworklog',		type: 'string'},
		{name: 'relevance',				type: 'string'},
		{name: 'type',					type: 'string'},
		{name: 'typeld',				type: 'string'},
		{name: 'description',			type: 'string'},
		{name: 'code',					type: 'string'},
		{name: 'level',					type: 'string'},		//들여쓰기
		{name: 'status',				type: 'string'},		//작업상태
		{name: 'depends',				type: 'string'},		//날짜
		{name: 'start',					type: 'string'},		//시작
		{name: 'duration',				type: 'string'},		//기간
		{name: 'end',					type: 'string'},		//끝
		{name: 'startismilestone',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//시작기준일
		{name: 'endismilestone',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//종료기준일
		{name: 'collapsed',				type: 'string'},
		{name: 'canwrite',				type: 'string'},
		{name: 'canadd',				type: 'string'},
		{name: 'candelete',				type: 'string'},
		{name: 'canaddIssue',			type: 'string'},
		{name: 'haschild',				type: 'string'},
		{name: 'starttime',				type: 'string'},
		{name: 'endtime',				type: 'string'},
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_code',				type: 'string'},		//공정코드
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'rsps_name',				type: 'string'},		//책임자명
		{name: 'ivst_pcnt',				type: 'string'},		//투입인원
		{name: 'need_mnhr',				type: 'string'},		//소요공수
		{name: 'chge_coef',				type: 'string'},		//조정계수
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

