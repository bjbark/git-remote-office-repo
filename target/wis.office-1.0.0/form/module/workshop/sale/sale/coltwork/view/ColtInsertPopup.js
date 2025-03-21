Ext.define('module.workshop.sale.sale.coltwork.view.ColtInsertPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-coltinsert-popup',

	title		: '개별 수금  등록',
	closable	: true,
	autoShow	: true,
	width		: 760 ,
	height		: 560 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'plan_name',

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
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm(),me.createTabs() ]
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
			height		: 100 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 700,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('','주문번호'),
											name		: '',
											xtype		: 'textfield',
											allowBlank	: false	,
											fieldCls	: 'requiredindex',
											width		: 200
										},{	fieldLabel	: Language.get('','주문일자'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 70,
											width		: 190
										},{	fieldLabel	: Language.get('','출고일자'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 70,
											width		: 170,
											margin		: '0 0 0 45',
										},{	xtype		: 'numericfield',
											name		: '',
											width		: 55,
											margin		: '1 0 0 5',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('','고객명'),
											name		: '',
											xtype		: 'textfield',
											width		: 200
										},{	fieldLabel	: Language.get('','전화번호'),
											name		: '',
											xtype		: 'textfield',
											labelWidth	: 70,
											width		: 190
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('','요청메모'),
											name		: '',
											xtype		: 'textfield',
											width		: 666
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

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'south',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(), me.createTab2() , me.createTab3() , me.createTab4() , me.createTab5() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('','주문품목'),
				xtype		: 'form-panel',
				layout		: 'vbox',
				border		: 0,
				height		: 495,
				bodyStyle	: { padding: '10px' , margin		: '5 0 0 10',},
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','주문품목'),
								name		: '',
								pair		: '',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								readOnly	: true,
								labelWidth	: 60,
								width		: 160,
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
							},{	name		: '',
								pair		: '',
								xtype		: 'popupfield',
								editable	: true,
								readOnly	: true,
								enableKeyEvents : true,
								clearable	: true ,
								width		: 125,
								margin		: '1 0 0 5',
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
							},{	name		: '',
								pair		: '',
								readOnly	: true,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								width		: 125,
								margin		: '1 0 0 5',
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
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','제목'),
								xtype		: 'textfield',
								name		: '',
								labelWidth	: 60,
								width		: 420,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','컬러'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 160,
								readOnly	: true,
							},{	fieldLabel	: Language.get('','인쇄방식'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 50,
								width		: 170,
								readOnly	: true,
								margin		: '0 0 0 45'
							},{	fieldLabel	: Language.get('','원단'),
								name		: '',
								pair		: '',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 50,
								width		: 170,
								margin		: '0 0 0 10',
								readOnly	: true,
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
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','용지사이즈'),
								xtype		: 'lookupfield'	,
								name		: '',
								readOnly	: true,
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 160,
								readOnly	: true,
								margin		: '0 10 0 0'
							},{	fieldLabel	: Language.get('','페이지'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 50,
								width		: 110,
								readOnly	: true,
								margin		: '0 0 0 35'
							},{	fieldLabel	: Language.get('','권'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 20,
								width		: 60,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','제본종류'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 160,
								readOnly	: true,
							},{	fieldLabel	: Language.get('','제본방향'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 50,
								width		: 170,
								readOnly	: true,
								margin		: '0 0 0 45'
							},{	fieldLabel	: Language.get('','제본철'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 50,
								width		: 170,
								readOnly	: true,
								margin		: '0 0 0 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','방향'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 160,
								readOnly	: true,
							},{	fieldLabel	: Language.get('','견적단가'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 50,
								width		: 170,
								margin		: '0 0 0 45',
								readOnly	: true
							},{	fieldLabel	: Language.get('','수주금액'),
								xtype		: 'numericfield',
								name		: '',
								labelWidth	: 50,
								width		: 170,
								readOnly	: true,
								margin		: '0 0 0 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 15 0',
						items	: [
							{	xtype		: 'filefield',
								name		: 'files',
								fieldLabel	: '첨부파일',
								msgTarget	: 'side',
								allowBlank	: false,
								anchor		: '100%',
								labelWidth	: 60,
								width		: 440,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','수금일자'),
								xtype		: 'datefield',
								name		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 60,
								width		: 160,
							},{	fieldLabel	: Language.get('','담당자'),
								name		: '',
								pair		: '',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 50,
								width		: 170,
								margin		: '0 0 0 45',
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
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','인쇄비'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 140,
							},{	fieldLabel	: Language.get('','표지'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 40,
								width		: 120,
								margin		: '0 0 0 30',
							},{	fieldLabel	: Language.get('','간지'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 40,
								width		: 120,
								margin		: '0 0 0 7',
							},{	fieldLabel	: Language.get('','배송비'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 40,
								width		: 120,
								margin		: '0 0 0 5',
							},{	fieldLabel	: Language.get('','합계금액'),
								xtype		: 'numericfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 140,
								margin		: '0 0 0 5',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	xtype		: 'label',
								text		: '계약금',
								style		: { color : 'Blue' },
								width		: 37,
								margin		: '2 0 0 28',
							},{	xtype		: 'numericfield',
								name		: '',
								width		: 75,
							},{	xtype		: 'label',
								text		: '수금할 금액',
								style		: { color : 'Red' },
								width		: 60,
								margin		: '2 0 0 15',
							},{	xtype		: 'numericfield',
								name		: '',
								width		: 75,
							},{	xtype		: 'label',
								text		: '수금액',
								style		: { color : 'Blue' },
								width		: 37,
								margin		: '2 0 0 15',
							},{	xtype		: 'numericfield',
								name		: '',
								width		: 75,
							},{	xtype		: 'label',
								text		: '할인',
								style		: { color : 'Blue' },
								width		: 27,
								margin		: '2 0 0 23',
							},{	xtype		: 'numericfield',
								name		: '',
								width		: 75,
							},{	xtype		: 'label',
								text		: '잔액',
								style		: { color : 'Red' },
								width		: 27,
								margin		: '2 0 0 43',
							},{	xtype		: 'numericfield',
								name		: '',
								width		: 75,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','수금방법'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 180,
							},{	fieldLabel	: Language.get('','수금근거'),
								xtype		: 'textfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 265,
								margin		: '0 0 0 97',
							}
						]
					}
				]
			}
		;
		return item;
},
	createTab2 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '표지'),
				layout		: 'vbox',
				border		: 0,
				height		: 495,
				bodyStyle	: { padding: '5px', margin		: '2 0 0 20'},
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','사양'),
								xtype		: 'textfield',
								readOnly	: true,
								name		: '',
								labelWidth	: 60,
								width		: 420,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','컬러'),
								xtype		: 'lookupfield'	,
								readOnly	: true,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 180,
							},{	fieldLabel	: Language.get('','용지'),
								name		: '',
								pair		: '',
								xtype		: 'popupfield',
								readOnly	: true,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 70,
								width		: 170,
								margin		: '0 0 0 70',
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
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','디자인여부'),
								xtype		: 'lookupfield'	,
								readOnly	: true,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 180,
							},{	fieldLabel	: Language.get('','디자인번호'),
								name		: '',
								xtype		: 'textfield',
								readOnly	: true,
								labelWidth	: 70,
								width		: 170,
								margin		: '0 0 0 70',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	xtype		: 'filefield',
								name		: 'files',
								fieldLabel	: '첨부파일',
								msgTarget	: 'side',
								allowBlank	: false,
								anchor		: '100%',
								labelWidth	: 60,
								width		: 375,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','견적가'),
								name		: '',
								xtype		: 'numericfield',
								readOnly	: true,
								labelWidth	: 60,
								width		: 180,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'user_memo',
								xtype		: 'textarea',
								readOnly	: true,
								height		: 65,
								labelWidth	: 60,
								width		: 420,
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab3 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '간지'),
				layout		: 'vbox',
				border		: 0,
				height		: 495,
				bodyStyle	: { padding: '10px', margin		: '5 0 0 20' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','용지'),
								name		: '',
								pair		: '',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								width		: 180,
								readOnly	: true,
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
							},{	fieldLabel	: Language.get('','페이지'),
								name		: '',
								xtype		: 'textfield',
								labelWidth	: 70,
								width		: 130,
								readOnly	: true,
								margin		: '0 0 0 5',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','인쇄여부'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 60,
								width		: 180,
								readOnly	: true,
							},{	fieldLabel	: Language.get('','색상'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 70,
								width		: 180,
								margin		: '0 0 0 5',
								readOnly	: true,
							},{	fieldLabel	: Language.get('','색인표여부'),
								xtype		: 'lookupfield'	,
								name		: '',
								lookupValue	: resource.lookup(''),
								labelWidth	: 70,
								width		: 180,
								margin		: '0 0 0 5',
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','견적가'),
								name		: '',
								xtype		: 'numericfield',
								labelWidth	: 60,
								width		: 180,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'user_memo',
								xtype		: 'textarea',
								height		: 85,
								labelWidth	: 60,
								width		: 400,
								readOnly	: true,
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab4 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '후가공'),
				layout		: 'vbox',
				border		: 0,
				height		: 495,
				bodyStyle	: { padding: '10px', margin		: '5 0 0 20' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	xtype		: 'checkbox',
								boxLabel	: '무색코팅',
								width		: 100,
								name		: '',
								checked		: '',
								margin		: '0 0 0 50'
							},{	xtype		: 'checkbox',
								boxLabel	: '광택코팅',
								name		: '',
								checked		: '',
								width		: 100,
								margin		: '0 0 0 5'
							},{	xtype		: 'checkbox',
								boxLabel	: '엠보싱',
								name		: '',
								checked		: '',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '무광',
								name		: '',
								checked		: '',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '유광',
								name		: '',
								checked		: '',
								width		: 100,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	xtype		: 'checkbox',
								boxLabel	: '책받침',
								width		: 100,
								name		: '',
								checked		: '',
								margin		: '0 0 0 50'
							},{	xtype		: 'checkbox',
								boxLabel	: '무선제본',
								name		: '',
								checked		: '',
								width		: 100,
								margin		: '0 0 0 5'
							},{	xtype		: 'checkbox',
								boxLabel	: '메탈와이어',
								name		: '',
								checked		: '',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '투명와이어',
								name		: '',
								checked		: '',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '바인더',
								name		: '',
								checked		: '',
								width		: 100,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	xtype		: 'checkbox',
								boxLabel	: '소프트커버무선',
								width		: 100,
								name		: '',
								checked		: '',
								margin		: '0 0 0 50'
							},{	xtype		: 'checkbox',
								boxLabel	: '소프트커버펼침',
								name		: '',
								checked		: '',
								width		: 100,
								margin		: '0 0 0 5'
							},{	xtype		: 'checkbox',
								boxLabel	: '떡제본',
								name		: '',
								checked		: '',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '평철',
								name		: '',
								checked		: '',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '반철',
								name		: '',
								checked		: '',
								width		: 100,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','타공수'),
								name		: '',
								xtype		: 'numericfield',
								readOnly	: true,
								labelWidth	: 45,
								width		: 100,
							},{	fieldLabel	: Language.get('','기타가공비'),
								name		: '',
								xtype		: 'numericfield',
								readOnly	: true,
								labelWidth	: 60,
								width		: 150,
								margin		:'0 0 0 30'
							},{	fieldLabel	: Language.get('','견적가'),
								name		: '',
								xtype		: 'numericfield',
								readOnly	: true,
								labelWidth	: 60,
								width		: 190,
								margin		:'0 0 0 30'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'user_memo',
								xtype		: 'textarea',
								readOnly	: true,
								labelWidth	: 45,
								height		: 85,
								width		: 500,
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab5 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '상담내역'),
				layout		: 'vbox',
				border		: 0,
				height		: 495,
				bodyStyle	: { padding: '10px', margin		: '5 0 0 20' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'user_memo',
								readOnly	: true,
								xtype		: 'textarea',
								labelWidth	: 45,
								height		: 85,
								width		: 400,
							}
						]
					}
				]
			}
		;
		return item;
	},
});