Ext.define('module.mtrl.po.purcordr2.view.PurcOrdrAonePopup', { extend: 'Axt.popup.Search',
	alias		: 'widget.module-purcordr2-aone-popup',

	title		: '품목 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 300,
	height		: 250,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
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
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','계정구분'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'acct_name',
							pair		: 'acct_bacd',
							clearable	: false ,
							width		: 200,
							labelWidth	: 80,
							margin		: '0 0 5 -20',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
//								params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102' , hqof_idcd	: _global.hqof_idcd , base_code2 : '발주'},
								params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							}
						},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','품목분류'),
							xtype		: 'popupfield',
							editable	: false,
							enableKeyEvents : true,
							name		: 'clss_desc',
							pair		: 'lcls_idcd',
							width		: 300,
							labelWidth	: 80,
							margin		: '0 0 5 -20',
							fieldCls	: 'requiredindex',
							clearable	: true,
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-item-clss-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=item_name]').setValue(records[0].get('mcls_name'));
									me.down('[name=item_spec]').setValue(records[0].get('clss_name'));
									me.down('[name=item_code_prefix]').setValue(records[0].get('lcls_code')+records[0].get('mcls_code'));
									nameField.setValue(records[0].get('clss_desc'));
								},
							},
							listeners	: {
								change : function(self, value, value2){
									var panel = this.up('form'),
										item_code = panel.down('[name=item_code]').getValue(),
										item_code_prefix = panel.down('[name=item_code_prefix]').getValue(),
										item_code_subfix = '',
										item_name = ''
									;

									if(value == ''){
										var panel = this.up('form');
										panel.down('[name=item_name]').setValue(null);
										panel.down('[name=item_spec]').setValue(null);
										panel.down('[name=clss_desc]').setValue(null);
										panel.down('[name=item_code_prefix]').setValue(null);
										panel.down('[name=item_code_subfix]').setValue(null);
									}

									if(value != '' && item_code_prefix != '' && item_code == ''){
										Ext.Ajax.request({
											url    : _global.location.href + '/system/custom/aone/item/itemmast/get/maxCodeInfo.do',
											params : {
												token : _global.token_id,
												param : JSON.stringify({
													item_code : item_code_prefix
												})
											},
											method : 'POST',
											success:function(response, records){
												var result = Ext.decode(response.responseText);
												if (result.success) {
													item_code_subfix = panel.down('[name=item_code_subfix]').setValue(result.records.seqn);
													panel.down('[name=item_code]').setValue(item_code_prefix+result.records.seqn);
												}
											},
											failure:function(result, request){
											}
										});
									}
								}
							},
						},{	name : 'item_code', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_code', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_code', xtype : 'textfield' , hidden : true
						},
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	name : 'item_idcd', xtype : 'textfield' , hidden : true,
						},{	fieldLabel	: Language.get('','품목코드'),
							xtype		: 'textfield',
							name		: 'item_code_prefix',
							width		: 150,
							margin		: '1 0 5 -10',
							readOnly	: true,
						},{	xtype		: 'textfield',
							name		: 'item_code_subfix',
							width		: 70,
							margin		: '1 0 5 5',
							readOnly	: true
						},{	xtype		: 'lookupfield',
							name		: 'line_stat',
							width		: 60,
							editable	: false,
							margin		: '1 0 5 5',
							value		: '0' ,
							lookupValue	: resource.lookup('line_stat')
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','품명')	,
							xtype		: 'textfield',
							name		: 'item_name',
							width		: 280,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','규격')	,
							xtype		: 'textfield',
							name		: 'item_spec',
							itemId		: 'item_spec',
							width		: 280,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('unit_idcd','단위'),
							xtype		: 'popupfield',
							width		: 200,
							labelWidth	: 80,
							margin		: '0 0 5 -20',
							editable	: true,
							enableKeyEvents : true,
							name		: 'unit_name',
							pair		: 'unit_idcd',
							clearable	: true ,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-unit-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('unit_name'));
									pairField.setValue(records[0].get('unit_idcd'));
								}
							}
						},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
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
		;

		var a = values.item_code;
		var b = values.item_name;
		var item_idcd = '';


		if (values.clss_desc == null || values.clss_desc == '') {
			Ext.Msg.alert("알림", "품목분류를 선택해주세요.");
			return;
		}
		if (values.item_spec == null || values.item_spec == '') {
			Ext.Msg.alert("알림", "품명을 입력하세요.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/mtrl/po/purcordr2/get/itemcode.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					item_code	: values.item_code,
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
					if(result.records[0].count > 0){
						resource.showError( '이미 등록된 품목코드입니다. 품목코드를 다시입력해주세요.'  );
						return;
					}
				}
				Ext.Ajax.request({
					url		: _global. location.http () + '/listener/seq/maxid.do',
					method		: "POST",
					params	: {
						token : _global. token_id ,
						param : JSON. stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'item_mast'
						})
					},
					async	: false,
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						item_idcd = result.records[0].seq;
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
					}
				});
				Ext.Ajax.request({
					url		: _global.location.http() + '/mtrl/po/purcordr2/set/item.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							item_idcd		: item_idcd,
							item_code		: values.item_code,
							item_name		: values.item_name,
							item_spec		: values.item_spec,
							acct_bacd		: values.acct_bacd,
							unit_idcd		: values.unit_idcd,
							stor_id			: _global.stor_id,
							table_nm		: "item_mast",
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
							me.setResponse( {success : true ,  values : values, item_idcd : item_idcd });
							me.close;
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});