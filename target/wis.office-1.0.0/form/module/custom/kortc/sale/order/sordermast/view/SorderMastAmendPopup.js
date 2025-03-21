Ext.define('module.custom.kortc.sale.order.sordermast.view.SorderMastAmendPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sordermast-amend-popup',

	title		: 'Amend 등록',
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
						{	fieldLabel	: '주문번호',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 170,
							value		: me.popup.param.invc_numb,
							readOnly	: true
						},{ fieldLabel	: '변경일자',
							xtype		: 'datefield',
							name		: 'amnd_date',
							value		: new Date(),
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
						{	fieldLabel	: '변경차수',
							name		: 'new_amnd_degr',
							itemId		: 'new_amnd_degr',
							value		: me.popup.param.new_amnd_degr,
							xtype		: 'numericfield',
							width		: 170,
							readOnly	: true
						},
						{
							xtype		: 'numericfield',
							name		: 'amnd_degr',
							itemId		: 'amnd_degr',
							value		: me.popup.param.amnd_degr,
							hidden		: true
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
						{	fieldLabel	:  Language.get( '' , '변경사유'),
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
			master	= Ext.ComponentQuery.query('module-sordermast-lister-master')[0],
			detail2	= Ext.ComponentQuery.query('module-sordermast-lister-detail2')[0],
			detail3	= Ext.ComponentQuery.query('module-sordermast-lister-detail3')[0],
			detail4	= Ext.ComponentQuery.query('module-sordermast-lister-detail4')[0],
			params	= me.param
		;

		if(values.amnd_resn==''||values.amnd_resn==null){
			Ext.Msg.alert("알림","변경사유를 반드시 입력해주십시오.");
			return;
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kortc/sale/order/sordermast/set/amend.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: values.invc_numb,
						amnd_degr		: values.amnd_degr,
						new_amnd_degr	: values.new_amnd_degr,
						amnd_date		: values.amnd_date,
						drtr_idcd		: values.drtr_idcd,
						amnd_resn		: values.amnd_resn,
						stor_id			: _global.stor_id,
						login_id		: _global.login_id,
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
					detail.getStore().clearData();
					detail.getStore().loadData([],false);

					detail2.getStore().clearData();
					detail2.getStore().loadData([],false);

//					detail3.getStore().clearData();
//					detail3.getStore().loadData([],false);

					detail4.getStore().clearData();
					detail4.getStore().loadData([],false);
				}
			});
		}
	});
