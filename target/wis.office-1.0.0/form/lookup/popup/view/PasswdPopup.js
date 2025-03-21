Ext.define('lookup.popup.view.PasswdPopup',  { extend: 'Axt.popup.Search',
	alias	: 'widget.lookup-passwd-popup',
	title	: '사용 암호 변경' ,
	closable: true,
	autoShow: true,
	width	: 400 ,
	height	: 220,
	layout	: {
		type: 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;

		switch(me.popup.method) {
			case 'reinit' :
				me.title  = '패스워드 초기화' ,
				me.height = 150;
				break;
			case 'mypasswd' :
				me.height = 220;
				break;
			default:
				me.height = 175;
		}
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-panel',
				region		: 'center',
				border		:  false,
				dockedItems	: [
					{	xtype	: 'toolbar',
						dock	: 'bottom',
						items	: [
							'->' ,
							{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
							{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
						]
					}
				],
				items : [ (me.popup.method == 'reinit') ? me.reinitForm() : me.editorForm() ]
			};
		return form;
	},

	reinitForm : function () {
		var me		= this,
			form	= {
			xtype	: 'form-panel',
			border	:  false,
			padding	: 10 ,
			layout	: { type: 'vbox', align: 'stretch' } ,
			fieldDefaults: { labelWidth : 50, labelSeparator : '' },
			items	: [
				{	fieldLabel	: '휴대전화' ,
					name		: 'phone',
					xtype		: 'textfield' ,
					value		: me.popup.values.phone
				},{	fieldLabel	: 'e_Mail' ,
					xtype		: 'textfield' ,
					name		: 'email' ,
					value		: me.popup.values.email
				},{	xtype		: 'radiogroup',
					fieldLabel	: '전달방법',
					items		: [
					 	{boxLabel: '휴대전화로 비빌번호 전송', name: 'trans', inputValue: 1, checked : (me.popup.values.trans =='1') },
					 	{boxLabel: '전자메일로 비빌번호 전송', name: 'trans', inputValue: 2, checked : (me.popup.values.trans =='2') }
					]
				}
			]
		};
		return form;
	},



	editorForm : function () {
		var me = this, form =
		{
			xtype	: 'form-panel',
			border	:  false,
			padding	: 10 ,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype		: 'label'     ,
					text		: '현재 사용중인 암호를 입력해 주세요.' ,
					margin		: '0 0 3 0',
					hidden		: me.popup.method == 'mypasswd' ? false : true
				},{	name		: 'old_passwd'  ,
					xtype		: 'textfield',
					inputType	: 'password',
					hidden		: me.popup.method == 'mypasswd' ? false : true
				},{	xtype		: 'label'     ,
					text		: '새로운 암호를 입력해 주세요.' ,
					margin		: '5 0 3 0'
				},{	name		: 'new_passwd',
					xtype		: 'textfield' ,
					inputType	: 'password'  ,
				},{	xtype		: 'label'     ,
					text		: '새로운 암호를 다시한번 입력해 주세요.' ,
					margin		: '5 0 3 0'
				},{	xtype		: 'textfield' ,
					name		: 'chk_passwd' ,
					inputType	: 'password'  ,
				}
			]
		};
		return form;
	},



	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
			var me     = this,
				record = me.down('form').getValues()
			;
			if (me.popup.method == 'reinit') {
				var phone = Ext.String.trim(record.phone).replace(/-/gi, ''),
					email = Ext.String.trim(record.email)
					trans = record.trans
				;
				if (trans==1){
					if (phone.length <= 0){
						Ext.Msg.alert('알림',  '전화 번호를 입력하여 주시기 바랍니다.' );
					}
				} else {
					if (email.length <= 0){
						Ext.Msg.alert('알림',  '메일 주소를 입력하여 주시기 바랍니다.' );
					}
				}
				var mask = new Ext.LoadMask(me.getEl(), {msg: '초기화 암호 발송하는 중입니다.' });
				mask.show();
				setTimeout(function(){
					Ext.Ajax.request({
						url     : me.apiurl.master ,
						params  : {
							token : _global.token_id,
							param : JSON.stringify( Ext.merge( me.popup.params, { phone : phone, email : email, trans : trans } ))
						},
						//async   : false,
						method  : 'POST',
						success : function(response, request) {
							var result = Ext.decode(response.responseText);
							if (result.success ){
								Ext.Msg.alert('알림',  '초기화 암호를 발송 하엿습니다.' );
								me.setResponse(record);
							} else {
								Ext.Msg.alert('알림',  result.message );
								return;
							}
						},
						failure : function(result, request) {
							Ext.Msg.alert('알림',  '발송 실패 하였습니다.' );
						},
						callback : function() {
							mask.hide();
						}
					});
				},200);
			} else {



				var old_passwd = Ext.String.trim(record.old_passwd).toLowerCase() ,
					new_passwd = Ext.String.trim(record.new_passwd).toLowerCase() ,
					chk_passwd = Ext.String.trim(record.chk_passwd).toLowerCase()
				;
				if(_global.options.pswd_level){
					var	chk       = /[0-9a-zA-Z]/,
						pattern   = /[!@#$%^&*/]/gi
					;
					if(new_passwd.length < 8 || !chk.test(new_passwd) || !pattern.test(new_passwd) ) {
						resource.showError( '패스워드는 영문자, 숫자, 특수문자로 조합하여 입력해야합니다. (특수문자 : ! @ # $ % ^ & * /)');
						return ;
					}
				}

				if (new_passwd != chk_passwd){
					resource.showError( '변경할 암호가 일치하지 않습니다.');
					return ;
				}



				if (me.popup.method == 'mypasswd') {
					if (old_passwd == new_passwd ){
						resource.showError( '변경 전 암호와 변경 후 암호가 동일합니다.');
						return ;
					}
				}

				Ext.Ajax.request({
					url     : _global. location.http () + '/user/usermast/set/changepasswd.do' ,
					params  : {
						token : _global.token_id,
						param : JSON.stringify( Ext.merge(
							{ updt_idcd : _global.login_pk,
							  user_idcd : _global.login_pk,
							  old_pass  : old_passwd,
							  new_pass  : new_passwd
							}, me.popup.params
						))
					},
					async  : false,
					method  : 'POST',
					success : function(response, request) {
						var result = Ext.decode(response.responseText);
						if ( !result.success ){
							Ext.Msg.alert('알림',  result.message );
							return;
						} else {
							Ext.Msg.alert('알림',  '암호변경이 완료되었습니다.' );
						}
					},
					failure : function(result, request) {
					}
				}); // , {synchro : _global.objects.synchro}
				me.setResponse(record);
			}
		}
	});
