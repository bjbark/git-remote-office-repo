Ext.define('module.stock.ddil.ddilmake.model.DdilMake2',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'invc_date',			type: 'string'},		//invoice일자
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name: 'stor_plac',			type: 'string'},		//보관창고
		{	name: 'wrhs_idcd',			type: 'string'},		//보관창고 ID
		{	name: 'modify',				type: 'string'},		//수정유무
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'ddil_degi_yorn',		type: 'string'},		//실사등록여부
		{	name: 'ddil_degi_date',		type: 'string'},		//실사등록일자
		{	name: 'ddil_adpt_yorn',		type: 'string'},		//실사반영여부
		{	name: 'ddil_adpt_date',		type: 'string'},		//실사반영일자
		{	name: 'acct_bacd',			type: 'string'},		//계정분류코드
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'zone_idcd',			type: 'string'},		//zone id
		{	name: 'zone_name',			type: 'string'},		//zone 명
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'stnd_unit',			type: 'string'},		//기준단위
		{	name: 'book_good_qntt',		type: 'float' },		//장부양품수량
		{	name: 'book_poor_qntt',		type: 'float' },		//장부불량수량
		{	name: 'book_issb_qntt',		type: 'float' },		//장부입고대기수량
		{	name: 'book_qntt_ttsm',		type: 'float' },		//장부수량합계
		{	name: 'ddil_good_qntt',		type: 'float' },		//실사양품수량
		{	name: 'ddil_poor_qntt',		type: 'float' },		//실사불량수량
		{	name: 'ddil_issb_qntt',		type: 'float' },		//실사입고대기수량
		{	name: 'ddil_qntt_ttsm',		type: 'float' },		//실사수량합계
		{	name: 'diff_good_qntt',		type: 'float' },		//차이양품수량
		{	name: 'diff_poor_qntt',		type: 'float' },		//차이불량수량
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
	]
});
