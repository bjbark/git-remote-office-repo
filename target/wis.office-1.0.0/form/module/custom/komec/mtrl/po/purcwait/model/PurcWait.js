Ext.define('module.custom.komec.mtrl.po.purcwait.model.PurcWait',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//품목규격
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'lott_numb',			type: 'string'},		//lot번호
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'deli_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'offr_qntt',			type: 'float' },		//발주수량
		{	name: 'istt_qntt',			type: 'float' },		//발주수량
		{	name: 'rnum',				type: 'float' },		//NO
		{	name: 'upid_baln_qntt',		type: 'float' },		//미납잔량
		{	name: 'qntt',				type: 'float' },		//
		{	name: 'divs_qntt',			type: 'float' },		//라벨수량
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//발주일자
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'supl_dvcd',			type: 'String' },		//조달구분
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string', defaultValue:_global.login_pk},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
		{	name: 'remk_text',			type: 'string'},		//비고		
	]
});
