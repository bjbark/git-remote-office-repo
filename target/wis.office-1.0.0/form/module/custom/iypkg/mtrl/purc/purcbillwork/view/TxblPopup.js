Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.TxblPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcbillwork-popup',

	title		: '매입계산서 처리',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 300,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

		me.down('[name=txbl_cstm_idcd]').setValue(me.popup.params.cstm_idcd);
		me.down('[name=txbl_cstm_name]').setValue(me.popup.params.cstm_name);
		me.down('[name=txbl_path_dvcd]').setValue(me.popup.params.txbl_path_dvcd);

		me.down('[name=sum_sply_amnt]').setValue(me.popup.params.sum_sply_amnt);
		me.down('[name=sum_vatx_amnt]').setValue(me.popup.params.sum_vatx_amnt);
		me.down('[name=sum_ttsm_amnt]').setValue(me.popup.params.sum_ttsm_amnt);

		//일련번호(발행번호) 생성
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
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
					if(result.records.length>0){
						var txbl_seqn = result.records[0].txbl_seqn;
						me.down('[name=txbl_seqn]').setValue(txbl_seqn);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

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
						{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me = this,
		item = {
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 400,
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('publ_date','발행일자'),
							xtype		: 'datefield',
							name		: 'publ_date',
							labelWidth	: 70,
							width		: 175,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('txbl_path_dvcd','구분'),
							xtype		: 'lookupfield',
							name		: 'txbl_path_dvcd',
							lookupValue	: [['11','원단매입'],['14','부자재매입'],['12','상품매입']],
							labelWidth	: 45,
							width		: 165,
							editable	: false
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: '매입처코드',
							xtype		: 'popupfield',
							name		: 'txbl_cstm_name',
							pair		: 'txbl_cstm_idcd',
							clearable	: true,
							width		: 340,
							popup		: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype : 'textfield', name : 'txbl_cstm_idcd', hidden : true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('','권/호'),
							xtype		: 'numericfield',
							name		: 'txbl_volm',
							width		: 200,
						},{	xtype		: 'numericfield',
							name		: 'txbl_honm',
							margin		: '0 0 0 5',
							width		: 135,
						}
					]
				},{	fieldLabel	: Language.get('txbl_seqn','일련번호'),
					xtype		: 'textfield',
					name		: 'txbl_seqn',
					width		: 340,
					regex		: /^[0-9]+\.?[0-9]*$/,
					listeners	:{
						blur : function(){
							var val = this.getValue();
							if(isNaN(Number(val))){
								var val2 = val.replace(/[^0-9]/g,'');
								this.setValue(Number(val2));
								return true;
							}
						}
					}
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('stot_dvcd','결제구분'),
							xtype		: 'lookupfield',
							name		: 'stot_dvcd',
							lookupValue	: resource.lookup('stot_dvcd'),
							labelWidth	: 70,
							width		: 175,
							editable	: false,
						},{	fieldLabel	: Language.get('rqod_rcvd_dvcd','청구/영수'),
							xtype		: 'lookupfield',
							name		: 'rqod_rcvd_dvcd',
							lookupValue	: resource.lookup('rqod_rcvd_dvcd'),
							value		: '2',
							labelWidth	: 60,
							width		: 165,
							editable	: false,
							listeners	: {
								change : function(val,val2,val3){
									var popup = Ext.ComponentQuery.query('module-purcbillwork-popup')[0],
										dvcd = popup.down('[name=stot_dvcd]')
									;
									if(val2 == '1'){
										dvcd.setReadOnly(true);
										dvcd.reset();
									}else if(val2 == '2'){
										dvcd.setReadOnly(false);
									}
								}
							}
						}
					]
				},{	fieldLabel	: Language.get('remk_text','내역'),
					xtype		: 'textfield',
					name		: 'remk_text',
					labelWidth	: 70,
					width		: 340,
				},{	xtype : 'textfield',	name : 'modify'		, hidden : true,
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sply_amnt','공급가액'),
							xtype		: 'numericfield',
							name		: 'sum_sply_amnt',
							labelWidth	: 70,
							width		: 175,
						},{	fieldLabel	: Language.get('vatx_amnt','부가세액'),
							xtype		: 'numericfield',
							name		: 'sum_vatx_amnt',
							labelWidth	: 45,
							width		: 165,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('ttsm_amnt','합계금액'),
							xtype		: 'numericfield',
							name		: 'sum_ttsm_amnt',
							labelWidth	: 70,
							width		: 175,
						}
					]
				}
			]
		}
	;
	return item;
	},

});
