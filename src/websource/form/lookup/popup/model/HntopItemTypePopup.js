Ext.define('lookup.popup.model.HntopItemTypePopup',{ extend:'Axt.data.Model',
	fields  : [
		{name: 'wdtp_idcd'				, type: 'string'},			//창호형태ID
		{name: 'wdtp_code'				, type: 'string'},			//창호형태코드
		{name: 'wdtp_name'				, type: 'string'},			//창호형태명
		{name: 'wdcl_idcd'				, type: 'string'},			//창호분류ID
		{name: 'wdgr_idcd'				, type: 'string'},			//창호그룹ID
		{name: 'wdgr_name'				, type: 'string'},			//창호그룹명
		{name: 'wdcl_name'				, type: 'string'},			//창호분류명
		{name: 'imge_1fst'				, type: 'blob'},			//이미지1
		{name: 'imge_2snd'				, type: 'blob'},			//이미지2
		{name: 'imge_3trd'				, type: 'blob'},			//이미지3
		{name: 'imge_4frt'				, type: 'blob'}, 			//이미지4
		{name: 'imge_5fit'				, type: 'blob'},			//이미지5
		{name: 'imge_6six'				, type: 'blob'},			//이미지6
		{name: 'imge_7svn'				, type: 'blob'},			//이미지7
		{name: 'user_memo'				, type: 'string'},			//사용자메모
		{name: 'sysm_memo'				, type: 'string'},			//시스템메모
		{name: 'prnt_idcd'				, type: 'string'},			//부모ID
		{name: 'line_levl'				, type: 'int'},				//ROW레벨
		{name: 'line_ordr'				, type: 'int'},				//ROW순서
		{name: 'line_stat'				, type: 'string'},			//ROW상태
		{name: 'line_clos'				, type: 'string'},			//ROW마감

		{name: 'find_name'				, type: 'string'},			//찾기명
		{name: 'updt_user_name'			, type: 'string'},			//수정사용자명
		{name: 'updt_ipad'				, type: 'string'},			//수정IP
		{name: 'updt_dttm'				, type: 'float'},			//수정일시
		{name: 'updt_idcd'				, type: 'float'},			//수정ID
		{name: 'updt_urif'				, type: 'float'},			//수정UI

		{name: 'crte_user_name'			, type: 'string'},			//생성자사용자명
		{name: 'crte_ipad'				, type: 'string'},			//생성IP
		{name: 'crte_dttm'				, type: 'string'},			//생성일자
		{name: 'crte_idcd'				, type: 'float'   , defaultValue: '0'},		//생성ID
		{name: 'crte_urif'				, type: 'string'},			//생성UI
	]
});
