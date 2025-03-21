Ext.define('module.custom.iypkg.eis.eisreport16.model.EisReport16',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자
		{	name: 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name: 'wkod_numb',			type: 'string'},		//작업지시번호
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'lcls_idcd',			type: 'string'},		//대분류ID
		{	name: 'mcls_idcd',			type: 'string'},		//중분류ID
		{	name: 'scls_idcd',			type: 'string'},		//소분류ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'indn_qntt',			type: 'float' },		//지시수량
		{	name: 'day_qntt',			type: 'float' },		//금일생산수량
		{	name: 'day_per',			type: 'float' },		//금일%
		{	name: 'week_qntt',			type: 'float' },		//금주생산수량
		{	name: 'week_per',			type: 'float' },		//금주%
		{	name: 'month_qntt',			type: 'float' },		//당월생산수량
		{	name: 'month_per',			type: 'float' },		//당월%
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
