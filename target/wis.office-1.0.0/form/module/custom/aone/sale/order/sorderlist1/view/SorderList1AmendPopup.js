Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1AmendPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sorderlist1-amend-popup',

	title		: '재수리 등록',
	closable	: true,
	autoShow	: true,
	width		: 350 ,
	height		: 240,
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
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: 'AoneCode',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							value		: me.popup.param.invc_numb,
							width		: 170,
							readOnly	: true
						},{	fieldLabel	: '변경차수',
							name		: 'new_amnd_degr',
							itemId		: 'new_amnd_degr',
							value		: (Number(me.popup.param.amnd_degr)+1),
							xtype		: 'numericfield',
							width		: 165,
							readOnly	: true,
							fieldCls	: 'requiredindex'
						},{ xtype		: 'numericfield',
							name		: 'amnd_degr',
							itemId		: 'amnd_degr',
							value		: me.popup.param.amnd_degr,
							hidden		: true,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{ fieldLabel	: '입고일자',
							xtype		: 'datefield',
							name		: 'amnd_date',
							value		: new Date(),
							width		: 170,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							listeners	: {
								change : function(self, value){
									var panel	  = this.up('form');

									if(value != ''){
										var deli_date = Ext.Date.add(new Date(value), Ext.Date.DAY, +7);
										panel.down('[name=deli_date]').setValue(deli_date);
									}
								}
							}
						},{ fieldLabel	: '출고예정일',
							xtype		: 'datefield',
							name		: 'deli_date',
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +7),
							width		: 165,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'user_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							value		: _global.login_nm,
							width		: 170,
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
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	:  Language.get( '' , '고장증상'),
							name		: 'amnd_resn',
							xtype		: 'textarea',
							width		: 335,
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
			master	= Ext.ComponentQuery.query('module-sorderlist1-lister-master1')[0],
			params	= me.param
		;
		if(values.amnd_resn==''||values.amnd_resn==null){
			Ext.Msg.alert("알림","고장증상을 반드시 입력해주십시오.");
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sorderlist1/set/amend.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: values.invc_numb,
						amnd_degr		: values.amnd_degr,
						new_amnd_degr	: values.new_amnd_degr,
						amnd_date		: values.amnd_date,
						deli_date		: values.deli_date,
						drtr_idcd		: values.drtr_idcd,
						amnd_resn		: values.amnd_resn,
						logn_id			: _global.login_id,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
						Ext.ComponentQuery.query('module-sorderlist1-lister-master1')[0].getStore().reload();
						Ext.Msg.alert("알림", "재수리 등록이  완료 되었습니다.");
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
					me.close();
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	}
});
