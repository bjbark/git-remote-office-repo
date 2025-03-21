Ext.define('module.custom.iypkg.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'acpt_numb',			type: 'string'},		//INVOICE번호
		{	name: 'asmt_dvcd',			type: 'string'},		//부자재구분코드
		{	name: 'acpt_dvcd',			type: 'string'},		//수주구분코드
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'acpt_cstm_name',		type: 'string'},		//거래처명
		{	name: 'prod_idcd',			type: 'string'},		//수주품목ID
		{	name: 'prod_name',			type: 'string'},		//수주품목명
		{	name: 'asmt_idcd',			type: 'string'},		//품목ID
		{	name: 'asmt_code',			type: 'string'},		//품목코드
		{	name: 'asmt_name',			type: 'string'},		//부자재명
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'offr_date',			type: 'float' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//발주일자
		{	name: 'deli_date',			type: 'float' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//납기일자
		{	name: 'offr_qntt',			type: 'float' },		//발주수량
		{	name: 'offr_pric',			type: 'float' },		//단가
		{	name: 'offr_amnt',			type: 'float' },		//발주공급가
		{	name: 'offr_vatx',			type: 'float' },		//발주부가세
		{	name: 'ttsm_amnt',			type: 'float' },		//발주합계
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'drtr_name',			type: 'string'},		//담당자명
		{	name: 'vatx_incl_yorn',		type: 'string' , defaultValue: '1'},		//자료구분 = 부가세포함여부
		{	name: 'offr_path_dvcd',		type: 'float' },		//발주경로구분
		{	name: 'new_invc_numb',		type: 'string'},		//새로운invoice번호
		{	name: 'new_line_seqn',		type: 'string'},		//새로운순번
		{	name: 'change'	,			type: 'string'},		//수정용
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.hq_id},			//사업장


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
