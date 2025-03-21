Ext.define('module.custom.sjflv.sale.export.ordermast.view.OrderMastInvoicePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast-invoice-popup',

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
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 210,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
						},{	xtype		: 'lookupfield',
							name		: 'line_stat',
							width		: 55,
							editable	: false,
							margin		: '1 0 0 5',
							lookupValue	: resource.lookup('line_stat')
						},{ fieldLabel	: '수취일자',
							xtype		: 'datefield',
							name		: 'amnd_date',
							value		: new Date(),
							width		: 170,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						},{	fieldLabel	: '개설은행',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							margin		: '0 0 0 10',
							width		: 250,
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
							editable	: true,
							enableKeyEvents : true,
							width		: 270,
							clearable	: false ,
							popup		: {
								widget	: 'lookup-bzpl-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
								}
							}
						},{	name : 'bzpl_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
						},{	fieldLabel	: Language.get('','수출구분'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 170,
							lookupValue	: resource.lookup(''),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: 'Buyer',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 270,
						},{	fieldLabel	: '중개인',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 170,
						},{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'bzpl_name',
							pair		: 'bzpl_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 170,
							clearable	: false ,
							margin		: '0 0 0 10',
							popup		: {
								widget	: 'lookup-bzpl-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
								}
							}
						},{	name : 'bzpl_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
						},{	fieldLabel	: Language.get('','Ship Via'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 170,
							lookupValue	: resource.lookup(''),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','단가조건'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
							value		: 'FOB',
							lookupValue	: resource.lookup(''),
						},{	fieldLabel	: Language.get('','결제시기'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 170,
							margin		: '0 0 0 80',
							lookupValue	: resource.lookup(''),
						},{	fieldLabel	: Language.get('','결제기한'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 170,
							margin		: '0 0 0 10',
							lookupValue	: resource.lookup(''),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '화폐단위' ),
							name		: '',
							pair		: '',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 190,
							clearable	: false ,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'user_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
						},{	fieldLabel	: '적용환율',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							margin		: '0 0 0 80',
							width		: 170,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','외환금액'),
							xtype		: 'numericfield',
							name		: '',
							width		: 270,
						},{	fieldLabel	: Language.get('','원화금액'),
							xtype		: 'numericfield',
							name		: '',
							width		: 170,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: 'Remarks',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 790,
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
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0]
		;
		if(values.invc_numb==''||values.invc_numb==null){
			Ext.Msg.alert("알림","수주번호를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/sale/order/saleorder/set/amend.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: values.invc_numb,
						deli_date	: values.deli_date,
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd
					})

				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "Amend 등록이  완료 되었습니다.");
					master.getStore().reload();
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
		}
	}
});
