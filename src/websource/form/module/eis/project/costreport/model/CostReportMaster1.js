Ext.define('module.eis.project.costreport.model.CostReportMaster1',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'pjod_idcd',				type: 'string' },		//프로젝트수주id
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'invc_date',				type: 'string'},		//invoice일자
		{name: 'line_seqn',				type: 'string'},		//순번
		{name: 'idcd',					type: 'string'},		//id
		{name: 'name',					type: 'string'},		//이름
		{name: 'progress',				type: 'string'},		//progress
		{name: 'wker_idcd_1fst',		type: 'string'},		//작업자1
		{name: 'wker_1fst_name',		type: 'string'},		//작업자1
		{name: 'wker_idcd_2snd',		type: 'string'},		//작업자2
		{name: 'wker_2snd_name',		type: 'string'},		//작업자2
		{name: 'wker_idcd_3trd',		type: 'string'},		//작업자3
		{name: 'wker_3trd_name',		type: 'string'},		//작업자3
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//품목코드
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'prnt_item_name',		type: 'string'},		//중분류명
		{name: 'cvic_idcd',				type: 'string'},		//설비ID
		{name: 'cvic_name',				type: 'string'},		//설비명
		{name: 'work_cont',				type: 'string'},		//작업내용
		{name: 'work_sttm',				type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{name: 'work_edtm',				type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업종료시간
		{name: 'need_time',				type: 'float'},			//작업시간
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
