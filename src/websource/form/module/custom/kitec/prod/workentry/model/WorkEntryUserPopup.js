Ext.define('module.custom.kitec.prod.workentry.model.WorkEntryUserPopup',{ extend:'Axt.data.Model',
	fields: [
	 		{name: 'user_idcd',				type: 'string'},		//사원ID
	 		{name: 'user_code',				type: 'float' },		//사원코드
	 		{name: 'empy_dvcd',				type: 'string'},		//직원구분코드
	 		{name: 'user_name',				type: 'string'},		//사원명
	 		{name: 'dept_name',				type: 'string'},		//사원명
	 		{name: 'lgin_idcd',				type: 'string'},		//사원명
	 		{name: 'labo_rate_idcd',		type: 'string'},		//임율id
	 		{name: 'abty_dvcd',				type: 'string'},		//능력구분코드
	 		{name: 'wkkn_dvcd',				type: 'string'},		//직종구분코드
	 		{name: 'work_para_dvcd',		type: 'string'},		//근무조구분코드
	 		{name: 'join_date',				type: 'string',defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//입사일자

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
