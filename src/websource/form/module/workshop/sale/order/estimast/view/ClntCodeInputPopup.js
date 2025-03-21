Ext.define('module.workshop.sale.order.estimast.view.ClntCodeInputPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-clntcode-input-popup',

	title		: '고객정보 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 660 ,
	height		: 280 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'clnt_name',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/item/itemmast/get/itemCode.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					stor_id			: _global.stor_id,
//					hqof_idcd		: _global.hqof_idcd
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else {
//					if(result.records.length>0){
//						var item_code = result.records[0].item_code;
//						me.down('[name=item_code]').setValue(item_code);
//					}
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});

	},

	/**
	 * 화면폼
	 */
	createForm: function() {
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
						{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			height		: 400 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 640,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('','전화번호'),
											name		: '',
											xtype		: 'textfield',
											allowBlank	: false	,
											fieldCls	: 'requiredindex',
											width		: 160
										},{	xtype		: 'lookupfield'	,
											name		: 'line_stat',
											lookupValue	: resource.lookup('line_stat'),
											width		: 55,
											margin		: '1 0 0 5'
										},{	fieldLabel	: Language.get('','가입일자'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 70,
											width		: 190
										},{	fieldLabel	: Language.get('','가입경로'),
											xtype		: 'lookupfield'	,
											name		: '',
											lookupValue	: resource.lookup(''),
											labelWidth	: 70,
											width		: 190
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('','고객명'),
											name		: '',
											xtype		: 'textfield',
											width		: 160
										},{	fieldLabel	: Language.get('','이메일'),
											name		: '',
											xtype		: 'textfield',
											margin		: '0 0 0 60',
											labelWidth	: 70,
											width		: 190
										},{	fieldLabel	: Language.get('','고객Code'),
											name		: '',
											xtype		: 'textfield',
											width		: 180,
											margin		: '0 0 0 10'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
									items	: [
										{	fieldLabel	: '주소',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'post_code',
											pair		: '',
											allowBlank	: true,
											clearable	: false ,
											editable	: true,
											hidden		: false,
											margin		: '0 0 0 28',
											width		: 160,
											popup		: {
												select	: 'DAUM',
												widget	: 'popup-zipcode-search',
												params	: { },
												result	: function(records, nameField, pairField){
													var panel   = nameField.up('form');
														if( records.length > 0 ){
															var address = records[0];
																nameField.setValue( address.zonecode );
																panel.down('[name=addr_1fst]' ).setValue( address.roadAddress );
																panel.down('[name=addr_2snd]').focus(true , 10);
														}
												}
											},
											listeners	: {
												change	: function(){
													Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
												}
											}
										},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '1 0 2 2', width : 438,hidden		: false,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items	: [
										{	xtype		: 'textfield',
											name		: 'addr_2snd',
											width		: 438,
											readOnly	: false,
											hidden		: false,
											maxLength	: 100,
											maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
											margin		: '0 0 0 190'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('','회원구분'),
											xtype		: 'lookupfield'	,
											name		: '',
											lookupValue	: resource.lookup(''),
											width		: 200
										},{	fieldLabel	: Language.get('','소속회사'),
											name		: '',
											pair		: '',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true ,
											width		: 200,
											margin		: '1 0 0 35',
											popup		: {
												widget	: 'lookup-cstm-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 10 18',
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items	: [
										{	fieldLabel	: Language.get('','회원메모'),
											name		: '',
											xtype		: 'textarea',
											height		: 45,
											width		: 610,
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},


	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues()
//			master	= Ext.ComponentQuery.query('module-saleorder3-worker-search')[0]
		;
//		if(values.item_name==''||values.item_name==null){
//			Ext.Msg.alert("알림","품명을 반드시  입력해주십시오.");
//			return;
//		};
//		if(values.item_spec==''||values.item_spec==null){
//			Ext.Msg.alert("알림","규격을 반드시  입력해주십시오.");
//			return;
//		};
//		if(values.bolt_name==''||values.bolt_name==null){
//			Ext.Msg.alert("알림","나사 호칭을 반드시  입력해주십시오.");
//			return;
//		};
//		if(values.bolt_pich==''||values.bolt_pich==null||values.bolt_pich==0){
//			Ext.Msg.alert("알림","나사 피치를 반드시  입력해주십시오.");
//			return;
//		};
//		if(values.leng_valu==''||values.leng_valu==null||values.leng_valu==0){
//			Ext.Msg.alert("알림","고정길이를 반드시  입력해주십시오.");
//			return;
//		};

		resource.keygen({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			object	: resource. keygen,
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'item_mast'
				})
			 },
			async  : false,
			callback : function( keygen ) {
				if (keygen.success) {
					me.down('[name=item_code]'	).setValue(keygen.records[0].seq);
					values.item_code = keygen.records[0].seq;
					master.down('[name=item_code]'	).setValue(keygen.records[0].seq);
				} else {
					Ext.Msg.alert("error", keygen.message  );
					return;
				}
			}
		});

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/item/itemmast/set/simple.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					item_idcd	: values.item_code,
//					item_code	: values.item_code,
//					item_name	: values.item_name,
//					item_spec	: values.item_spec,
//					acct_bacd	: '3000',
//					bolt_name	: values.bolt_name,
//					bolt_pich	: values.bolt_pich,
//					leng_valu	: values.leng_valu,
//					mntn_dpth	: values.mntn_dpth,
//					mtrl_dimt	: values.mtrl_dimt,
//					stor_id		: _global.stor_id,
//					hqof_idcd	: _global.hqof_idcd
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				master.down('[name=item_name]'	).setValue(values.item_name);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else {
//					me.setResponse( {success : true , values :  values });
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//				mask.hide();
//			}
//		});
	}
});
