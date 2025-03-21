Ext.define('module.custom.hantop.item.itemset.model.ItemSetDetail2',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'item_idcd'				,type: 'string'},		//품목ID
		{name: 'line_seqn'				,type: 'float'},		//순번
		{name: 'hqof_yorn'				,type: 'string'},		//본사여부
		{name: 'base_yorn'				,type: 'string'},		//기본여부
		{name: 'vrbl_idcd'				,type: 'string'},		//변수ID
		{name: 'vrbl_name'				,type: 'string'},		//변수명
		{name: 'atth_idcd'				,type: 'string'},		//부속ID
		{name: 'prod_lcls_idcd'			,type: 'string'},		//제품대분류ID
		{name: 'cate_dvcd'				,type: 'string'},		//범주구분코드
		{name: 'rela_item_idcd'			,type: 'string'},		//관련품목ID
		{name: 'minm_widh'				,type: 'float'},		//최소폭
		{name: 'maxm_widh'				,type: 'float'},		//최대폭
		{name: 'minm_hght'				,type: 'float' },		//최소높이
		{name: 'maxm_hght'				,type: 'float' },		//최대높이
		{name: 'cond_dvcd'				,type: 'string' },		//조건구분코드
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
