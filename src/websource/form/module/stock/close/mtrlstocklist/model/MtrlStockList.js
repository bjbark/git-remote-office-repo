Ext.define('module.stock.close.mtrlstocklist.model.MtrlStockList',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'wrhs_idcd',			type: 'string'},		//창고ID
		{	name: 'wrhs_name',			type: 'string'},		//창고ID
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'unit_name',			type: 'string'},		//단위
		{	name: 'acct_bacd',			type: 'string'},		//계정분류코드
		{	name: 'base_qntt',			type: 'float' },		//기초수량
		{	name: 'base_amnt',			type: 'float' },		//기초금액
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'istt_amnt',			type: 'float' },		//입고금액
		{	name: 'ostt_qntt',			type: 'float' },		//출고수량
		{	name: 'ostt_amnt',			type: 'float' },		//출고금액
		{	name: 'stok_qntt',			type: 'float' },		//재고수량
		{	name: 'stok_amnt',			type: 'float' },		//재고금액
		{	name: 'safe_qntt',			type: 'float' },		//안전재고
		{	name: 'defy_qntt',			type: 'float' },		//과부족
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
		{	name: 'zone_idcd',			type: 'string'},
		{	name: 'zone_name',			type: 'string'},
		{	name: 'zone_rack',			type: 'string'},
		{	name: 'zone_flor',			type: 'string'},
		{	name: 'zone_colm',			type: 'string'},
	]
});
