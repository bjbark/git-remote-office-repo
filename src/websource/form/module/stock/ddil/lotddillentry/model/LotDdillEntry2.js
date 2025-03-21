Ext.define('module.stock.ddil.lotddillentry.model.LotDdillEntry2',{ extend:'Axt.data.Model',
	fields  : [
		{	name : 'invc_numb',			type: 'string'},		//invoice번호
		{	name : 'invc_date',			type: 'string'},		//invoice일자
		{	name : 'line_seqn',			type: 'float' },		//순번
		{	name : 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name : 'wrhs_idcd',			type: 'string'},		//창고ID
		{	name : 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name : 'stor_plac',			type: 'string'},		//보관창고
		{	name : 'modify',			type: 'string'},		//수정여부
		{	name : 'ddil_regi_yorn',	type: 'string'},		//실사등록여부
		{	name : 'ddil_regi_date',	type: 'string'},		//실사등록일자
		{	name : 'ddil_adpt_yorn',	type: 'string'},		//실사반영여부
		{	name : 'ddil_adpt_date',	type: 'string'},		//실사반영일자
		{	name : 'lott_numb',			type: 'string'},		//LOT번호
		{	name : 'item_idcd',			type: 'string'},		//품목ID
		{	name : 'item_code',			type: 'string'},		//품목코드
		{	name : 'item_name',			type: 'string'},		//품명
		{	name : 'item_spec',			type: 'string'},		//규격
		{	name : 'unit_name',			type: 'string'},		//단위명
		{	name : 'book_good_qntt',	type: 'float' },		//장부양품수량
		{	name : 'ddil_good_qntt',	type: 'float' },		//실사양품수량
		{	name : 'diff_good_qntt',	type: 'float' },		//차이양품수량
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
		{	name : 'crte_idcd',			type: 'string', defaultValue:_global.login_pk},		//생성ID
		{	name : 'crte_urif',			type: 'string'},		//생성UI
	]
});
