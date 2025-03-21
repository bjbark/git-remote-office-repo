Ext.define('module.notice.noticeview.model.NoticeViewMast',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{name: 'bord_idcd',			type: 'string'},		//게시판ID
		{name: 'ntce_stdt',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,//공지시작일자
		{name: 'ntce_eddt',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,//공지종료일자
		{name: 'dwup_date',			type: 'string' , convert : Ext.util.Format.strToDateTime},		//작성일자
		{name: 'dwup_time',			type: 'string' , convert : Ext.util.Format.strToDateTime},		//작성시간
		{name: 'dwup_empy_idcd',	type: 'string'},		//작성사원ID
		{name: 'dwup_empy_name',	type: 'string'},		//작성사원명
		{name: 'dwup_empy_name',	type: 'string'},		//작성사원명
		{name: 'emgc_yorn',			type: 'string'},		//긴급여부
		{name: 'ntce_ttle',			type: 'string'},		//공지제목
		{name: 'sbsd_ttle',			type: 'string'},		//부제목
		{name: 'ntce_cont',			type: 'string'},		//공지내용
		{name: 'scrt_yorn',			type: 'string'},		//보안여부
		{name: 'mail_addr',			type: 'string'},		//이메일주소
		{name: 'mail_ansr_yorn',	type: 'string'},		//이메일답여부
		{name: 'tele_numb',			type: 'string'},		//전화번호
		{name: 'inqy_qntt',			type: 'float'},			//조회수
		{name: 'ansr_yorn',			type: 'string'},		//답여부
		{name: 'pswd',				type: 'string'},		//비밀번호
		{name: 'ansr_cont',			type: 'string'},		//답내용
		{name: 'insp_dttm',			type: 'string', convert : Ext.util.Format.strToDateTime },	//열람일자

		{name: 'user_memo',			type: 'string'},		//사용자메모
		{name: 'sysm_memo',			type: 'string'},		//시스템메모
		{name: 'prnt_idcd',			type: 'string'},		//부모ID
		{name: 'line_levl',			type: 'float', defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',			type: 'string'},		//ROW순서
		{name: 'line_stat',			type: 'string', defaultValue: '0'},	//ROW상태
		{name: 'line_clos',			type: 'string'},		//ROW마감
		{name: 'find_name',			type: 'string'},		//찾기명
		{name: 'updt_user_name',	type: 'string'},		//수정사용자명
		{name: 'updt_ipad',			type: 'string'},		//수정IP
		{name: 'updt_dttm',			type: 'string'},		//수정일시
		{name: 'updt_idcd',			type: 'string'},		//수정ID
		{name: 'updt_urif',			type: 'string'},		//수정UI
		{name: 'crte_user_name',	type: 'string'},		//생성사용자명
		{name: 'crte_ipad',			type: 'string'},		//생성IP
		{name: 'crte_dttm',			type: 'string'},		//생성일시
		{name: 'crte_idcd',			type: 'string'},		//생성ID
		{name: 'crte_urif',			type: 'string'},		//생성UI
		{name: 'prnt_dept_code',	type: 'string'},		//상위부서코드
		{name: 'prnt_dept_name',	type: 'string'},		//상위부서명
		{name: 'ansr_yorn',			type: 'string'},		//상위부서명

	]
});
