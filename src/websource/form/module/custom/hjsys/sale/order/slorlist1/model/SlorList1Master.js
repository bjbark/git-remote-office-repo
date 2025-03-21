Ext.define('module.custom.hjsys.sale.order.slorlist1.model.SlorList1Master',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string' ,	//invoice번호
			convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'amnd_degr'			, type: 'float '  , defaultValue: 1		//amd차수
		},{	name: 'line_clos'			, type: 'float '  ,	//마감
			convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'chck_seqn'			, type: 'float '
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장ID
		},{	name: 'hidden_numb'			, type: 'string'	//선택용 invc
		},{	name: 'hide_cstm'			, type: 'string'	//선택용 고객명
		},{	name: 'hide_modl'			, type: 'string'	//선택용 모델명
		},{	name: 'hide_dlvy'			, type: 'string'	//선택용 납품처
		},{	name: 'hide_unit'			, type: 'string'	//선택용 단위
		},{	name: 'hide_invc_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//선택용 수주일
		},{	name: 'hide_deli_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//선택용 납기일
		},{	name: 'hide_acpt_qntt'		, type: 'float'	//선택용 수주수량
		},{	name: 'invc_date'			, type: 'string' ,	//INVOICE일자
			convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'ordr_dvcd'			, type: 'string' 	//오더구분코드
		},{	name: 'orig_invc_numb'		, type: 'string' 	//원INVOICE번호
		},{	name: 'modl_name'			, type: 'string' 	//모델명
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'expt_dvcd'			, type: 'string' 	//수출구분코드
		},{	name: 'pcod_numb'			, type: 'string' 	//PONO
		},{	name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
			convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'deli_rate'			, type: 'float' 	//품명수
		},{	name: 'cstm_idcd'			, type: 'string' 	//거래처ID
		},{	name: 'cstm_code'			, type: 'string' 	//거래처코드
		},{	name: 'dlvy_cstm_idcd'		, type: 'string' 	//납품거래처ID
		},{	name: 'dlvy_cstm_name'		, type: 'string' 	//납품처명
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'dlvy_cstm'			, type: 'string' 	//납품거래처명
		},{	name: 'cstm_name'			, type: 'string' 	//고객명
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'acpt_dvcd'			, type: 'string' 	//수주구분코드
		},{	name: 'mdtn_prsn'			, type: 'string' 	//중개인
		},{	name: 'cont_date'			, type: 'string' 	//계약일자
		},{	name: 'drtr_idcd'			, type: 'string' , defaultValue: _global.login_id		//담당자ID	//담당자ID
		},{	name: 'dept_idcd'			, type: 'string' 	//부서ID
		},{	name: 'crny_dvcd'			, type: 'string' 	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float ' , defaultValue : 0	 	//환율
		},{	name: 'ostt_wrhs_idcd'		, type: 'string' 	//출고창고ID
		},{	name: 'acpt_qntt'			, type: 'float ' 		//수주수량
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'unit_idcd'			, type: 'string' 	//단위ID
		},{	name: 'unit_name'			, type: 'string' 	//단위명
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'trut_dvcd'			, type: 'string' 	//위탁구분코드
		},{	name: 'dlvy_cond_dvcd'		, type: 'string' 	//인도조건구분코드
		},{	name: 'crdt_exce_yorn'		, type: 'string' 	//여신초과여부
		},{	name: 'amnt_lack_yorn'		, type: 'string' 	//금액미달여부
		},{	name: 'sale_stor_yorn'		, type: 'string' 	//판매보관여부
		},{	name: 'remk_text'			, type: 'string' 	//비고
		},{	name: 'memo'				, type: 'string' 	//메모
		},{	name: 'cofm_yorn'			, type: 'string' 	//확정여부
		},{	name: 'cofm_dttm'			, type: 'string' 	//확정일시
		},{	name: 'cstm_drtr_name'		, type: 'string' 	//거래처담당자명
		},{	name: 'cofm_drtr_idcd'		, type: 'string' 	//확정담당자ID
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0011'	//수주상태구분코드
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'drwg_cnfm_yorn_1fst'	, type: 'float'  , defaultValue: 0	// 도면1
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'drwg_cnfm_yorn_2snd'	, type: 'float'  , defaultValue: 0	// 도면2
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'esti_cnfm_yorn'		, type: 'float'  , defaultValue: 0	//견적여부
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'qntt_totl'			, type: 'float' 	//품명총수량
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'chk'					, type: 'string'	//체크
		},{	name: 'line_seqn'			, type: 'string'	//순번
		},{	name: 'user_memo'			, type: 'string'	//비고
			, convert : function(value, field ){
				if(field.data.line_seqn == 5){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct'				, type: 'string'	//구분
		},{	name: 'wkct_1'				, type: 'string'	//설계
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_2'				, type: 'string'	//전개
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_3'				, type: 'string'	//CAM
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_4'				, type: 'string'	//NCT
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_5'				, type: 'string'	//LASER
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_6'				, type: 'string'	//TAP
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_7'				, type: 'string'	//면취
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_8'				, type: 'string'	//홀면취
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_9'				, type: 'string'	//장공면취
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_10'				, type: 'string'	//버링
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_11'				, type: 'string'	//압입1
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_12'				, type: 'string'	//압입2
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_13'				, type: 'string'	//확공
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_14'				, type: 'string'	//C/S
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_15'				, type: 'string'	//디버링
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_16'				, type: 'string'	//절곡1
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_17'				, type: 'string'	//절곡2
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_18'				, type: 'string'	//사상
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_19'				, type: 'string'	//용접1
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_20'				, type: 'string'	//용접2
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_21'				, type: 'string'	//빠우
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_22'				, type: 'string'	//외주가공
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_23'				, type: 'string'	//조립
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_24'				, type: 'string'	//세척
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_25'				, type: 'string'	//검사
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_26'				, type: 'string'	//후TAP
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_27'				, type: 'string'	//검사
			, convert : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		}
	]
});
