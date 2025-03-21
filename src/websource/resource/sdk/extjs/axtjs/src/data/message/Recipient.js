
Ext.define('Axt.data.message.Recipient',{ extend:'Ext.data.Model',
	fields:
	[
		{ name: 'receive'			 	, type: 'string' }, /* 수령자 명 */
	 	{ name: 'address'				, type: 'string' }  /* 수령자 주소 or 전화번호 */
    ]
});