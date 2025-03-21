Ext.define('module.custom.iypkg.mtrl.po.purcordr3.model.PurcOrdr3WorkerMaster',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'acpt_numb',			type: 'string'},		//INVOICE번호	//수주
		{	name: 'new_invc_numb',		type: 'string'},		//순번		//수주
		{	name: 'new_line_seqn',		type: 'string'},		//순번		//수주
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.stor_id},		//사업장ID
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'drtr_name',			type: 'string'},		//담당자명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'deli_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//수주 납기일자
		{	name: 'prod_idcd',			type: 'string'},		//품목ID
		{	name: 'prod_code',			type: 'string'},		//품목코드
		{	name: 'prod_name',			type: 'string'},		//품명
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate},		//수주일자
		{	name: 'item_leng',			type: 'float' },		//장
		{	name: 'item_widh',			type: 'float' },		//폭
		{	name: 'item_hght',			type: 'float' },		//고
		{	name: 'acpt_qntt',			type: 'float' },		//수주량
		{	name: 'offr_date',			type: 'string'},		//발주일자
		{	name: 'offr_qntt',			type: 'float' },		//발주량
		{	name: 'offr_pric',			type: 'float' },		//발주단가
		{	name: 'offr_path_dvcd',		type: 'float' },		//발주구분코드
		{	name: 'unoffr',				type: 'float' },		//미발주잔량
		{	name: 'prod_qntt',			type: 'float' },		//수주생산
		{	name: 'offr_amnt',			type: 'float' },		//발주금액
		{	name: 'offr_vatx',			type: 'float' },		//발주부가세
		{	name: 'ttsm_amnt',			type: 'float' },		//합계금액
		{	name: 'offr_pric',			type: 'float' },		//단가

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string' , defaultValue: '0'},		//ROW마감
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
