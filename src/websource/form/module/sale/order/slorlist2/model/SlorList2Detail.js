Ext.define('module.sale.order.slorlist2.model.SlorList2Detail',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'line_seqn',			type: 'string'},		//invoice번호
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//품목규격
		{	name: 'modl_name',			type: 'string'},		//모델명
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'invc1_date',			type: 'string'},		//조회기간
		{	name: 'invc2_date',			type: 'string'},		//조회기간
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'drwg_numb',			type: 'string'},		//거래처명
		{	name: 'unit_wigt',			type: 'string'},		//거래처명
		{	name: 'invc_qntt',			type: 'float' },		//주문수량
		{	name: 'invc_amnt',			type: 'float' },		//주문금액
		{	name: 'ostt_qntt',			type: 'float' },		//출고수량
		{	name: 'qntt',				type: 'float' },		//미출고잔량
		{	name: 'invc_pric',			type: 'float' },		//단가
		{	name: 'sply_amnt',			type: 'float' },		//금액
		{	name: 'vatx_amnt',			type: 'float' },		//부가세
		{	name: 'invc_amnt',			type: 'float' },		//합계금액
		{	name: 'item_wigt',			type: 'float' },		//중량
		{	name: 'invc_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//주문일자
		{	name: 'item_clss_bacd_name',type: 'string'},		//품목군
		{	name: 'item_bacd_name',		type: 'string'},		//품목구분
		{	name: 'deli_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr}, 	/*납기일자*/
		{	name: 'ostt_work_cont_1',	type: 'string'},		//출고작업내용1
		{	name: 'ostt_work_cont_2',	type: 'string'},		//출고작업내용2
		{	name: 'dlvy_addr',			type: 'string'},		//배송처
		{	name: 'dely_cstm_name',		type: 'string'},		//배송지
		{	name: 'tele_numb',			type: 'string'},		//배송지 전화번호
		{	name: 'pcod_numb',			type: 'string'},		//배송지
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'remk_text',			type: 'string'},		//사용자메모
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
		{	name: 'cstm_prcs_numb',		type: 'string'},		//생성UI
		{	name: 'cstm_mold_code',		type: 'string'},		//생성UI
	]
});
