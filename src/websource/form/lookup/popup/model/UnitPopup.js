Ext.define('lookup.popup.model.UnitPopup',{ extend:'Axt.data.Model',
	fields: [
		{name: 'unit_idcd',				type: 'string'},		//단위ID
		{name: 'unit_code',				type: 'string'},		//단위코드
		{name: 'unit_name',				type: 'string'},		//단위명
		{name: 'widh_yorn',				type: 'string' , defaultValue: '0'},		//폭여부
		{name: 'leng_yorn',				type: 'string' , defaultValue: '0'},		//길이여부
		{name: 'tick_yorn',				type: 'string' , defaultValue: '0'},		//두께여부
		{name: 'actv_unit_yorn',		type: 'string' , defaultValue: '0'},		//액티비티단위여부
		{name: 'evlt_unit_yorn',		type: 'string' , defaultValue: '0'},		//평가단위여부
		{name: 'dcml_calc_mthd',		type: 'string'},		//소수점계산방식
		{name: 'remk_text',				type: 'string'},		//비고
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
