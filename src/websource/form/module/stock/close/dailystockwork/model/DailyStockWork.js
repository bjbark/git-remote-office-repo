Ext.define('module.stock.close.dailystockwork.model.DailyStockWork',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'wkct_idcd',			type: 'string'},		//공정ID
		{	name: 'wkct_name',			type: 'string'},		//invoice일자
		{	name: 'invc_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	},	//invoice일자
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name : 'modify',			type: 'string'},		//수정여부
		{	name: 'optm_stok_qntt',		type: 'float'  , defaultValue : 0},			//적정재고수량
		{	name: 'pday_stok_qntt',		type: 'float'},			//전일재고수량
		{	name: 'cudt_istt_qntt',		type: 'float'},			//당일입고수량
		{	name: 'cudt_ostt_qntt',		type: 'float'},			//당일출고수량
		{	name: 'chge_qntt',			type: 'float'},			//조정수량
		{	name: 'tody_stok_qntt',		type: 'float'  , defaultValue : 0},			//금일재고수량
		{	name: 'stok_mngt_yorn',		type: 'string'},		//재고관리여부
		{	name: 'uper_seqn',			type: 'float'},			//상위순번
		{	name: 'disp_seqn',			type: 'float'},			//표시순번
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'exc_qntt',			type: 'float'},			//과부족수량
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
		{	name: 'updt_idcd',			type: 'string', defaultValue : _global.login_pk},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string', defaultValue : _global.login_pk},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
	]
});
