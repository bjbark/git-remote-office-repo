Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReport112',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
		{	name: 'cstm_name',			type: 'string' },		//거래처명(상호)
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자

		{	name: 'plan_year'			, type: 'float' },		//계획년도

		{	name: 'istt_amnt',			type: 'float' },		//매입금액

		{	name: 'january',			type: 'float' },		//1월
		{	name: 'february',			type: 'float' },		//2월
		{	name: 'march',				type: 'float' },		//3월
		{	name: 'april',				type: 'float' },		//4월
		{	name: 'may',				type: 'float' },		//5월
		{	name: 'jun',				type: 'float' },		//6월
		{	name: 'july',				type: 'float' },		//7월
		{	name: 'august',				type: 'float' },		//8월
		{	name: 'september',			type: 'float' },		//9월
		{	name: 'october',			type: 'float' },		//10월
		{	name: 'novemeber',			type: 'float' },		//11월
		{	name: 'december',			type: 'float' },		//12월

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
