/**
 * 공용 조회조건(다음 주소 입력) Type 1
 *
 * 사용 방법
Controller 내 requires 부문에
		'module.common.view.EditZipCode'
Editor에서
		{	xtype	: 'module-common-edit-zipcode'
		}
*/

Ext.define('module.common.view.EditZipCode', {  extend:'Axt.form.Panel'
	,xtype	: 'module-common-edit-zipcode'
//	,height	: 60
	,style	: 'padding-top : 0;padding-bottom : 0;padding-left : 0;padding-right : 0'
	,border	: 0
	,items	: [
		{	xtype	: 'fieldset'
			,border	: 0
			,style	: { borderColor	: '#263c63', borderStyle	: 'solid'}
			,flex	: 1
			,layout	: 'vbox'
			,items	: [
				{	xtype		: 'fieldset'
					,layout		: 'hbox'
					,padding	: '0'
					,border		:  0
					,items		: [
						{	fieldLabel	: '우편번호'
							,xtype		: 'popupfield'
							,name		: 'zip_cd'
							,pair		: ''
							,allowBlank	: true
							,clearable	: false
							,editable	: true
							,vtype		: 'zipcode'
							,width		: 185
							,popup		: {
								select	: 'DAUM',
								widget	: 'popup-zipcode-search',
								params	: { },
								result	: function(records, nameField, pairField){
									var panel   = nameField.up('form');
									if( records.length > 0 ){
										var address = records[0];
//										console.debug('address', address)
										nameField.setValue( address.postcode );
										panel.down('[name=addr_1]' ).setValue( address.roadAddress );
										panel.down('[name=addr_2]').focus(true , 10);
									}
								}
							}
						}
					]
				},{	name	: 'addr_1'	, width : 420 , xtype  : 'textfield' ,  margin : '0 0 2 75'
				},
				{	name	: 'addr_2'	, fieldLabel : '상세주소', xtype: 'textfield', width: 495, readOnly   : false 	, maxLength   : 100, 	maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.'
				},
			]
		}
	]
});