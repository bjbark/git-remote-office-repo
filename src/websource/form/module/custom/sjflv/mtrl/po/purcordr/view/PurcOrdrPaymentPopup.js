Ext.define('module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrPaymentPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcordr-payment-popup',

	title		: '수입 대금 등록',
	closable	: true,
	autoShow	: true,
	width		: 370 ,
	height		: 150,
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
						{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , handler : me.finishAction, cls: 'button-style' },
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
			text = "Bank name : \nBank address\n: \nSwift code : \nBranch code : \nCompany name : \nAccount number : \n ";
		var form = {
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
						{	fieldLabel	: '지급여부',
							name		: 'paym_yorn',
							xtype		: 'checkbox',
							checked		: false,
							hidden		: true,
							value		: me.params.paym_yorn
						},{ fieldLabel	: '지급일자',
							xtype		: 'datefield',
							name		: 'paym_date',
							value		: new Date(),
							margin		:'0 0 0 30',
							width		: 170,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: me.params.paym_date
						},{ fieldLabel	: '송금기한',
							xtype		: 'datefield',
							name		: 'paym_send_ddln',
							value		: new Date(),
							margin		:'0 0 0 30',
							hidden		: true,
							width		: 170,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: me.params.paym_date
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '지급번호',
							name		: 'paym_numb',
							xtype		: 'textfield',
							width		: 290,
							margin		:'0 0 0 30',
							value		: me.params.paym_numb
						}
					]
				},{	xtype:'textfield', name : 'invc_numb',value : me.params.ordr_numb,hidden:true
				},{	xtype:'numericfield', name : 'amnd_degr',value : me.params.amnd_degr,hidden:true
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
			baseform= me.up('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-purcordr-lister-master')[0]
		;
		if(values.invc_numb==''||values.invc_numb==null){
			Ext.Msg.alert("알림","수주번호를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/sjflv/mtrl/po/purcordr/set/payment.do',
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
						baseform.ownerCt.close();
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
