Ext.define('module.workshop.sale.order.ordermanage.view.ReleasePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermanage-release-popup',

	title		: '출고등록',
	closable	: true,
	autoShow	: true,
	width		: 280 ,
	height		: 180,
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
			margin	: '15 7 0 5',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '견적번호',
									xtype		: 'textfield',
									name		: 'invc_numb',
									itemId		: 'invc_numb',
									width		: 150,
									fieldCls	: 'readonlyfield',
									readOnly	: true
								},{	 fieldLabel	: '택배사명',
									name		: 'hdco_name',
									pair		: 'hdco_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true ,
									width		: 150,
									popup		: {
										widget	: 'lookup-hdco-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('hdco_name'));
											pairField.setValue(records[0].get('hdco_idcd'));
										}
									}
								},{	name : 'hdco_idcd', xtype	: 'textfield', hidden : true
								},{ fieldLabel	: '송장번호',
									xtype		: 'textfield',
									name		: 'dinv_numb',
									width		: 230,
								}
							]
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
			master	= Ext.ComponentQuery.query('module-ordermanage-lister')[0]
		;

		if(values.hdco_idcd==''||values.hdco_idcd==null){
			Ext.Msg.alert("알림","택배사를 입력해주십시오.");
		}

		if(values.dinv_numb==''||values.dinv_numb==null){
			Ext.Msg.alert("알림","송장번호를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/workshop/sale/order/ordermanage/set/release.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: values.invc_numb,
						hdco_idcd	: values.hdco_idcd,
						dinv_numb	: values.dinv_numb,
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd
					})

				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "출고등록이 완료 되었습니다.");
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
