Ext.define('module.custom.sjflv.sale.export.ordermast.view.OrderMastCostPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast-cost-popup',

	title		: '부대비용 등록',
	closable	: true,
	autoShow	: true,
	width		: 430 ,
	height		: 360,
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
						{	text : '<span class="write-button">저장후 추가</span>', action : 'insertAction', cls: 'button-style', width: 80	} ,'-',
						{	text : '<span class="write-button">저장후 종료</span>', action : 'endAction', cls: 'button-style', width: 80	} ,'-',
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
						{	fieldLabel	: '전표번호',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 190,
						},{ fieldLabel	: '발생일자',
							xtype		: 'datefield',
							name		: 'amnd_date',
							margin		: '0 0 0 25',
							value		: new Date(),
							width		: 190,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','비용단계'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
							value		: 'Order',
							lookupValue	: resource.lookup(''),
						},{	fieldLabel	: '근거번호',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							margin		: '0 0 0 25',
							width		: 190,
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
							width		: 190,
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
						},{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							margin		: '0 0 0 25',
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
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '지급처',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 405,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '비용구분' ),
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
						},{	fieldLabel	: Language.get('','지급방법'),
							xtype		: 'lookupfield',
							name		: '',
							width		: 190,
							margin		: '0 0 0 25',
							lookupValue	: resource.lookup(''),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','지급액'),
							xtype		: 'numericfield',
							name		: '',
							width		: 190,
						},{	fieldLabel	: Language.get('','세액'),
							xtype		: 'numericfield',
							name		: '',
							margin		: '0 0 0 25',
							width		: 190,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '계좌번호 등',
							name		: '',
							xtype		: 'textfield',
							itemId		: '',
							width		: 405,
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
							width		: 405,
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
