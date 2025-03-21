Ext.define('module.prod.basic.prodlineroute.model.ProdLineRouteDetail',{ extend:'Axt.data.Model',
	fields:
		[
		 	{name: 'wkfw_code',				type: 'string'},						//공정흐름코드
		 	{name: 'wkfw_name',				type: 'string'},						//공정흐름명
			{name: 'wkfw_idcd',				type: 'string'},						//공정흐름ID
			{name: 'line_seqn',				type: 'float'},							//공정순번
			{name: 'wkct_idcd',				type: 'string'},						//공정ID
			{name: 'wkct_code',				type: 'string'},						//공정코드
			{name: 'wkct_name',				type: 'string'},						//공정명
			{name: 'wkct_stnm',				type: 'string'},						//공정약칭
			{name: 'dept_idcd',				type: 'string'},						//부서id
			{name: 'wkct_insp_yorn',		type: 'string'},						//공정검사여부
			{name: 'last_wkct_yorn',		type: 'string'},						//최종공정여부
			{name: 'aftr_wkct_ordr',		type: 'float'},							//후공정순서
			{name: 'mtrl_cost_rate',		type: 'float'},							//재료비진척율
			{name: 'labo_cost_rate',		type: 'float'},							//노무비진척율
			{name: 'expn_rate',				type: 'float'},							//경비진척율
			{name: 'user_memo',				type: 'string'},						//사용자메모
			{name: 'work_item_idcd',		type: 'string'},						//작업품목ID
			{name: 'work_item_code',		type: 'string'},						//작업품목코드
			{name: 'work_item_name',		type: 'string'},						//작업품명
			{name: 'sysm_memo',				type: 'string'},						//시스템메모
			{name: 'prnt_idcd',				type: 'string'},						//부모ID
			{name: 'line_levl',				type: 'float', defaultValue: '0'},		//ROW레벨
			{name: 'line_ordr',				type: 'string'},						//ROW순서
			{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
			{name: 'line_clos',				type: 'string'},						//ROW마감
			{name: 'find_name',				type: 'string'},						//찾기명
			{name: 'updt_user_name',		type: 'string'},						//수정사용자명
			{name: 'updt_ipad',				type: 'string'},						//수정IP
			{name: 'updt_dttm',				type: 'string'},						//수정일시
			{name: 'updt_idcd',				type: 'string'},						//수정ID
			{name: 'updt_urif',				type: 'string'},						//수정UI
			{name: 'crte_user_name',		type: 'string'},						//생성사용자명
			{name: 'crte_ipad',				type: 'string'},						//생성IP
			{name: 'crte_dttm',				type: 'string'},						//생성일시
			{name: 'crte_idcd',				type: 'string'},						//생성ID
			{name: 'crte_urif',				type: 'string'},						//생성UI

			{name: 'temp_valu',				type: 'float', defaultValue: '0'},		//온도
			{name: 'rpm_valu',				type: 'float', defaultValue: '0'},		//RPM
			{name: 'temp_appr',				type: 'float', defaultValue: '0'},		//온도 오차
			{name: 'rpm_appr',				type: 'float', defaultValue: '0'},		//RPM 오차
		]
});

