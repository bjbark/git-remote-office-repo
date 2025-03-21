Ext.define('lookup.popup.accountnumber.model.AccountNumber',{ extend:'Axt.data.Model', 
    fields: [
  	    { name : 'hq_id',			type : 'string' , defaultValue : _global.hq_id }, // 본사 ID
	    { name : 'account_id',			type : 'string' } , /* 계좌ID */
	    { name : 'account_gb',			type : 'string' } , /* 계좌 구분 [resource.getlist('stor_grp') ] : 1:모계좌,2:가상계좌]  */
	    { name : 'account_num',			type : 'string' } , /* 계좌번호 */
	    { name : 'account_nm',			type : 'string' } , /* 판매점 id */
	    { name : 'owner_nm',			type : 'string' } , /* 예금주 */
	    { name : 'virtual_use',			type : 'string' } , /* 가상계좌 사용여부 */
	    { name : 'base_account_id',		type : 'string' } , /* 모계좌 ID */
	    { name : 'bank_id',				type : 'string' } , /* 은행코드 (9003) */
	    { name : 'bank_nm',				type : 'string' } , /* 은행코드 (9003) */
	    { name : 'stor_id',			type : 'string' } , /* 사용사업장 */
	    { name : 'stor_nm',			type : 'string' } , /* 사용사업장 */
	    { name : 'mgr_stor_id',		type : 'string' } , /* 관리사업장 */
	    { name : 'mgr_stor_nm',		type : 'string' } , /* 관리사업장 */
	    { name : 'account_number_sts',	type : 'string' } , /* 계좌상태 (미사용)  */
	    { name : 'open_schd_dt',				type : 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr }, 
	    { name : 'user_memo',			type : 'string' } , /* 사용자 메모 */
	    { name : 'sys_memo',			type : 'string' } , /* 시스템 메모 */
	    { name : 'row_sts',			type : 'string' , defaultValue: '0' }, /* 데이터 상태 코드 */
	    { name : 'row_ord',			type : 'string' , defaultValue: '0' }, /* 표시 순서        */
    ]
});
