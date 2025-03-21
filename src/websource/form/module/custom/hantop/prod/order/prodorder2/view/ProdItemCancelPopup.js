Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdItemCancelPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodorder2-cancel-popup',

	title		: '품목지시 취소',
	closable	: true,
	autoShow	: true,
	width		: 350 ,
	height		: 265,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

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
						{	text : '<span class="write-button">확인</span>', scope: me, handler: me.callAction, cls: 'button-style'} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style'} ,
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
			margin	: '15 7 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 400,
							fieldDefaults: { width : 400, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 4 0',
									items	: [
										{	fieldLabel	: Language.get('rcpt_date','변경일시'),
											xtype		: 'datefield',
											name		: 'rcpt_date',
											labelWidth	: 80,
											width		: 200,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											value		: new Date()
										},{	xtype		: 'timefield',
											name		: 'rcpt_date2',
											margin		: '0 0 0 10',
											width		: 90,
											value		: new Date(),
										}
									]
								},{	fieldLabel	: Language.get('drtr_name','담당자'),
									xtype		: 'popupfield',
									name		: 'drtr_name',
									pair		: 'drtr_idcd',
									editable	: false,
									clearable	: true,
									labelWidth	: 80,
									width		: 300,
									enableKeyEvents : true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('chge_resn_dvcd','변경사유구분'),
									xtype		: 'lookupfield',
									name		: 'chge_resn_dvcd',
									editable	: false,
									labelWidth	: 80,
									width		: 300,
									lookupValue	: resource.lookup('chge_resn_dvcd')
								},{	fieldLabel	: Language.get('drtr_name','고객 담당자'),
									xtype		: 'popupfield',
									name		: 'cstm_drtr_name',
									pair		: 'cstm_drtr_idcd',
									editable	: false,
									clearable	: true,
									labelWidth	: 80,
									width		: 300,
									enableKeyEvents : true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name : 'cstm_drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('chge_resn','변경사유'),
									xtype		: 'textarea',
									name		: 'chge_resn',
									editable	: false,
									labelWidth	: 80,
									width		: 300,
								}
							]
						}
					]
				}
			]
		};
		return form;
	},


	callAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-prodorder2-lister-master')[0],
			detail	= Ext.ComponentQuery.query('module-prodorder2-lister-detail')[0],
			select	= detail.getSelectionModel().getSelection()[0],
			records	= undefined,
			store	= detail.getStore()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask});
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/prod/order/prodorder2/set/cancel.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					records	:[{
						invc_numb	: select.data.invc_numb,
						amnd_degr	: '1',
						line_seqn	: select.data.line_seqn,
						ispl_name	: values.ispl_name,
						chge_resn	: values.chge_resn,
						drtr_idcd	: values.drtr_idcd,
						rcpt_date	: values.rcpt_date,
						chge_resn_dvcd	: values.chge_resn_dvcd,
						cstm_drtr_name	: values.cstm_drtr_name
					}]
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
					Ext.Msg.alert('알림','품목지시 취소가 완료되었습니다.');
					detail.getStore().reload();
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
