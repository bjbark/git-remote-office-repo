Ext.define('lookup.popup.model.CardIdPopup',{ extend:'Axt.data.Model',
    fields: [
 	    { name : 'hq_id',		type : 'string' , defaultValue : _global.hq_id }, // 본사 ID
	    { name : 'card_id',         type : 'string' }, /* 카드 id  */
	    { name : 'card_cd',         type : 'string' }, /* 카드 or 여권  */
	    { name : 'card_gb',         type : 'string' }, /*  04 :무기명카드 , 06:기명 ,  08: 기프트   */
	    { name : 'card_sts',        type : 'string' }, /* 00:대기,  1:정상   01: 발주  02:입고대기  03 입고 ,  10 :정상  30:분실, 32 :도난 ,40:정지, 90폐기   */
	    { name : 'card_nm',         type : 'string' }, /* 카드명           */
	    { name : 'card_brand_nm',   type : 'string' }, /* 카드 브랜드명    */
	    { name : 'card_issue_dt',   type : 'string' }, /* 발급,발행 일자   */
	    { name : 'start_dt',        type : 'string' }, /* 유효 기간(부터)  */
	    { name : 'expire_dt',       type : 'string' }, /* 유효 기간(까지)  */
	    { name : 'quantity',        type : 'float'   , defaultValue : 0 }, /* 수량 */
	    { name : 'user_memo',		type : 'string' } , /* 사용자 메모 */
	    { name : 'sys_memo',		type : 'string' } , /* 시스템 메모 */
	    { name : 'row_sts',		type : 'string' , defaultValue: '0' }, /* 데이터 상태 코드 */
	    { name : 'row_ord',		type : 'string' , defaultValue: '0' }, /* 표시 순서        */
	    { name : 'upt_ui',		type : 'string' } , /* 데이터 수정 화면 */
	    { name : 'upt_id',		type : 'string' , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
	    { name : 'upt_ip',		type : 'string' } , /* 데이터 수정자 ip */
	    { name : 'upt_dttm',		type : 'string' ,convert : Ext.util.Format.strToDateTime }, /* 데이터 수정일시  */
	    { name : 'crt_ui',		type : 'string' } , /* 데이터 생성 화면 */
	    { name : 'crt_id',		type : 'string' , defaultValue : _global.login_pk }, /* 데이터 생성자 명 */
	    { name : 'crt_ip',		type : 'string' } , /* 데이터 생성자 ip */
	    { name : 'crt_dttm',		type : 'string' ,convert : Ext.util.Format.strToDateTime }   /* 데이터 생성 일시 */
    ]
});
