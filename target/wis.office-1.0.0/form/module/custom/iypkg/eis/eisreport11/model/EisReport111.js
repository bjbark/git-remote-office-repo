Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReport111',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
		{	name: 'cstm_name',			type: 'string' },		//거래처명
		{	name: 'invc_numb',			type: 'string' },		//수주번호
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자
		{	name: 'plan_year'			, type: 'string' },		//계획년도

		{	name: 'sw_code'	,			type: 'float' , defaultValue : 0},		//원단지종구분코드 값 sw, tw
		{	name: 'dw_code'	,			type: 'float' , defaultValue : 0},		//원단지종구분코드 값 dw
		{	name: 'istt_amnt',			type: 'float' , defaultValue : 0},		//sw + dw 합계

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue : 0 },		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue : '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
	]
});
