Ext.define('module.notice.dailyreport.model.DailyReport',{ extend:'Axt.data.Model',
	fields : [
		{name: 'user_idcd',			type: 'string'}, //사용자ID
		{name: 'user_name',			type: 'string'}, //사용자명
		{name: 'dwup_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr }, //작성일자
		{name: 'plan_rslt_dvcd',	type: 'string'}, //계획실적구분코드
		{name: 'plan_rslt_name',	type: 'string'}, //계획실적구분명
		{name: 'line_seqn',			type: 'float'} , //순번
		{name: 'oprt_smry',			type: 'string'}, //업무요약
		{name: 'oprt_cont',			type: 'string'}, //업무내용
		{name: 'prjt_idcd',			type: 'string'}, //프로젝트ID
		{name: 'prjt_name',			type: 'string'}, //프로젝트명
		{name: 'prog_rate',			type: 'float'  , defaultValue: '0'}, //진척율
		{name: 'apvl_dvcd',			type: 'string' , defaultValue: '0200'}, //승인여부
		{name: 'apvl_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr }, //승인일자
		{name: 'apvl_drtr_idcd',	type: 'string'}, //승인담당자ID
		{name: 'admn_opin',			type: 'string'}, //관리자의견
		{name: 'user_memo',			type: 'string'}, //사용자메모
		{name: 'sysm_memo',			type: 'string'}, //시스템메모
		{name: 'prnt_idcd',			type: 'string'}, //부모ID
		{name: 'line_ordr',			type: 'string'}, //ROW순서
		{name: 'line_levl',			type: 'float'  , defaultValue: '0'}, //ROW레벨
		{name: 'line_stat',			type: 'string' , defaultValue: '0'}, //ROW상태
		{name: 'line_clos',			type: 'string'}, //ROW마감
		{name: 'find_name',			type: 'string'}, //찾기명
		{name: 'updt_user_name',	type: 'string'}, //수정사용자명
		{name: 'updt_ipad',			type: 'string'}, //수정IP
		{name: 'updt_dttm',			type: 'string'}, //수정일시
		{name: 'updt_idcd',			type: 'string'}, //수정ID
		{name: 'updt_urif',			type: 'string'}, //수정UI
		{name: 'crte_user_name',	type: 'string'}, //생성사용자명
		{name: 'crte_ipad',			type: 'string'}, //생성IP
		{name: 'crte_dttm',			type: 'string'}, //생성일시
		{name: 'crte_idcd',			type: 'string'}, //생성ID
		{name: 'crte_urif',			type: 'string'}, //생성UI
		{name: '_source_dvcd',		type: 'string' , defaultValue : '업무일지'}
	]
});
