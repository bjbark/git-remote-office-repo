Ext.define('module.custom.iypkg.etc.trsfwork.model.TrsfWorkWorkerLister',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb',			type: 'string'},		//출고INVOICE번호
		{	name: 'line_seqn',			type: 'string'},		//출고순번
		{	name: 'new_invc_numb',		type: 'string'},		//새로운INVOICE번호
		{	name: 'new_line_seqn',		type: 'float' },		//순번
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.stor_id},		//사업장ID
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'prod_name',			type: 'string'},		//품목명
		{	name: 'prod_spec',			type: 'string'},		//품목규격
		{	name: 'prod_code',			type: 'string'},		//품목코드
		{	name: 'ostt_date',			type: 'string'},		//출고일자
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'invc_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//출고일자
		{	name: 'cars_idcd',			type: 'string'},		//차량ID
		{	name: 'cars_numb',			type: 'string'},		//차량번호
		{	name: 'nwek_name',			type: 'string'},		//차주
		{	name: 'cars_alis',			type: 'string'},		//차량별칭
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'crrr_name',			type: 'string'},		//운송자명
		{	name: 'dptr_time',			type: 'string'},		//출발시간
		{	name: 'arvl_time',			type: 'string'},		//도착시간
		{	name: 'need_time',			type: 'string'},		//소요시간
		{	name: 'runn_dist',			type: 'string'},		//운행거리
		{	name: 'trnt_exps',			type: 'float' },		//운송비
		{	name: 'sum_qntt',			type: 'float' },		//총출고량
		{	name: 'ostt_qntt',			type: 'float' },		//출고량
		{	name: 'sum_m2',				type: 'float' },		//총m2(전체)
		{	name: 'm2',					type: 'float' },		//총m2

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
