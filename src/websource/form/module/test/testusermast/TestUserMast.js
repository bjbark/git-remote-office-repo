Ext.define('module.test.testusermast.TestUserMast', { extend : 'Axt.app.Controller',
	requires: [
		 'module.common.view.SearchBar'
		,'module.common.view.SearchRowStatus'
		,'Axt.popup.view.ZipcodeSearch'
		,'Axt.popup.view.FileUpload',
	],
	models:[
		'module.test.testusermast.model.TestUserMast'
	],
	stores:
	[
	 	'module.test.testusermast.store.TestUserMast'
	],
	views:[
		'module.test.testusermast.view.TestUserMastSearch',
		'module.test.testusermast.view.TestUserMastLayout',
		'module.test.testusermast.view.TestUserMastLister',
		'module.test.testusermast.view.TestUserMastLister2',
		'module.test.testusermast.view.TestUserMastLister3',
		'module.test.testusermast.view.TestUserMastLister3_2',
		'module.test.testusermast.view.TestUserMastLister4',
		'module.test.testusermast.view.TestUserMastLister5',
		'module.test.testusermast.view.TestUserMastLister6',
		'module.test.testusermast.view.TestUserMastLister6_2',
		'module.test.testusermast.view.TestUserMastLister7',
		'module.test.testusermast.view.TestUserMastLister8',
		'module.test.testusermast.view.TestUserMastLister9',
		'module.test.testusermast.view.TestUserMastLister10',
		'module.test.testusermast.view.TestUserMastLister11',
		'module.test.testusermast.view.TestUserMastLister12',
		'module.test.testusermast.view.TestUserMastLister13',
		'module.test.testusermast.view.TestUserMastEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-testusermast-layout button[action=selectAction]' : { click : me.selectAction } ,

			'module-testusermast-lister button[action=test1]' : { click : me.test1 },
			'module-testusermast-lister button[action=test2]' : { click : me.test2 },

			'module-testusermast-lister' : { selectionchange: me.attachRecord },
			'module-testusermast-search combobox[name=prnt_idcd]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-testusermast-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-testusermast-layout')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-testusermast-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-testusermast-lister')[0] }
	},
	test2:function(){
		Ext.Ajax.request({
			url		: _global.location.http() + '/test/testusermast/set/test2.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					BAS_DT: '20211222',
					NTC_DIS: 'A',//고시회차 A. 현재(최종), B.최초고시
					NTC_DIS: 'A',//고시회차 A. 현재(최종), B.최초고시
					SELECT_DATE: '2021.12.22',
					SELECT_DATEY: '2021',
					SELECT_DATEM: '12',
					SELECT_DATED: '22'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				console.log(response);
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					console.log(result);
				}
			},
			failure : function(result, request) {
				mask.hide();
				Ext.Msg.error(result.mesage);
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},
	test1:function(){
		console.log('test1');

		Ext.Ajax.request({
			url		: _global.location.http() + '/test/testusermast/set/test1.do',
			params	: {
			token : _global.token_id,
				param : JSON.stringify({
					stor_id	: _global.stor_id,
					key		: '1A32DB52-12B8-462E-9B91-C210036CF6D4',
					num		: '1138137419',
					id		: 'wsinfotech',
					name	: 'jwy',
					from	: '010-7162-0329',
					to		: '010-7162-0329',
					content	: 'abcdefg'
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
					console.log(result);
				}
			},
			failure : function(result, request) {
					mask.hide();
			Ext.Msg.error(result.mesage);
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});


	}
});

