Ext.define('module.mtrl.po.purcordr2.view.PurcOrdr2Popup', { extend: 'Axt.popup.Search',
	alias		: 'widget.module-purcordr2-popup',

	title		: '품목 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 230 ,
	height		: 230,
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
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_code','품목코드')	,
							xtype		: 'textfield',
							name		: 'item_code',
							width		: 200,
							labelWidth	: 60,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '0 0 5 0'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_name','품명')	,
							xtype		: 'textfield',
							name		: 'item_name',
							width		: 200,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_spec','규격')	,
							xtype		: 'textfield',
							name		: 'item_spec',
							itemId		: 'item_spec',
							width		: 200,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','계정구분'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'acct_name',
							pair		: 'acct_bacd',
							clearable	: false ,
							width		: 170,
							labelWidth	: 80,
							margin		: '0 0 5 -20',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102' , hqof_idcd	: _global.hqof_idcd , base_code2 : '발주'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							}
						},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
						}
					]
				},
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('unit_idcd','단위'),
							xtype		: 'popupfield',
							width		: 170,
							labelWidth	: 80,
							margin		: '0 0 5 -20',
							editable	: true,
							enableKeyEvents : true,
							name		: 'unit_name',
							pair		: 'unit_idcd',
							clearable	: true ,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-unit-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('unit_name'));
									pairField.setValue(records[0].get('unit_idcd'));
								}
							}
						},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
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
			values	= baseform.getValues()
		;

		var a = values.item_code;
		var b = values.item_name;
		var item_idcd = '';


		if (values.item_code == null || values.item_code == '') {
			Ext.Msg.alert("알림", "품목코드를 입력하세요.");
			return;
		}
		if (values.item_name == null || values.item_name == '') {
			Ext.Msg.alert("알림", "품명을 입력하세요.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/mtrl/po/purcordr2/get/itemcode.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					item_code	: values.item_code,
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
					if(result.records[0].count > 0){
						resource.showError( '이미 등록된 품목코드입니다. 품목코드를 다시입력해주세요.'  );
						return;
					}
				}
				Ext.Ajax.request({
					url		: _global. location.http () + '/listener/seq/maxid.do',
					method		: "POST",
					params	: {
						token : _global. token_id ,
						param : JSON. stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'item_mast'
						})
					},
					async	: false,
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						item_idcd = result.records[0].seq;
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
					}
				});
				Ext.Ajax.request({
					url		: _global.location.http() + '/mtrl/po/purcordr2/set/item.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							item_idcd		: item_idcd,
							item_code		: values.item_code,
							item_name		: values.item_name,
							item_spec		: values.item_spec,
							acct_bacd		: values.acct_bacd,
							unit_idcd		: values.unit_idcd,
							stor_id			: _global.stor_id,
							table_nm		: "item_mast",
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
							me.setResponse( {success : true ,  values : values, item_idcd : item_idcd });
							me.close;
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});