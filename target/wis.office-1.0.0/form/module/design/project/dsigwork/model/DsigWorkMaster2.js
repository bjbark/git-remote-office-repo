Ext.define('module.design.project.dsigwork.model.DsigWorkMaster2',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'invc_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//invoice일자
		{name: 'idcd',					type: 'string'},		//id
		{name: 'name',					type: 'string'},		//name
		{name: 'progress',				type: 'string'},		//progress
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'work_cont',				type: 'string'},		//작업내용
		{name: 'work_sttm',				type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{name: 'work_edtm',				type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업종료시간
		{name: 'plan_rate',				type: 'string'},		//계획율
		{name: 'achi_rate',				type: 'string'},		//달성율
		{name: 'need_time',				type: 'string'},		//소요시간
		{name: 'work_pcnt',				type: 'string'},		//작업인원
		{name: 'work_mnhr',				type: 'string'},		//작업공수
		{name: 'work_cond_1fst',		type: 'string'},		//작업조건1
		{name: 'work_cond_2snd',		type: 'string'},		//작업조건2
		{name: 'work_cond_3trd',		type: 'string'},		//작업조건3
		{name: 'work_cond_5fit',		type: 'string'},		//작업조건5
		{name: 'work_cond_6six',		type: 'string'},		//작업조건6
		{name: 'work_cond_7svn',		type: 'string'},		//작업조건7
		{name: 'user_name',				type: 'string'},		//비고
		{name: 'remk_text',				type: 'string'},		//비고
		{name: 'work_cont',				type: 'string'},		//설계요소명
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
