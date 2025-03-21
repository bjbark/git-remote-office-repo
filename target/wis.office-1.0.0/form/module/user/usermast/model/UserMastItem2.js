Ext.define('module.user.usermast.model.UserMastItem2',{ extend:'Axt.data.Model',
	fields : [
		{name: 'user_idcd',				type: 'string'},		//사원번호
		{name: 'base_idcd',				type: 'string'},		//기초ID
		{name: 'hqof_idcd',				type: 'string'},		//본사ID
		{name: 'base_code',				type: 'string'},		//기초코드
		{name: 'base_name',				type: 'string'},		//기초명
		{name: 'base_engl_name',		type: 'string'},		//기초영문명
		{name: 'code_leng',				type: 'string'},		//코드길이
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
