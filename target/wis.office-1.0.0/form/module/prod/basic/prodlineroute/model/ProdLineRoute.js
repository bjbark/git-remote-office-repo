Ext.define('module.prod.basic.prodlineroute.model.ProdLineRoute',{ extend:'Axt.data.Model',
	fields:
		[
		 	{name: 'wkfw_idcd',				type: 'string'},					//공정흐름ID
		 	{name: 'wkfw_code',				type: 'string'},					//공정흐름코드
		 	{name: 'wkfw_name',				type: 'string'},					//공정흐름명
			{name: 'remk_text',				type: 'string'},					//공정순번
			{name: 'user_memo',				type: 'string'},					//사용자메모
			{name: 'sysm_memo',				type: 'string'},					//시스템메모
			{name: 'prnt_idcd',				type: 'string'},					//부모ID
			{name: 'line_levl',				type: 'float', defaultValue: '0'},	//ROW레벨
			{name: 'line_ordr',				type: 'string'},					//ROW순서
			{name: 'line_stat',				type: 'string', defaultValue: '0'},	//ROW상태
			{name: 'line_clos',				type: 'string'},					//ROW마감
			{name: 'find_name',				type: 'string'},					//찾기명
			{name: 'updt_user_name',		type: 'string'},					//수정사용자명
			{name: 'updt_ipad',				type: 'string'},					//수정IP
			{name: 'updt_dttm',				type: 'string'},					//수정일시
			{name: 'updt_idcd',				type: 'string'},					//수정ID
			{name: 'updt_urif',				type: 'string'},					//수정UI
			{name: 'crte_user_name',		type: 'string'},					//생성사용자명
			{name: 'crte_ipad',				type: 'string'},					//생성IP
			{name: 'crte_dttm',				type: 'string'},					//생성일시
			{name: 'crte_idcd',				type: 'string'},					//생성ID
			{name: 'crte_urif',				type: 'string'},					//생성UI
		]
});
