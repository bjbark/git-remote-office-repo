Ext.define('module.design.project.dsigwork.model.DsigWorkDetail2',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'pjod_idcd',			type: 'string' },		//프로젝트수주id
		{name: 'dsig_schd_dvcd',	type: 'string'},		//설계일정구분코드
		{name: 'id',				type: 'string'},		//id
		{name: 'seqn',				type: 'float' },			//seqn
		{name: 'name',				type: 'string'},		//name
		{name: 'progress',			type: 'string'},		//progress
		{name: 'progressbyworklog',	type: 'string'},		//progressByWorklog
		{name: 'relevance',			type: 'string'} ,		//relevance
		{name: 'type',				type: 'string'},		//type
		{name: 'typeld',			type: 'string'},		//typeld
		{name: 'description',		type: 'string'},		//description
		{name: 'code',				type: 'string'},		//code
		{name: 'level',				type: 'string'},		//level
		{name: 'status',			type: 'string'},		//status
		{name: 'depends',			type: 'string'},		//depends
		{name: 'start',				type: 'string'},		//START
		{name: 'duration',			type: 'float'},		//duration
		{name: 'end',				type: 'string'},		//end
		{name: 'startismilestone',	type: 'string'},		//startismilestone
		{name: 'endismilestone',	type: 'string'},		//endismilestone
		{name: 'collapsed',			type: 'string'},		//collapsed
		{name: 'canwrite',			type: 'string'},		//canWrite
		{name: 'canadd',			type: 'string'},		//canAdd
		{name: 'candelete',			type: 'string'},		//canDelete
		{name: 'canaddlssue',		type: 'string'},		//canaddlssue
		{name: 'haschild',			type: 'string'},		//hasChild
		{name: 'starttime',			type: 'string'},		//startTime
		{name: 'endtime',			type: 'string'},		//endTime
		{name: 'wkct_idcd',			type: 'string'},		//공정ID
		{name: 'rsps_name',			type: 'string'},		//책임자명
		{name: 'ivst_pcnt',			type: 'string'},		//투입인원
		{name: 'need_mnhr',			type: 'string'},		//소요공수
		{name: 'chge_coef',			type: 'string'},		//조정계수




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
