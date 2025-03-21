Ext.define('module.custom.hantop.item.itemcam.view.ItemCamCopyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-hantop-item-copy-popup',

	title		: '자재복사',
	closable	: true,
	autoShow	: true,
	width		: 280 ,
	height		: 140,
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
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '브랜드',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'brnd_name',
									pair		: 'brnd_bacd',
									itemId		: 'brnd_name',
									width		: 250,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp ,prnt_idcd : '4000' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									}
								},{ xtype:'hiddenfield' , name : 'brnd_bacd',itemId : 'brnd_bacd'
								},{ fieldLabel	: '자재명',
									xtype		: 'popupfield', editable : true, enableKeyEvents : true,
									name		: 'item_name',
									width		: 250,
									pair		: 'item_idcd2',
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-hntopitem-popup',
										params : { stor_grp : _global.stor_grp , acct_bacd : '1001',line_stat : '0',},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('item_name'));
											pairField.setValue(records[0].get('item_idcd'));
										}
									}
								},{	name : 'item_idcd2', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: '품목ID',
									name		: 'item_idcd',
									xtype		: 'textfield',
									itemId		: 'item_idcd',
									width		: 250,
									hidden		: true
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
			master	= Ext.ComponentQuery.query('module-itemcam-lister-master')[0],
			master2	= Ext.ComponentQuery.query('module-itemcam-lister-master2')[0],
			master3	= Ext.ComponentQuery.query('module-itemcam-lister-master3')[0],
			master4	= Ext.ComponentQuery.query('module-itemcam-lister-master4')[0],
			master5	= Ext.ComponentQuery.query('module-itemcam-lister-master5')[0],
			master6	= Ext.ComponentQuery.query('module-itemcam-lister-master6')[0],
			master7	= Ext.ComponentQuery.query('module-itemcam-lister-master7')[0],
			master8	= Ext.ComponentQuery.query('module-itemcam-lister-master8')[0],
			master9	= Ext.ComponentQuery.query('module-itemcam-lister-master9')[0]
		;
		if(values.item_idcd==''||values.item_idcd==null){
			Ext.Msg.alert("알림","자재를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/item/itemcam/set/copy.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						brnd_bacd	: values.brnd_bacd,
						item_idcd	: values.item_idcd,
						item_idcd2	: values.item_idcd2,
						stor_id		: _global.stor_id,
					})

				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "복사가 완료 되었습니다.");
					master.getStore().reload();
					master2.getStore().reload();
					master3.getStore().reload();
					master4.getStore().reload();
					master5.getStore().reload();
					master6.getStore().reload();
					master7.getStore().reload();
					master8.getStore().reload();
					master9.getStore().reload();
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
