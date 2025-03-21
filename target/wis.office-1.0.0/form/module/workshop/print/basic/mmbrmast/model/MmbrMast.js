Ext.define('module.workshop.print.basic.mmbrmast.model.MmbrMast', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mmbr_idcd'			, type: 'string' },		//회원ID
		{	name: 'pswd'				, type: 'float'  },		//비밀번호
		{	name: 'mmbr_name'			, type: 'string' },		//회원명
		{	name: 'regi_dvcd'			, type: 'string' , defaultValue : '1'  },	//등록구분코드
		{	name: 'entr_dvcd'			, type: 'string' },		//가입구분코드
		{	name: 'mmbr_dvcd'			, type: 'string' },		//회원구분코드
		{	name: 'lgin_pswd'			, type: 'string' },		//로그인비밀번호
		{	name: 'entr_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//가입일자
		{	name: 'scsn_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//탈퇴일자
		{	name: 'scsn_resn_dvcd'		, type: 'string' },		//탈퇴사유구분코드
		{	name: 'scsn_resn'			, type: 'string' },		//탈퇴사유
		{	name: 'mmbr_grad'			, type: 'string' },		//회원등급
		{	name: 'tele_numb'			, type: 'string' },		//전화번호
		{	name: 'mmbr_stat_dvcd'		, type: 'string' },		//회원상태구분코드
		{	name: 'mmbr_stat_yorn'		, type: 'string' },		//회원상태구분코드
		{	name: 'hdph_numb'			, type: 'string' },		//휴대폰번호
		{	name: 'faxi_numb'			, type: 'string' },		//팩스번호
		{	name: 'post_code'			, type: 'string' },		//우편번호
		{	name: 'addr_1fst'			, type: 'string' },		//주소1
		{	name: 'addr_2snd'			, type: 'string' },		//주소2
		{	name: 'wker_name'			, type: 'string' },		//작업자명
		{	name: 'wker_hdph'			, type: 'string' },		//작업자휴대폰
		{	name: 'wker_mail'			, type: 'string' },		//작업자이메일
		{	name: 'boss_name'			, type: 'string' },		//대표자명
		{	name: 'buss_numb'			, type: 'string' },		//사업자등록번호
		{	name: 'bzpl_zpcd'			, type: 'string' },		//사업장우편번호
		{	name: 'bzpl_addr_1fst'		, type: 'string' },		//사업장주소1
		{	name: 'bzpl_addr_2snd'		, type: 'string' },		//사업장주소2
		{	name: 'buss_type'			, type: 'string' },		//업태
		{	name: 'buss_item'			, type: 'string' },		//종목
		{	name: 'mail_addr'			, type: 'string' },		//이메일주소
		{	name: 'intr_mmbr_idcd'		, type: 'string' },		//소개회원ID
		{	name: 'asgn_mmbr_idcd'		, type: 'string' },		//소속회원ID
		{	name: 'asgn_mmbr_name'		, type: 'string' },		//소속회원ID

		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' ,defaultValue : _global.login_nm},		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' ,defaultValue : _global.login_pk},		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});

