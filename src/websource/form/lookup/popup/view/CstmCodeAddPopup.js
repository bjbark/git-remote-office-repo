Ext.define('lookup.popup.view.CstmCodeAddPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-cstmcode-add-popup',

	title		: '거래처 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 420 ,
	layout		: {
		type : 'border'
	},
	requires: [
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.UnitPopup',
	],

	defaultFocus : 'cstm_name',

	initComponent: function(config){
		var me = this;
		var code = '';
		var acct = new Array, acct_name = '',cstm_idcd = '', cstm_code = '';

//		Ext.Ajax.request({
//			url			: _global.location.http() + '/listener/seq/maxid.do',
//			params		: {
//				token	: _global.token_id ,
//				param	: JSON.stringify({
//					stor_id	: _global.stor_id,
//					table_nm: 'cstm_mast'
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				code = result.records[0].seq;
//			}
//		});

		if(me.params.acct != null){
			var bacd      = me.params.acct,
				acct_name = me.params.acct_name
			;
//			bacd.substr(0,1)=='2'?me.setHeight(180):me.setHeight(260);
			acct[0]= bacd;
			if(me.popup.params.acct_name){
				acct[1] = me.popup.params.acct_name
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/cust/cstmmast/get/lookup.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id   : _global.stor_id,
							hqof_idcd : _global.hqof_idcd,
//							cstm_idcd : cstm_code,
//							lcls_idcd : lcls_idcd,
//							base_code : bacd,
							line_stat : 0
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						acct[1] = result.records[0].base_name;
					}
				});
			}
		}
		me.items = [ me.createForm(code, acct)];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function(code, acct) {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm(code, acct) ]
		};
		return form;
	},

	editorForm : function (code, acct) {
		var me	= this,

		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 5 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
//			height	: 800 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 800,
							height		: 800 ,
							fieldDefaults: { width : 300, labelWidth : 70,  labelSeparator : '' },
							items		: [
								{
									xtype : 'fieldset',
									layout : 'hbox',
									padding : '0',
									border : 0,
									margin : '0 0 5 0',
									items : [
										{
											name : 'cstm_idcd',
											itemId: 'cstm_idcd',
											xtype : 'textfield',
//											value		: me.popup.param.cstm_idcd,
											hidden : true
										},{
											fieldLabel : Language.get('cstm_code','거래처코드'),
											name 		: 'cstm_code',
											itemId 		: 'cstm_code',
											xtype		: 'textfield',
											maxLength 	: 200,
											allowBlank 	: false,
											readOnly	: true,
											fieldCls	: 'requiredindex',
//											value		: me.popup.param.cstm_idcd,
											emptyText 	: Const.invalid.emptyValue
										}
									]
								},{
									fieldLabel : Language.get('', '거래처명'),
									name : 'cstm_name',
									xtype : 'textfield',
									maxLength : 200,
									allowBlank : false,
									onwerEditing : true,
									emptyText : Const.invalid.emptyValue
								},{
									xtype : 'fieldset',
									layout : 'hbox',
									padding : '0',
									border : 0,
									margin : '0 0 0 45',
									items : [
											{	fieldLabel : Language.get('sale_cstm_yorn','판매'),
												xtype : 'lookupfield',
												name : 'sale_cstm_yorn',
												width : 90,
												labelWidth : 26,
												lookupValue : resource.lookup('yorn'),
												value		: '1',
											},{
												fieldLabel : Language.get('puch_cstm_yorn','구매'),
												xtype : 'lookupfield',
												name : 'puch_cstm_yorn',
												width : 90,
												labelWidth : 26,
												lookupValue : resource.lookup('yorn'),
												value		: '0',
											},{
												fieldLabel : Language.get('otod_cstm_yorn','외주'),
												xtype : 'lookupfield',
												name : 'otod_cstm_yorn',
												lookupValue : resource.lookup('yorn'),
												width : 90,
												labelWidth : 26,
												value		: '0',
											}
										]
								},{
									xtype : 'fieldset',
									layout : 'hbox',
									padding : '0',
									border : 0,
									margin : '5 0 5 45',
									items : [
											{
												fieldLabel : Language.get('expt_cstm_yorn','수출'),
												xtype : 'lookupfield',
												name : 'expt_cstm_yorn',
												width : 90,
												labelWidth : 26,
												lookupValue : resource.lookup('yorn'),
												hidden : true
											},{
												fieldLabel : Language.get('incm_cstm_yorn','수입'),
												xtype : 'lookupfield',
												name : 'incm_cstm_yorn',
												width : 90,
												labelWidth : 26,
												lookupValue : resource.lookup('yorn'),
												hidden : true
											},{
												fieldLabel : Language.get('etcc_cstm_yorn','기타'),
												xtype : 'lookupfield',
												name : 'etcc_cstm_yorn',
												width : 90,
												labelWidth : 26,
												lookupValue : resource.lookup('yorn'),
												value		: '0',
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
												{
													fieldLabel : '사업자명',
													name : 'buss_name',
													xtype : 'textfield',
													readOnly : false,
													onwerEditing : true,
													width : 200,
													labelWidth : 70,
													allowBlank : (_global.options.mes_system_type == 'Window' ? true: false),
													emptyText : (_global.options.mes_system_type == 'Window' ? '': Const.invalid.emptyValue)
												},{
													fieldLabel : '사업자 구분',
													name : 'corp_dvcd',
													xtype : 'lookupfield',
													width : 130,
													labelWidth : 70,
													lookupValue : resource.lookup('corp_dvcd'),
													onwerEditing : true
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
												{
													fieldLabel : '사업자번호',
													name : 'buss_numb',
													xtype : 'textfield',
													readOnly : false,
													onwerEditing : true,
													allowBlank : false,
													width : 200,
													labelWidth : 70,
													emptyText : Const.invalid.emptyValue,
													vtype : _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false: 'bizno'
												},{
													fieldLabel : '대표자명',
													name : 'boss_name',
													xtype : 'textfield',
													width : 130,
													labelWidth : 70,
													readOnly : false,
													onwerEditing : true
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
												{
													fieldLabel : '업태',
													name : 'buss_type',
													xtype : 'textfield',
													readOnly : false,
													onwerEditing : true,
													width : 200,
													labelWidth : 70,
												},{
													fieldLabel : '전화번호',
													name : 'tele_numb',
													xtype : 'textfield',
													vtype : _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false: 'phone',
													readOnly : false,
													onwerEditing : true,
													width : 170,
													labelWidth : 70,
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
												{
													fieldLabel : '업종',
													name : 'buss_kind',
													xtype : 'textfield',
													readOnly : false,
													onwerEditing : true,
													width : 200,
													labelWidth : 70,
												},{
													fieldLabel : '팩스번호',
													name : 'faxi_numb',
													xtype : 'textfield',
													vtype : _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false: 'fax'|| _global.options.mes_system_type.toUpperCase() == 'DAE-A' ? false : 'fax',
													onwerEditing : true,
													width : 170,
													labelWidth : 70,
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
												{
													fieldLabel : '계산서메일',
													name : 'mail_addr',
													xtype : 'textfield',
													width : 200,
													labelWidth : 70,
													readOnly : false,
													onwerEditing : true,
													listeners : {
														blur : function() {
															var val = this.getValue(), reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
															if (!val == ''|| !val == null) {
																if (!reg_email.test(val)) {
																	Ext.Msg.alert("알림","이메일 형식에 맞게 작성하여 주십시오. (띄어쓰기 확인필요)");
																	this.reset();
																}
															}
														}
													}
												},{
													fieldLabel : '휴대전화',
													name : 'hdph_numb',
													xtype : 'textfield',
													vtype : _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false: 'mobile',
													width : 170,
													labelWidth : 70,
													onwerEditing : true
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
												{
													fieldLabel : '주소',
													xtype : 'popupfield',
													editable : true,
													enableKeyEvents : true,
													name : 'post_code',
													pair : '',
													allowBlank : true,
													clearable : false,
													editable : true,
													hidden : false,
													width : 160,
													popup : {
														select : 'DAUM',
														widget : 'popup-zipcode-search',
														params : {},
														result : function(
																records,
																nameField,
																pairField) {
															var panel = nameField.up('form');
															if (records.length > 0) {
																var address = records[0];
																nameField.setValue(address.zonecode);
																panel.down('[name=addr_1fst]').setValue(address.roadAddress);
																panel.down('[name=addr_2snd]').focus(true,10);
															}
														}
													},
													listeners : {
														change : function() {
															Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
														}
													}
												}, {
													name : 'addr_1fst',
													xtype : 'textfield',
													margin : '0 0 2 2',
													width : 208,
													hidden : false,
												}
											]
										},{	xtype	: 'panel',
											layout	: 'hbox',
											border	: 0,
											margin	: '5 0 0 0',
											items	: [
														 {
													xtype : 'textfield',
													name : 'addr_2snd',
													width : 295,
													readOnly : false,
													hidden : false,
													maxLength : 100,
													maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
													margin : '0 0 5 75'
												}
											]
										},{
											layout : 'hbox',
											border : 0,
											region : 'center',
											margin : '0 0 5 0',
											fieldDefaults : {
												labelSeparator : ''
											},
										items : [
												{
													xtype : 'textfield',
													fieldLabel : '즐겨찾기',
													name : 'favo_numb',
													value : null,
													width : 200,
													labelWidth : 70,
													fieldStyle : 'text-align:right;',
													readOnly : false,
													hidden : false,
													margin : '2 0 0 0',
													listeners : {
														blur : function() {
															var fav = this.getValue(), val = Number(fav), check = 0;
															;
															if (!(fav == null || fav == '')) {
																if (isNaN(val)) {
																	check = 1;
																} else {
																	if (val > 99999|| val < 1) {
																		check = 1;
																	}
																}
															}

															if (check != 0) {
																Ext.Msg.alert("알림","1~99999 까지의 숫자만 입력하여 주십시오.");
																this.reset();
															}
														}
													}
												}
											]
										}
									]
								}
							]
						}
					]
				}
			;
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			item_leng	= "",
			invc	= "",
			code	= ""
		;
		if(values.cstm_name==''||values.cstm_name==null){
			Ext.Msg.alert("알림","거래처명을 반드시 입력해주십시오.");
			return;
		};

		if(values.buss_numb==''||values.buss_numb==null){
			Ext.Msg.alert("알림","사업자번호를 반드시 입력해주십시오.");
			return;
		};

		if(values.item_leng <= 0){

		}
		if(_global.options.mes_system_type !='Frame'){
			code = values.cstm_code;
		}else{
			values.cstm_code = code;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/cust/cstmmast/set/add.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					cstm_idcd		: values.cstm_idcd,
					cstm_code		: values.cstm_code,
					cstm_name		: values.cstm_name,
					cstm_spec		: values.cstm_spec,
					sale_cstm_yorn	: values.sale_cstm_yorn,
					puch_cstm_yorn	: values.puch_cstm_yorn,
					otod_cstm_yorn	: values.otod_cstm_yorn,
					expt_cstm_yorn	: values.expt_cstm_yorn,
					incm_cstm_yorn	: values.incm_cstm_yorn,
					etcc_cstm_yorn	: values.etcc_cstm_yorn,
					buss_name		: values.buss_name,
					buss_numb		: values.buss_numb,
					buss_type		: values.buss_type,
					buss_kind		: values.buss_kind,
					corp_dvcd		: values.corp_dvcd,
					boss_name		: values.boss_name,
					tele_numb		: values.tele_numb,
					faxi_numb		: values.faxi_numb,
					mail_addr		: values.mail_addr,
					tele_numb		: values.tele_numb,
					hdph_numb		: values.hdph_numb,
					post_code		: values.post_code,
					addr_2snd		: values.addr_2snd,
					addr_1fst		: values.addr_1fst,
					base_addr_engl	: values.base_addr_engl,
					favo_numb		: values.favo_numb,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	},

});
