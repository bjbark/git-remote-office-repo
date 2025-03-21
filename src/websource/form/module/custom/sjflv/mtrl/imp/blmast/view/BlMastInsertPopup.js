Ext.define('module.custom.sjflv.mtrl.imp.blmast.view.BlMastPayPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-blmast-insert-popup',

	title		: 'B/L 등록',
	closable	: true,
	autoShow	: true,
	width		: 460 ,
	height		: 380,
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
						'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' },
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
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: 'B/L No',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 190,
						},{	xtype		: 'lookupfield',
							name		: 'line_stat',
							width		: 55,
							editable	: false,
							margin		: '1 0 0 5',
							lookupValue	: resource.lookup('line_stat')
						},{ fieldLabel	: 'B/L일자',
							xtype		: 'datefield',
							name		: '',
							value		: new Date(),
							width		: 190,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					margin	: '5 0 0 0',
					border	: 0,
					items	: [
						{	fieldLabel	: 'B/L 차수',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 170,
						},{	xtype		: 'checkbox',
							boxLabel	: Language.get('','최종'),
							name		: '',
							checked		: true,
							style		: { color: 'Blue'},
							margin		: '0 0 0 5'
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
							width		: 250,
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
						},{	fieldLabel	: Language.get('','수입구분'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
							lookupValue	: resource.lookup(''),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: 'Vendor',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 250,
						},{	fieldLabel	: '중개인',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 190,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '담당자' ),
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
						},{	fieldLabel	: Language.get('','Ship Via'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
							margin		: '0 0 0 60',
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
							lookupValue	: resource.lookup(''),
						},{	fieldLabel	: Language.get('','결제시기'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
							margin		: '0 0 0 60',
							lookupValue	: resource.lookup(''),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','결제기한'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
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
							margin		: '0 0 0 60',
							width		: 190,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	:  Language.get( '' , 'Remarks'),
							name		: 'amnd_resn',
							xtype		: 'textarea',
							width		: 440,
							height		: 65,
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
