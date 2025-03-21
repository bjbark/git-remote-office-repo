Ext.define('module.basic.wrhszone.model.WrhsZone',{ extend:'Axt.data.Model',
	fields:
	[
	 	{name: 'zone_idcd',				type: 'string'},		//구역ID
	 	{name: 'wrhs_idcd',				type: 'string'},		//창고ID
		{name: 'wrhs_name',				type: 'string'},		//창고명
		{name: 'zone_name',				type: 'string'},		//구역명
		{name: 'zone_rack',				type: 'string'},		//구역랙
		{name: 'zone_flor',				type: 'string'},		//구역층
		{name: 'zone_colm',				type: 'string'},		//구역칸

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float', defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
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
		{name: 'prnt_dept_code',		type: 'string'},		//상위부서코드
		{name: 'prnt_dept_name',		type: 'string'},		//상위부서명
	]
});
