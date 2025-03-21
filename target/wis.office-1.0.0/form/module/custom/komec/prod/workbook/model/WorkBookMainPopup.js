Ext.define('module.custom.komec.prod.workbook.model.WorkBookMainPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'},		//invoice번호
		{	name: 'line_seqn'				, type: 'float'},		//순번
		{	name: 'wkfw_seqn'				, type: 'float'},		//공정흐름순번
		{	name: 'indn_qntt'				, type: 'float'},		//지시수량
		{	name: 'wkct_idcd'				, type: 'string'},		//공정ID
		{	name: 'wkct_name'				, type: 'string'},		//공정명
		{	name: 'pdsd_numb'				, type: 'string'},		//생산계획번호
		{	name: 'work_numb'				, type: 'string'},		//작업번호
		{	name: 'cvic_idcd'				, type: 'string'},		//설비ID
		{	name: 'wrhs_idcd'				, type: 'string'},		//창고ID
		{	name: 'item_idcd'				, type: 'string'},		//품목Id
		{	name: 'item_name'				, type: 'string'},		//품목명
		{	name: 'item_code'				, type: 'string'},		//품목코드
		{	name: 'lott_numb'				, type: 'string'},		//품목코드
		{	name: 'last_wkct_yorn'			, type: 'string'},		//최종공정여부
		{	name: 'prog_stat_dvcd'			, type: 'string'},		//진행상태
		{	name: 'work_strt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
		{	name: 'work_endd_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업종료시간
		{	name: 'wkrn_name'				, type: 'string'},		//작업자명

		{	name: 'bomt_degr'				, type: 'float'},		//Bom차수
		{	name: 'temp_valu'				, type: 'float', defaultValue: '0'},		//온도
		{	name: 'rpm_valu'				, type: 'float', defaultValue: '0'},		//RPM
		{	name: 'temp_appr'				, type: 'float', defaultValue: '0'},		//온도 오차
		{	name: 'rpm_appr'				, type: 'float', defaultValue: '0'},		//RPM 오차

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
