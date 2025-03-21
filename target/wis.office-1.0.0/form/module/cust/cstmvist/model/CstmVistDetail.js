Ext.define( 'module.cust.cstmvist.model.CstmVistDetail', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'cstm_stnm_1fst'		, type: 'string'	//거래처약칭
		},{	name: 'vist_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//방문일자
		},{	name: 'vist_empy_idcd'		, type: 'string'	//방문사원ID
		},{	name: 'vist_empy_name'		, type: 'string'	//방문사원ID
		},{	name: 'vist_purp_dvcd'		, type: 'string'	//방문목적구분코드
		},{	name: 'vist_recd'			, type: 'string'	//방문기록
		},{	name: 'vist_stat_dvcd'		, type: 'string'	//방문상태구분코드
		},{	name: 'dwup_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//작성일자
		},{	name: 'dwup_time'			, type: 'string'	//작성시간
		},{	name: 'dwup_empy_idcd'		, type: 'string'	//작성사원ID
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue: '0'		//ROW레벨
		},{	name: 'line_ordr'			, type: 'string'	//ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		//ROW상태
		},{	name: 'line_clos'			, type: 'string'	//ROW마감
		},{	name: 'find_name'			, type: 'string'	//찾기명
		},{	name: 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	//수정IP
		},{	name: 'updt_dttm'			, type: 'string'	//수정일시
		},{	name: 'updt_idcd'			, type: 'string'	//수정ID
		},{	name: 'updt_urif'			, type: 'string'	//수정UI
		},{	name: 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	//생성IP
		},{	name: 'crte_dttm'			, type: 'string'	//생성일시
		},{	name: 'crte_idcd'			, type: 'string'	//생성ID
		},{	name: 'crte_urif'			, type: 'string'	//생성UI
		}
	]
});
