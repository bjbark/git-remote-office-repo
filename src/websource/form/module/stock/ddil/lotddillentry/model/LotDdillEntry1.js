Ext.define('module.stock.ddil.lotddillentry.model.LotDdillEntry1',{ extend:'Axt.data.Model',
	fields  : [
		{	name : 'lott_numb',			type: 'string'},		//LOT번호
		{	name : 'line_seqn',			type: 'float' },		//순번
		{	name : 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name : 'isos_dvcd',			type: 'string'},		//입출고구분코드
		{	name : 'invc_date',			type: 'string'},		//invoice일자
		{	name : 'invc_numb',			type: 'string'},		//invoice번호
		{	name : 'invc_seqn',			type: 'float' },		//invoice순번
		{	name : 'wrhs_idcd',			type: 'string'},		//창고ID
		{	name : 'wrhs_name',			type: 'string'},		//창고ID
		{	name : 'item_idcd',			type: 'string'},		//품목ID
		{	name : 'item_code',			type: 'string'},		//품목코드
		{	name : 'item_name',			type: 'string'},		//품명
		{	name : 'item_spec',			type: 'string'},		//규격
		{	name : 'qntt',				type: 'float' },		//수량
		{	name : 'stok_symb',			type: 'float' },		//재고부호
		{	name : 'uper_seqn',			type: 'float' },		//상위순번
		{	name : 'disp_seqn',			type: 'float' },		//표시순번
		{	name : 'bfre_qntt',			type: 'float' },		//전일재고
		{	name : 'istt_qntt',			type: 'float' },		//당일입고
		{	name : 'ostt_qntt',			type: 'float' },		//당일출고
		{	name : 'tdtt_qntt',			type: 'float' },		//당일재고
		{	name : 'user_memo',			type: 'string'},		//사용자메모
		{	name : 'sysm_memo',			type: 'string'},		//시스템메모
		{	name : 'prnt_idcd',			type: 'string'},		//부모ID
		{	name : 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name : 'line_ordr',			type: 'string'},		//ROW순서
		{	name : 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name : 'line_clos',			type: 'string'},		//ROW마감
		{	name : 'find_name',			type: 'string'},		//찾기명
		{	name : 'updt_user_name',	type: 'string'},		//수정사용자명
		{	name : 'updt_ipad',			type: 'string'},		//수정IP
		{	name : 'updt_dttm',			type: 'string'},		//수정일시
		{	name : 'updt_idcd',			type: 'string'},		//수정ID
		{	name : 'updt_urif',			type: 'string'},		//수정UI
		{	name : 'crte_user_name',	type: 'string'},		//생성사용자명
		{	name : 'crte_ipad',			type: 'string'},		//생성IP
		{	name : 'crte_dttm',			type: 'string'},		//생성일시
		{	name : 'crte_idcd',			type: 'string'},		//생성ID
		{	name : 'crte_urif',			type: 'string'},		//생성UI
	]
});
