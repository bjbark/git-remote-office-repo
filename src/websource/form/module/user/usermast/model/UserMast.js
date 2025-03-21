Ext.define('module.user.usermast.model.UserMast',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'user_idcd'				, type: 'string',		//사용자id
		},{	name: 'user_code'				, type: 'string'		//사용자id
		},{	name: 'hqof_idcd'				, type: 'string', defaultValue : _global.hqof_idcd
		},{	name: 'lgin_idcd'				, type: 'string'		//로그인id
		},{	name: 'wkrn_idcd'				, type: 'string'		//직급id
		},{	name: 'wkrn_name'				, type: 'string'		//직급명
		},{	name: 'user_name'				, type: 'string'		//사용자명
		},{	name: 'duty_dvcd'				, type: 'string'		//업무구분코드
		},{	name: 'lgin_pswd'				, type: 'string'		//로그인암호
		},{	name: 'pswd_cgdt'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//사용자변경일자
		},{	name: 'user_dvcd'				, type: 'string'		//사용자구분코드
		},{	name: 'hoof_stat_dvcd'			, type: 'string', defaultValue : '0'		//재직상태
		},{	name: 'join_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//입사일자
		},{	name: 'rtmt_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//퇴사일자
		},{	name: 'hdph_numb'				, type: 'string'		//휴대폰
		},{	name: 'brth_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//생년월일
		},{	name: 'dept_idcd'				, type: 'string'		//부서코드
		},{	name: 'dept_code'				, type: 'string'		//부서코드
		},{	name: 'labo_rate_idcd'			, type: 'string'		//임율ID
		},{	name: 'mail_addr'				, type: 'string'		//이메일
		},{	name: 'labo_rate_idcd'			, type: 'string'		//직급id
		},{	name: 'labo_rate_name'			, type: 'string'		//직급명
		},{	name: 'natn_bacd_name'			, type: 'string'		//국적명
		},{	name: 'auth_dvcd'				, type: 'string'		//사용권한
		},{	name: 'natn_bacd'				, type: 'string'		//국적코드
		},{	name: 'cost_drtr_yorn'			, type: 'string', defaultValue : '0'		//원가담당
		},{	name: 'admn_yorn'				, type: 'string', defaultValue : '0'	//관리자여부
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
