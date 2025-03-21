Ext.define('com.view.main.MainPswd',{extend : 'Ext.container.Container',
	alias	: 'widget.mainpswd',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.form.Panel',
		'Ext.form.field.Checkbox',
		'Ext.form.field.Text',
		'Ext.util.Cookies',
		'Axt.Encrypts'
	],
	closable	: true,
	autoShow	: true,
	layout		: { type : 'border' },
	initComponent : function(config) {
		var me = this,
			_process = Ext.isEmpty(_access.process) ? {
				location : '',
				accessor : '',
				onscreen : 'false',
				protocol : {},
			}:Ext.decode(_access.process), licenses = localStorage.getItem('licenses'),
			identify = Ext.merge( (licenses) ? Ext.decode(Encrypts.decode(licenses)) : {}, _process)
		;

		if (licenses) {
			var identify = Ext
					.decode(Encrypts.decode(licenses));
		}

		var stor_value  = "";

		stor_value = Ext.util.Cookies.get('stor_id')?Axt.Encrypts.decode(Ext.util.Cookies.get('stor_id')).substr(5,Axt.Encrypts.decode(Ext.util.Cookies.get('stor_id')).length):'';

		me.style = 'background: url(resource/img/erp_bg.jpg) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;';
		me.items = [ me.createForm({
			stor_id     : identify.stor_id,
			stor_value  : stor_value.toUpperCase()
		}) ];
		me.callParent(arguments);
		delete _access.process;
	},

	createForm : function (config) {
		var me = this,
			form = {
				xtype	: 'form',
				bodyStyle: 'background-color:rgba(0, 0, 0, 0.8); border: none;',
				name	: 'loginForm',
				region	: 'center',
				padding	: 0,
				height	: 240,
				width	: 450,
				x		: (window.innerWidth - 400)/1.2,
				y		: window.innerHeight - 660,
				//x		: (window.innerWidth - 400) / 2,
				//y		: window.innerHeight - 280,
				//frame	: true,
				bodyPadding : 0,
				border	: true,
				defaultType : 'textfield',
				items 	: [
					{	xtype	: 'fieldcontainer',
						layout	: { type : 'vbox' },
						margin	: '0 0 0 80',
						border	: 0,
						items	: [
							{	xtype	: 'fieldcontainer',
								layout	: {	type : 'hbox',	align : 'stretch' },
								items	: [
									{	xtype	: 'fieldcontainer',
										layout	: {	type : 'vbox',	align : 'stretch' },
										margin	: '2 0 0 0',
										items	: [
											{	xtype	: 'fieldcontainer',
												layout	: {	type : 'hbox',	align : 'stretch' },
												margin	: '5 0 0 0',
												items	: [
													{	fieldLabel	: '',
														name		: 'stor_id',
														xtype		: 'textfield',
														allowBlank	: false,
														margin		: '0 0 0 0',
														readOnly	: false,
														width		: 150,
														enableKeyEvents : true,
														hidden		: true,
														value		: config.stor_value,
														listeners	: {
															keydown : function(self, e) {
																if (e.getKey() == e.ENTER) {
																	var loginid = self.up('form').down('[name=login_id]');
																		loginid.focus(true,10);
																}
															}
														}
													}
												]
											},
											{	xtype	: 'fieldcontainer',
												layout	: {	type : 'hbox',	align : 'stretch' },
												margin	: '5 0 0 0',
												items	: [
													{	xtype	: 'label',
														text	: 'SIGN IN',
														style	: 'color: white; font-size: 25px !important;',
														margin	: '5 10 0 5'
													}
												]
											},
											{	xtype	: 'fieldcontainer',
												layout	: {	type : 'hbox',	align : 'stretch' },
												margin	: '5 0 0 0',
												items	: [
													{	xtype	: 'fieldcontainer',
														layout	: {	type : 'vbox',	align : 'stretch' },
														margin	: '5 0 0 0',
														items	: [
															{	xtype	: 'fieldcontainer',
																layout	: {	type : 'hbox',	align : 'stretch' },
																margin	: '0 0 0 5',
																items	: [
																	/*{	xtype	: 'label',
																		text	: '로그인ID',
																		margin	: '5 10 0 0'
																	},*/
																	{	fieldLabel 	: '',
																		name		: 'login_id',
																		xtype		: 'textfield',
																		allowBlank	: false,
																		width		: 150,
																		emptyText	: '로그인 ID를 입력 하세요.',
																		enableKeyEvents : true,
																		listeners	: {
																			keydown : function(self,e) {
																				if (e.getKey() == e.ENTER) {
																					var password = self.up('form').down('[name=password]');
																						password.focus(true,10);
																				}
																			}
																		}
																	}
																]
															},
															{	xtype	: 'fieldcontainer',
																layout	: {type : 'hbox',align : 'stretch' },
																margin	: '5 0 0 5',
																items	: [
																	/*{	xtype	: 'label',
																		text	: '패스워드',
																		margin	: '5 10 0 0'
																	},*/{	fieldLabel	: '',
																		name		: 'password',
																		xtype		: 'textfield',
																		allowBlank	: false,
																		emptyText	: '패스워드를 입력 하세요.',
																		inputType	: 'password',
																		width		: 150,
																		value		: _global.debugged ? ''	: '',
																		enableKeyEvents : true,
																		listeners	: {
																			afterrender : function(field) {field.focus(false,100); },
																			keydown : function(self,e) {
																				if (e.getKey() == e.ENTER) {
																					var loginButton = self.up('form').down('[action=login]');
																						loginButton.fireEvent('click',loginButton);
																				}
																			}
																		}
																	}
																]
															},
														]
													},{	xtype	: 'button',
														action	: 'login',
														text	: '<span style="text-decoration;line-height:45px;"><font bold color="white" size= "2">LOGIN</font></span>',
														data	: {	login_gb : ''
														},
														width	: 80,
														height	: 27,
														style	: 'background-color: #002c75 !important; opacity: 1 !important;',
														border	: 0,
														cls		: 'button-style',
														margin	: '5 5 0 5',
													}
												]
											},
											{	xtype	: 'fieldcontainer',
												layout	: {type : 'hbox',align : 'stretch' },
												margin	: '5 0 0 5',
												items	: [
													/*{	xtype	: 'label',
														text	: '언어',
														margin	: '5 10 0 0',
														width	: 42,
													},*/
													{	fieldLabel	: '',
														name		: 'lang_gbcd',
														xtype		: 'lookupfield'  ,
														width		: 150,
														value		: 'KOR',
														editable	: false,
														autoSelection : true ,
														lookupValue   : [['KOR','한국어'],['ENG','English'], ['CHI','中國語'], ['JPN','日本語']]
													},{	xtype	:'button',
														action	:'setup',
														width 	: 80,
														height	: 22,
														margin 	: '0 5 0 5' ,
														padding : '0 0 0 0',
														border	: 0,
														text	: '<span style="text-decoration;line-height:22px;"><font bold color="white" size= "2">사용인증</font></span>',
														style	: 'background-color: #004a89 !important;',
														cls		: 'button-style',
													},{	xtype	:'button',
														iconCls	: 'icon-gear',
														action	: 'gear' ,
														margin	: '0 10 0 2',
														width	: 22,
														height	: 22
													},
												]
											},
											{	name	: 'accessor',
												xtype	: 'textfield',
												value	: !Ext.isEmpty(_access.process) ? config.accessor: '',hidden : true
											},
											{	xtype	: 'fieldcontainer',
												layout	: { type: 'hbox', align: 'stretch' },
												margin	: '2 0 0 0',
												items	: [
/*
													{	// 배포전 테스트용 로그인 정보 자동입력 버튼
														xtype	:'button',
														hidden	: Boolean( window.location.hostname != 'localhost' ) ,
														text	: '테스트', handler:function (){
															me.down('[name=loginForm]').getForm().setValues({
																stor_id	: 'WINFO1000',
																login_id: 'developer',
																password: '1234567',
																remember: false
															});
														}
													},
*/
												]
											},{	xtype	: 'fieldcontainer',
												layout	: {type : 'hbox',align : 'stretch' },
												margin	: '5 0 0 5',
												items	: [
													{	xtype	:'button',
														action	:'signup',
														width 	: 190,
														height	: 30,
														margin 	: '10 0 0 25' ,
														padding : '0 0 0 0',
														border	: 0,
														text	: '<span style="text-decoration;line-height:30px;"><font bold color="white" size= "2">회원가입</font></span>',
														style	: 'background-color: #007189 !important;',
														cls		: 'button-style',
													}
												]
											},/*{
												layout	:  'hbox',
												margin	: '15 0 0 0',
												items	: [
													{	xtype	: 'label',
														cls		: 'textTemp',
														style	: 'text-align:center; font-size:1.4em; ',
														text	: '6개월마다 비밀번호를 변경하여 안전하게 관리해 주십시오.',
														padding : '5 0 0 2',
														margin	: '5 0 0 -5',
														width	: 220,
														height	: 50,
													}
													
												]
											}*/
											/*{
												xtype: 'label',
											    text: '6개월마다 비밀번호를 변경하여 안전하게 관리해 주십시오.',
											    margin: '15 0 0 5',
											    style: 'font-size:15px; color:#FFF;'
											}*/
											{
												xtype: 'container',
												layout: {
													type: 'hbox',
													align: 'middle'
												},
												margin: '15 0 0 0',
												items: [
													{
														xtype: 'image',
														src: '/resource/img/quote-left.png',  // 왼쪽 이미지 경로
														width: 10,
														height: 10,
														margin: '0 10 0 0'
													},{	xtype: 'label',
														text: '6개월마다 비밀번호를 변경하여 안전하게 관리해 주십시오.',
														style: 'font-size:15px; color:#FFF;'
													},{	xtype: 'image',
														src: '/resource/img/quote-right.png',  // 오른쪽 이미지 경로
														width: 10,
														height: 10,
														margin: '0 0 0 10'
													}
												]
											}
										]
									}
								]
							} ]
						} ]
					};
					return form;
				}
			});
