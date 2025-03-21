Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2InvoicePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-invoice-popup',

	title		: 'Invoice 입력',
	closable	: true,
	autoShow	: true,
	width		: 840 ,
	height		: 285,
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
						{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , handler : me.finishAction , cls: 'button-style' },
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
			itemId	: 'invc_pop',
			margin	: '15 7 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: 'Invoice No',
							name		: 'invc_numb',
							xtype		: 'textfield',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 210,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							value		: me.params.data.invc_numb
						},{	xtype		: 'lookupfield',
							name		: 'line_stat',
							width		: 55,
							editable	: false,
							margin		: '1 0 0 5',
							lookupValue	: resource.lookup('line_stat'),
						},{ fieldLabel	: '개설일자',
							xtype		: 'datefield',
							name		: 'invc_date',
							value		: new Date(),
							width		: 170,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: me.params.data.invc_date
						},{	fieldLabel	: '개설은행',
							name		: 'bank_name',
							xtype		: 'textfield',
							margin		: '0 0 0 10',
							width		: 250,
							value		: me.params.data.bank_name
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '사업장' ),
							name		: 'bzpl_name',
							pair		: 'bzpl_idcd',
							xtype		: 'popupfield',
							width		: 270,
							value		: me.params.data.bzpl_name,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							popup		: {
								widget	: 'lookup-bzpl-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
								}
							}
						},{	name : 'bzpl_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id,value : me.params.data.bzpl_idcd,
						},{	fieldLabel	: Language.get('incm_dvcd','수입구분'),
							xtype		: 'lookupfield',
							name		: 'incm_dvcd',
							readOnly	: true,
							fieldCls	: 'readonlyfield',

							width		: 170,
							lookupValue	: resource.lookup('incm_dvcd'),
							value		: me.params.data.incm_dvcd,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: 'Supplier',
							name		: 'buyr_name',
							xtype		: 'textfield',
							width		: 270,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: 'Forwarder',
							name		: 'mdtn_prsn',
							xtype		: 'textfield',
							width		: 170,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							width		: 170,
							margin		: '0 0 0 10',
							value		: me.params.data.drtr_name,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id, value : me.params.data.drtr_idcd,
						},{	fieldLabel	: Language.get('','Ship Via'),
							xtype		: 'lookupfield',
							name		: 'ship_viaa_dvcd',
							width		: 170,
							lookupValue	: resource.lookup('ship_viaa_dvcd'),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','단가조건'),
							xtype		: 'lookupfield',
							name		: 'pric_cond_dvcd',
							width		: 190,
							value		: me.params.data.pric_cond_dvcd,
							lookupValue	: resource.lookup(''),
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('','결제시기'),
							xtype		: 'lookupfield',
							name		: 'stot_time_dvcd',
							width		: 170,
							margin		: '0 0 0 80',
							value		: me.params.data.stot_time_dvcd,
							lookupValue	: resource.lookup('stot_time_dvcd'),
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('','결제기한'),
							xtype		: 'textfield',
							name		: 'stot_ddln',
							width		: 170,
							margin		: '0 0 0 10',
							value		: me.params.data.stot_ddln,
							readOnly	: true,
							fieldCls	: 'readonlyfield',

						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '화폐단위' ),
							name		: 'mney_unit',
							xtype		: 'lookupfield',
							width		: 190,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							lookupValue	: resource.lookup('crny_dvcd'),
							value		: me.params.data.mney_unit,

						},{	name : 'user_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
						},{	fieldLabel	: '적용환율',
							name		: 'exrt',
							xtype		: 'numericfield',
							margin		: '0 0 0 80',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							width		: 170,
							value		: me.params.data.exrt,

						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','외환금액'),
							xtype		: 'numericfield',
							name		: 'exch_amnt',
							width		: 190,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.params.data.exch_amnt,

						},{	fieldLabel	: Language.get('','원화금액'),
							xtype		: 'numericfield',
							name		: 'krwn_amnt',
							margin		: '0 0 0 80',
							width		: 170,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.params.data.krwn_amnt,

						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: 'Remarks',
							name		: 'user_memo',
							xtype		: 'textfield',
							width		: 790,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.params.data.user_memo,
						},{	xtype : 'numericfield', name : 'qntt',hidden: true, value : me.params.data.qntt
						},{	xtype : 'numericfield', name : 'exch_pric',hidden: true, value : me.params.data.exch_pric
						},{	xtype : 'numericfield', name : 'krwn_pric',hidden: true, value : me.params.data.krwn_pric
						},{	xtype : 'textfield'   , name : 'orig_invc_numb',hidden: true, value : me.params.data.ordr_numb
						},{	xtype : 'numericfield', name : 'orig_amnd_degr',hidden: true, value : me.params.data.orig_amnd_degr
						},{	xtype : 'numericfield', name : 'orig_seqn',hidden: true, value : me.params.data.line_seqn
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

	finishAction: function(a,b,c){
		var me = this,
			baseform= me.up('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-ordermast2-lister-master')[0]
		;
		if(values.invc_numb==''||values.invc_numb==null){
			Ext.Msg.alert("알림","수주번호를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/sjflv/mtrl/imp/ordermast2/set/invoicePopup.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify(values)
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					master.getStore().reload();
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						baseform.ownerCt.close()
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
				}
			});
		}
	}
});
