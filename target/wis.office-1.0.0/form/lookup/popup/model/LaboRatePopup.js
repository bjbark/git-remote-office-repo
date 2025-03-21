Ext.define('lookup.popup.model.LaboRatePopup',{ extend:'Axt.data.Model',
	fields: [
 		{	name: 'labo_rate_idcd'			, type: 'string'		//임율id
		},{	name: 'wkrn_idcd'				, type: 'string'		//직급id
		},{	name: 'wkrn_name'				, type: 'string'		//직급명
		},{	name: 'labo_rate_dvcd'			, type: 'string'		//직급구분
		},{	name: 'labo_rate_name'			, type: 'string'		//임율명
		},{	name: 'labo_rate_1fst'			, type: 'float'			//임율1
		},{	name: 'labo_rate_2snd'			, type: 'float'			//임율2
		},{	name: 'labo_rate_3trd'			, type: 'float'			//임율3
		},{	name: 'labo_rate_4frt'			, type: 'float'			//임율4
		},{	name: 'labo_rate_5fit'			, type: 'float' 		//임율5

		},{	name: 'user_memo'				, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'				, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'				, type: 'string'		//부모ID
		},{	name: 'line_levl'				, type: 'float'	, defaultValue: '0'		//ROW레벨
		},{	name: 'line_ordr'				, type: 'string'		//ROW순서
		},{	name: 'line_stat'				, type: 'string', defaultValue: '0'		//ROW상태
		},{	name: 'line_clos'				, type: 'string'		//ROW마감
		},{	name: 'find_name'				, type: 'string'		//찾기명
		},{	name: 'updt_user_name'			, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'				, type: 'string'		//수정IP
		},{	name: 'updt_dttm'				, type: 'string'		//수정일시
		},{	name: 'updt_idcd'				, type: 'string'		//수정ID
		},{	name: 'updt_urif'				, type: 'string'		//수정UI
		},{	name: 'crte_user_name'			, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'				, type: 'string'		//생성IP
		},{	name: 'crte_dttm'				, type: 'string'		//생성일시
		},{	name: 'crte_idcd'				, type: 'string'		//생성ID
		},{	name: 'crte_urif'				, type: 'string'		//생성UI
		},{	name: 'dept_name'				, type: 'string'		//소속
		}
	]
});
