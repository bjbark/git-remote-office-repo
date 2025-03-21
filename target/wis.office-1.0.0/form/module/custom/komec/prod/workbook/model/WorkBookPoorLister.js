Ext.define('module.custom.komec.prod.workbook.model.WorkBookPoorLister',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'},		//invoice번호
		{	name: 'line_seqn'				, type: 'float'},		//순번
		{	name: 'poor_qntt'				, type: 'float'},		//불량수량
		{	name: 'invc_date'				, type: 'string'},		//
		{	name: 'wker_idcd'				, type: 'string'},		//작업자
		{	name: 'wker_name'				, type: 'string'},		//작업자명
		{	name: 'poor_name'				, type: 'string'},		//불량명칭
		{	name: 'poor_bacd'				, type: 'string'},		//불량코드
		{	name: 'poor_proc_dvcd'			, type: 'string'},		//
		{	name: 'sttm'					, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
		{	name: 'edtm'					, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업종료시간


		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string',defaultValue:_global.login_pk},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string',defaultValue:_global.login_pk},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
