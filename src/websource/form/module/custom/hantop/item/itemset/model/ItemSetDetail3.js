Ext.define('module.custom.hantop.item.itemset.model.ItemSetDetail3',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'item_idcd'				,type: 'string'},		//품목ID
		{name: 'line_seqn'				,type: 'float'},		//순번
		{name: 'vrbl_idcd'				,type: 'string'},		//변수ID
		{name: 'vrbl_name'				,type: 'string'},		//변수명
		{name: 'vrbl_valu'				,type: 'string'},		//변수값
		{name: 'prod_lcls_idcd'			,type: 'string'},		//제품대분류ID
		{name: 'rela_item_idcd'			,type: 'string'},		//관련품목ID
		{name: 'vrbl_desc'				,type: 'string'},		//변수설명
		{name: 'remk_text'				,type: 'string'},		//비고
		{name: 'change'					,type: 'string'},		//수정용
		{name: 'modify'					,type: 'string'},		//chk

		{name: 'user_memo'				,type: 'string'},						//사용자메모
		{name: 'sysm_memo'				,type: 'string'},						//시스템메모
		{name: 'prnt_idcd'				,type: 'string'},						//부모ID
		{name: 'line_levl'				,type: 'float' , defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr'				,type: 'float' },						//ROW순서
		{name: 'line_stat'				,type: 'string', defaultValue: '0'},	//ROW상태
		{name: 'line_clos'				,type: 'string'},						//ROW마감
		{name: 'find_name'				,type: 'string'},						//찾기명
		{name: 'updt_user_name'			,type: 'string'},						//수정사용자명
		{name: 'updt_ipad'				,type: 'string'},						//수정IP
		{name: 'updt_dttm'				,type: 'string'},						//수정일시
		{name: 'updt_idcd'				,type: 'string'},						//수정ID
		{name: 'updt_urif'				,type: 'string'},						//수정UI
		{name: 'crte_user_name'			,type: 'string'},						//생성사용자명
		{name: 'crte_ipad'				,type: 'string'},						//생성IP
		{name: 'crte_dttm'				,type: 'string'},						//생성일시
		{name: 'crte_idcd'				,type: 'string'},						//생성ID
		{name: 'crte_urif'				,type: 'string'},						//생성UI
	]
});
