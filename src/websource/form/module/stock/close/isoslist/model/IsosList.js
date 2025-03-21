Ext.define('module.stock.close.isoslist.model.IsosList',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name: 'invc_dvcd',			type: 'string'},		//INVOICE구분코드
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//순번
//		{	name: 'invc_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE일자
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE일자
		{	name: 'invc_orgn',			type: 'string'},		//INVOICE출처
		{	name: 'wrhs_idcd',			type: 'string'},		//창고ID
		{	name: 'wrhs_name',			type: 'string'},		//창고ID
		{	name: 'zone_idcd',			type: 'string'},		//창고ID
		{	name: 'zone_name',			type: 'string'},		//창고ID
		{	name: 'dept_idcd',			type: 'string'},		//부서ID
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'cstm_dvcd',			type: 'string'},		//거래처구분코드
		{	name: 'cstm_idcd',			type: 'string'},		//고객ID
		{	name: 'acct_bacd',			type: 'string'},		//계정분류코드
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_spec',			type: 'string'},		//품목코드
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'make_date',			type: 'string', convert : Ext.util.Format.strToDate},		//
		{	name: 'rtil_ddln_date',		type: 'string', convert : Ext.util.Format.strToDate},		//
		{	name: 'stnd_pric',			type: 'float' },		//표준단가
		{	name: 'vatx_incl_yorn',		type: 'string'},		//부가세포함여부
		{	name: 'vatx_rate',			type: 'float' },		//부가세율
		{	name: 'qntt',				type: 'float' },		//수량
		{	name: 'pric',				type: 'float' },		//단가
		{	name: 'amnt',				type: 'float' },		//금액
		{	name: 'vatx',				type: 'float' },		//부가세
		{	name: 'stok_pric',			type: 'float' },		//재고단가
		{	name: 'stok_amnt',			type: 'float' },		//재고금액
		{	name: 'stok_qntt',			type: 'float' },		//재고량
		{	name: 'lott_numb',			type: 'string'},		//LOT번호
		{	name: 'orig_invc_numb',		type: 'string'},		//원INVOICE번호
		{	name: 'orig_seqn',			type: 'float' },		//원순번
		{	name: 'remk_text',			type: 'string'},		//원INVOICE번호
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'isos_evi',			type: 'string'},		//수불근거
		{	name: 'ostt_qntt',			type: 'float' },		//출고수량
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
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
		{	name: 'base_qntt',			type: 'float' , defaultValue: '0'},		//기초재고
	]
});
