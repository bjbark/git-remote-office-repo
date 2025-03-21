Ext.define('module.custom.hantop.item.itemset.model.ItemSet',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'item_idcd'				,type: 'string'},		//품목ID
		{name: 'item_code'				,type: 'string'},		//품목코드
		{name: 'wdgr_idcd'				,type: 'string'},		//창호그룹ID
		{name: 'rpst_item_idcd'			,type: 'string'},		//대표품목ID
		{name: 'brnd_bacd'				,type: 'string'},		//브랜드분류코드
		{name: 'brnd_name'				,type: 'string'},		//브랜드분류코드
		{name: 'item_dvcd'				,type: 'string'},		//품목구분코드
		{name: 'item_name'				,type: 'string'},		//품목명
		{name: 'item_spec'				,type: 'string'},		//품목규격
		{name: 'unit_idcd'				,type: 'string'},		//단위ID
		{name: 'unit_name'				,type: 'string'},		//단위명
		{name: 'acct_dvcd'				,type: 'string'},		//계정구분코드
		{name: 'item_leng'				,type: 'float' },		//품목길이
		{name: 'item_widh'				,type: 'float' },		//품목폭
		{name: 'item_hght'				,type: 'float' },		//품목높이
		{name: 'colr_idcd'				,type: 'string'},		//컬러ID
		{name: 'colr_name'				,type: 'string'},		//컬러명
		{name: 'wdbf_yorn'				,type: 'string'},		//BF여부
		{name: 'wdsf_yorn'				,type: 'string'},		//SF여부
		{name: 'wdmf_yorn'				,type: 'string'},		//MF여부
		{name: 'wdmc_yorn'				,type: 'string'},		//MC여부
		{name: 'bfrn_yorn'				,type: 'string'},		//BF보강재여부
		{name: 'sfrn_yorn'				,type: 'string'},		//SF보강재여부
		{name: 'mfrn_yorn'				,type: 'string'},		//MF보강재여부
		{name: 'glss_yorn'				,type: 'string'},		//유리여부
		{name: 'wryp_yorn'				,type: 'string'},		//레핑여부

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
