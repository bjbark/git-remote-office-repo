Ext.define('module.mtrl.po.purcstokwork.model.PurcStokWorkLister',{ extend:'Axt.data.Model',
	fields  : [
	    {	name: 'invc_numb',			type: 'string'},		//invoice번호
	    {	name: 'invc_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//입고일자
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.hq_id},			//사업장
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'reqt_qntt',			type: 'float' },		//창고ID
		{	name: 'wrhs_idcd',			type: 'string'},		//창고ID
		{	name: 'wrhs_name',			type: 'string'},		//창고명
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'new_invc_numb',		type: 'string'},		//새로운invoice번호
		{	name: 'new_line_seqn',		type: 'string'},		//새로운순번
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
		{	name: 'stok_amnt',			type: 'float' },		//재고금액
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float' , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string', defaultValue: '0'},		//ROW상태
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
		{	name: 'unit_name',			type: 'string'},		//단위
		{	name: 'safe_stok',			type: 'string'},		//안전재고
		{	name: 'stok_qntt',			type: 'string'},		//현재고
		{	name: 'offr_qntt',			type: 'string'},		//발주수량
		{	name: 'dlvy_qntt',			type: 'string'},		//납품수량
		{	name: 'offr_rmin_qntt',		type: 'string'},		//발주잔량
		{	name: 'lack_offr_qntt',		type: 'string'},		//과부족 수량
		{	name: 'rqst_offr_qntt',		type: 'string', defaultValue: '0'}//발주필요수량
	]
});
