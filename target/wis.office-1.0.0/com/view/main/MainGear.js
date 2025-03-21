/**
 * 초기설정 (로그인화면 MainPswd.js view에서 띄운다.)
 */
Ext.define('com.view.main.MainGear', {
	extend: 'Ext.window.Window',
	alias: 'widget.popup-main-gear',

	closable  : true,
	modal     : true,
	width     : 300,
	height    : 120,
	autoShow  : true,
	resizable : false,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
		me.dockedItems = [ me.createToolbar() ];
		me.callParent(arguments);
	},

	createForm : function () {
		var me = this;
		return {
			xtype:'form',
			name : 'mainGear',
			layout:{  type:'vbox'  },
			width:'100%',
			bodyPadding: 10,
			items:[
				{	xtype		: 'textfield',
					width		: '100%',
					fieldLabel	: '사업장ID',
					name		: 'stor_id',
					allowBlank	: false,
					value		: Ext.util.Cookies.get('stor_id')?Axt.Encrypts.decode(Ext.util.Cookies.get('stor_id')).substr(5,Axt.Encrypts.decode(Ext.util.Cookies.get('stor_id')).length):'',
				}
			]
		};
	},

	createToolbar : function () {
		var me = this;
		return {
			xtype	: 'toolbar',
			dock	: 'bottom',
			height	: 40,
			items	: [
				{	xtype		: 'fieldset',
					height		: '100%',
					width		: '100%',
					layout		: {
						type	: 'hbox', align:'top', pack:'center'
					},
					border		: 0,
					defaults	: {
						style	: 'margin:2px;',
						width	: 50,
					},
					items	: [
						{	xtype	:'button', text:'저장',
							handler : me.saveAction, scope:me
						},{	xtype	:'button', text:'닫기',
							handler : function () {
								me.close();
							}
						}
					]
				}
			]
		};
	},
	listeners:{
		render: function(){
			var me = this
			;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	key: 13,
						fn: function(key,e){
							me.saveAction();
						}
					}
				]
			});
		}
	},
	saveValidationCheck : function (mainForm) {
		var me = this;
		var values = mainForm.getValues();
		if(Ext.isEmpty(values.stor_id)){
			Ext.Msg.alert(Const.NOTICE , '사업장ID를 입력하여 주시기 바랍니다.');
			return;
		}
		return true;
	},

	saveAction : function () {
		var me = this;
		var mainGear = me.down('[name=mainGear]');
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 7);

		if( ! me.saveValidationCheck(mainGear) ) {
			return false;
		}

		var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + 7)
		;
		var values = mainGear.getValues();
		var stor_id = 'N1000'+values.stor_id;
		Ext.util.Cookies.set('stor_id', Axt.Encrypts.encode(stor_id), expireDate);
		console.log(Ext.util.Cookies.get('stor_id')?Axt.Encrypts.decode(Ext.util.Cookies.get('stor_id')).substr(5,Axt.Encrypts.decode(Ext.util.Cookies.get('stor_id')).length):'');
		me.popup.result.call(this, values );

		me.close();

	}
});
