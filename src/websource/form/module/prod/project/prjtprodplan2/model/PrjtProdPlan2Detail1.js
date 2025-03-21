Ext.define('module.prod.project.prjtprodplan2.model.PrjtProdPlan2Detail1',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'pjod_idcd',			type: 'string', mapping : 'resource.pjod_idcd		'},		//프로젝트수주id
		{name: 'work_schd_dvcd',	type: 'string', mapping : 'resource.work_schd_dvcd	'},		//설계일정구분코드
		{name: 'work_stat_dvcd',	type: 'string', mapping : 'resource.work_stat_dvcd	'},		//
		{name: 'item_name',			type: 'string', mapping : 'resource.item_name		'},		//
		{name: 'item_idcd',			type: 'string', mapping : 'resource.item_idcd		'},		//
		{name: 'id',				type: 'string', mapping : 'resource.id				'},		//id
		{name: 'seqn',				type: 'float' , mapping : 'resource.seqn			'},		//seqn
		{name: 'name',				type: 'string', mapping : 'resource.name			'},		//name
		{name: 'achi_rate',			type: 'float' , mapping : 'resource.achi_rate		'},		//progress
		{name: 'progressbyworklog',	type: 'string', mapping : 'resource.progressbyworklog'},	//progressByWorklog
		{name: 'relevance',			type: 'string', mapping : 'resource.relevance		'} ,	//relevance
		{name: 'type',				type: 'string', mapping : 'resource.type			'},		//type
		{name: 'typeld',			type: 'string', mapping : 'resource.typeld			'},		//typeld
		{name: 'description',		type: 'string', mapping : 'resource.description		'},		//description
		{name: 'code',				type: 'string', mapping : 'resource.code			'},		//code
		{name: 'level',				type: 'string', mapping : 'resource.level			'},		//level
		{name: 'status',			type: 'string', mapping : 'resource.status			'},		//status
		{name: 'depends',			type: 'string', mapping : 'resource.depends			'},		//depends
		{name: 'stdt',				type: 'string', mapping : 'resource.stdt			', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//START
		{name: 'work_days',			type: 'float' , mapping : 'resource.work_days		'},		//duration
		{name: 'eddt',				type: 'string', mapping : 'resource.eddt			', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//end
		{name: 'startismilestone',	type: 'string', mapping : 'resource.startismilestone'},		//startismilestone
		{name: 'endismilestone',	type: 'string', mapping : 'resource.endismilestone	'},		//endismilestone
		{name: 'collapsed',			type: 'string', mapping : 'resource.collapsed		'},		//collapsed
		{name: 'canwrite',			type: 'string', mapping : 'resource.canwrite		'},		//canWrite
		{name: 'canadd',			type: 'string', mapping : 'resource.canadd			'},		//canAdd
		{name: 'candelete',			type: 'string', mapping : 'resource.candelete		'},		//canDelete
		{name: 'canaddlssue',		type: 'string', mapping : 'resource.canaddlssue		'},		//canaddlssue
		{name: 'haschild',			type: 'string', mapping : 'resource.haschild		'},		//hasChild
		{name: 'sttm',				type: 'string', mapping : 'resource.sttm			'},		//startTime
		{name: 'ettm',				type: 'string', mapping : 'resource.ettm			'},		//endTime
		{name: 'wkct_name',			type: 'string', mapping : 'resource.wkct_name		'},		//공정ID
		{name: 'remk_text',			type: 'string', mapping : 'resource.remk_text		'},		//
		{name: 'due_days',			type: 'float' , mapping : 'resource.due_days		'},		//지연일수
		{name: 'otod_yorn',			type: 'boolean', mapping : 'resource.otod_yorn		'},		//외주여부
		{name: 'cvic_idcd',			type: 'string' , mapping : 'resource.cvic_idcd		'},		//설비
		{name: 'cvic_name',			type: 'string' , mapping : 'resource.cvic_name		'},		//설비
		{name: 'gant_id',			type: 'string' , mapping : 'resource.gant_id		'},		//설비
		{name: 'gant_seqn',			type: 'string' , mapping : 'resource.gant_seqn		'},		//설비
		{name: 'work_ordr_dvcd',	type: 'string' , mapping : 'resource.work_ordr_dvcd	'},		//작업오더구분코드
		{name: 'ordr_degr',			type: 'string' , mapping : 'resource.ordr_degr		'},		//오더차수
		{name: 'wkct_idcd',			type: 'string' , mapping : 'resource.wkct_idcd		'},		//wkct_idcd
		{name: 'line_levl',			type: 'string' , mapping : 'resource.line_levl		'},		//line_levl
		{name: 'prnt_idcd',			type: 'string' , mapping : 'resource.prnt_idcd		'},		//prnt_idcd


		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
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
	],
	idProperty: 'id'+'prnt_idcd'
});
