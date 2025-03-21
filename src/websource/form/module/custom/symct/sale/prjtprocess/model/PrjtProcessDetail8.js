Ext.define('module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail8',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'colt_degr',				type: 'float' },		//수금차수
		{name: 'colt_dvcd',				type: 'string'},		//수금구분코드
		{name: 'plan_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//계획일자
		{name: 'plan_amnt',				type: 'float' },		//수금금액
		{name: 'colt_date',				type: 'string' , serialize: Ext.util.Format.dateToStr   } ,		//수금일자
		{name: 'colt_amnt',				type: 'float' },		//수금금액
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'drtr_name',				type: 'string'},		//담당자명
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


		{name: 'modify',				type: 'string'},		//수정유무

	]
});
