Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.model.MtrlOstt2Master', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'line_seqn',			type: 'string'},		//순번
		{	name: 'orig_invc_numb',		type: 'string'},		//원INVOICE번호
		{	name: 'orig_seqn',			type: 'string'},		//원순번
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//사용일자
		{	name: 'asmt_idcd',			type: 'string'},		//품목ID
		{	name: 'asmt_name',			type: 'string'},		//품명
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'asmt_dvcd',			type: 'string'},		//부자재구분코드
		{	name: 'ostt_qntt',			type: 'float' },		//사용수량
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'item_leng',			type: 'string'},		//장
		{	name: 'item_widh',			type: 'string'},		//폭
		{	name: 'item_hght',			type: 'string'},		//고
		{	name: 'spec',				type: 'string' ,		//규격
			convert : function(newValue , row){
				if(row.get('item_leng')==''&&row.get('item_widh')==''&&row.get('item_hght')==''){
					return '';
				}else{
					return row.get('item_leng')+'*'+row.get('item_widh')+'*'+row.get('item_hght');
				}
			}
		},
		{	name: 'remk_text',			type: 'string'},		//비고
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
