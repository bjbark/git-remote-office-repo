Ext.define('module.qc.project.losswork.model.LossWorkMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'invc_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE일자
		{name: 'pjod_idcd',				type: 'string' } ,		//프로젝트수주id
		{name: 'wker_idcd',				type: 'string' },		//작업자ID
		{name: 'wker_name',				type: 'string' },		//작업자명
		{name: 'prts_name',				type: 'string' },		//부품명
		{name: 'dept_idcd',				type: 'string' },		//부서ID
		{name: 'dept_name',				type: 'string' },		//부서명
		{name: 'resp_dept_idcd',		type: 'string' },		//책임부서ID
		{name: 'resp_dept_name',		type: 'string' },		//책임부서명
		{name: 'occr_date',				type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//발생일자
		{name: 'proc_date',				type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//처리일자
		{name: 'loss_dvcd',				type: 'string' },		//손실구분코드
		{name: 'dtil_cont',				type: 'string' },		//상세내용
		{name: 'loss_amnt_ttsm',		type: 'float '  , defaultValue: '0' },		//손실금액합계
		{name: 'cnfm_drtr_idcd',		type: 'string' },		//확인담당자ID
		{name: 'cnfm_drtr_name',		type: 'string' },		//확인담당자명
		{name: 'cnfm_date',				type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//확인일자


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
