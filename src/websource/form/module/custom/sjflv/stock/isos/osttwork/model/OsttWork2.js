Ext.define('module.custom.sjflv.stock.isos.osttwork.model.OsttWork2',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'line_seqn',			type: 'float'},
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//주문일자
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//품목규격
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'invc_qntt',			type: 'float'},			//주문수량
		{	name: 'pack_qntt',			type: 'float'},			//패킹단위
		{	name: 'boxx_wigt',			type: 'float', defaultValue: '20'},			//박스중량
		{	name: 'dely_cstm_name',		type: 'string'},		//배송지
		{	name: 'dlvy_addr',			type: 'string'},		//배송처
		{	name: 'deli_date', 			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr}, 	/*납기일자*/

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
	]
});
