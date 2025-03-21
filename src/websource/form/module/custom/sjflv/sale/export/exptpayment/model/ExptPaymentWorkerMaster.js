Ext.define('module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerMaster',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'amnd_degr',			type: 'float '},		//AMD차수
		{	name: 'invc_date',			type: 'string'},		//INVOICE일자
		{	name: 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'expt_dvcd',			type: 'string'},		//수출구분코드
		{	name: 'mngt_numb',			type: 'string'},		//관리번호
		{	name: 'cstm_pcod_numb',		type: 'string'},		//고객PONO
		{	name: 'ship_viaa_dvcd',		type: 'string'},		//ShipVia구분코드
		{	name: 'buyr_name',			type: 'string'},		//바이어명
		{	name: 'mdtn_prsn',			type: 'string'},		//중개인
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'pric_cond_dvcd',		type: 'string'},		//가격조건구분코드
		{	name: 'trde_stot_dvcd',		type: 'string'},		//무역결제구분코드
		{	name: 'stot_time_dvcd',		type: 'string'},		//결제시기구분코드
		{	name: 'stot_ddln',			type: 'string'},		//결제기한
		{	name: 'mney_unit',			type: 'string'},		//화폐단위
		{	name: 'exrt',				type: 'float '},		//환율
		{	name: 'ship_port',			type: 'string'},		//선적항구
		{	name: 'etdd',				type: 'string'},		//ETD
		{	name: 'dsch_port',			type: 'string'},		//DischargingPort
		{	name: 'etaa',				type: 'string'},		//ETA
		{	name: 'arvl_port',			type: 'string'},		//도착항구
		{	name: 'ostt_schd_date',		type: 'string'},		//출고예정일자
		{	name: 'pckg_unit',			type: 'string'},		//포장단위
		{	name: 'ogin_name',			type: 'string'},		//원산지명
		{	name: 'vldt',				type: 'string'},		//Validity
		{	name: 'trde_trnt_dvcd',		type: 'string'},		//무역운송구분코드
		{	name: 'orig_invc_numb',		type: 'string'},		//원INVOICE번호
		{	name: 'orig_amnd_degr',		type: 'float '},		//원AMD차수
		{	name: 'dsct_yorn',			type: 'string'},		//중단여부
		{	name: 'cofm_yorn',			type: 'string'},		//확정여부
		{	name: 'expt_lcal_name',		type: 'string'},		//수출지역명
		{	name: 'pckg_totl_wigt',		type: 'float '},		//포장총중량






		{	name: 'ostt_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//입고일자
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
		{	name: 'work_item_name',		type: 'string'},		//품명
		{	name: 'work_item_idcd',		type: 'string'},		//품명

	]
});
