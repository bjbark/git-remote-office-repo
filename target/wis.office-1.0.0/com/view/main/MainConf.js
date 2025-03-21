/**
 * 초기설정 (로그인화면 MainPswd.js view에서 띄운다.)
 */
Ext.define('com.view.main.MainConf', {
	extend: 'Ext.window.Window',
	alias: 'widget.popup-main-conf',

	closable  : true,
	modal     : true,
	width     : 300,
	height    : 170,
	autoShow  : true,
	resizable : false,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
		me.dockedItems = [ me.createToolbar() ];
		me.callParent(arguments);

		// 인증 되어있는경우 로컬스토리지의 값을 읽어서 form에 set함
		var licenses = localStorage.getItem('licenses');
		if(licenses) {
			var identify = Encrypts.decode(licenses);
			me.down('[name=mainConf]').getForm().setValues(Ext.decode( identify ));
		}
	},

	createForm : function () {
		var me = this;
		return {
			xtype:'form',
			name : 'mainConf',
			layout:{  type:'vbox'  },
			width:'100%',
			bodyPadding: 10,
			items:[
				{	xtype		: 'textfield',
					width		: '100%',
					fieldLabel	: '사업장ID',
					name		: 'stor_id',
					allowBlank	: false,
					value		: '',
				},{	xtype		: 'textfield',
					width		: '100%',
					fieldLabel	: '설치코드',
					name		: 'setup_id',
					allowBlank	: false,
					value		:'',
				},{	xtype       : 'textfield',
					width       : '100%',
					fieldLabel  : '설치암호',
					name        : 'setup_pw',
					allowBlank  : false,
					inputType   : 'password',
					value       : '',
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
						{	xtype	:'button', text:'인증',
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

	saveValidationCheck : function (mainForm) {
		var me = this;
		var values = mainForm.getValues();
		if(Ext.isEmpty(values.stor_id)){
			Ext.Msg.alert(Const.NOTICE , '사업장ID를 입력하여 주시기 바랍니다.');
			return;
		}
		if(Ext.isEmpty(values.setup_id)){
			Ext.Msg.alert(Const.NOTICE , '설치코드를 입력하여 주시기 바랍니다.');
			return;
		}
		if(Ext.isEmpty(values.setup_pw)){
			Ext.Msg.alert(Const.NOTICE , '설치암호를 입력하여 주시기 바랍니다.');
			return;
		}

		return true;
	},

	saveAction : function () {
		var me = this;
		var mainConf = me.down('[name=mainConf]');

		if( ! me.saveValidationCheck(mainConf) ) {
			return false;
		}

		Ext.MessageBox.show({
			title: '잠시만 기다려 주십시오.',
			width: 300,
			progress: true,
			closable: false,
			wait : true,
			waitConfig  : {
				interval: 500, //bar will move fast!
				duration: 50000,
				increment: 15,
				text: '초기설정 인증중 입니다...',
				scope: me
			 }
		});

		var values = mainConf.getValues();
		var param = {
				mst_itm_id  : _global.solution,
				stor_id : values.stor_id,
				setup_id : values.setup_id,
				setup_pw : values.setup_pw
		};

		// 인증 시작
		Ext.Ajax.request({
			url: _global.api_host_info + '/system/auth/licenses.do' ,
			timeout: 60000,
			params: {
				param : JSON.stringify(param)
			},
			success: function(response, opts){
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(res.success) {
					var license = res.records ;
					localStorage.setItem('licenses', Encrypts.encode(Ext.encode(license)) ); // 로컬스토리지에 저장
					Ext.Msg.alert(Const.NOTICE , '인증이 완료 되었습니다.');
					if (me.popup && Ext.isFunction(me.popup.result)) {
						me.popup.result.call(this, license );
					}
					me.close();
				} else {
					Ext.Msg.alert(Const.NOTICE , '인증이 실패 되었습니다.<br/>['+res.message+']');
				}
			},
			failure : function (response, opts) {
				Ext.MessageBox.hide();
			}

		});
	}
});
