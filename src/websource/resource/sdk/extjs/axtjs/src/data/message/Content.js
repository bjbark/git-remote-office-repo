
Ext.define('Axt.data.message.Content',{ extend: 'Ext.data.Model',
	fields:
	[
	 	{ name: 'stor_id'				, type: 'string' }, /* 발신자명 , defaultValue : _global.stor_id  */
	 	{ name: 'smsdb_id'				, type: 'string' }, /* SMS연동DB ID  */
	 	{ name: 'provider'		    	, type: 'string' }, /* 서비스 공급사 id (구분) */
 		{ name: 'accounts'	     		, type: 'string' }, /* 서비스 사용자 cd (계정) */

	 	{ name: 'callback'				, type: 'string' }, /* 발신자 주소 or 전화번호 address */
	    { name: 'dispatch'	            , type: 'string' , defaultValue : 0 },  /* 0 : 즉시 1 : 예약 발송  */
	 	{ name: 'schedule'				, type: 'string' , defaultValue : Ext.Date.format(new Date(),'YmdHis')} ,  /* 발송 스케쥴 값이 존재하면 yyyymmddhhmmss  */
	 	{ name: 'content'				, type: 'string' },  /* 내용 */
	 	{ name: 'attribute'		    	, type: 'string'  , defaultValue : '0' }, /* SMS 이용시 [ 0 : 단문 , 1 : 장문], EMAIL 이용시는 그때가서 생각한다.   */

	 	{ name: 'subject'				, type: 'string' }, /* 제목 */

	 	{ name: 'method'				, type: 'string' }, /* 팩스 메세지 분류.  20 : local,  21 : 서버 업로드 */
	 	{ name: 'attach'				, type: 'string' }  /* 첨부방법 파일명 또는 Url path */
    ],
	associations:
	[
	 	{
	 		type: 'hasMany',
	 		model: 'Axt.data.message.Recipient',
	 		associationKey: 'records',
	 		name: 'records'
	 	}
	]
});