Ext.define('module.custom.hantop.item.itemcam.ItemCam', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.HntopItemPopup',
		'lookup.popup.view.BasePopup'
	],
	models	: [
		'module.custom.hantop.item.itemcam.model.ItemCamMaster',
	],
	stores	: [
		'module.custom.hantop.item.itemcam.store.ItemCamMaster',
	],
	views	: [
		'module.custom.hantop.item.itemcam.view.ItemCamLayout',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster2',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster3',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster4',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster5',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster6',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster7',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster8',
		'module.custom.hantop.item.itemcam.view.ItemCamListerMaster9',
		'module.custom.hantop.item.itemcam.view.ItemCamSearch',
		'module.custom.hantop.item.itemcam.view.ItemCamPopup',
		'module.custom.hantop.item.itemcam.view.ItemCamCopyPopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-itemcam-layout #mainpanel'									: { tabchange : me.selectAction	},
			'module-itemcam-layout button[action=selectAction]'					: { click : me.selectAction },

			'module-itemcam-lister-master button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master2 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master3 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master4 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master5 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master6 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master7 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master8 button[action=updateAction]'			: { click : me.updateAction },
			'module-itemcam-lister-master9 button[action=updateAction]'			: { click : me.updateAction },

			'module-itemcam-lister-master button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master2 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master3 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master4 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master5 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master6 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master7 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master8 button[action=cancelAction]'			: { click : me.cancelAction },
			'module-itemcam-lister-master9 button[action=cancelAction]'			: { click : me.cancelAction },

			'module-itemcam-lister-master button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master2 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master3 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master4 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master5 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master6 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master7 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master8 button[action=exportAction]'			: { click : me.exportAction },
			'module-itemcam-lister-master9 button[action=exportAction]'			: { click : me.exportAction },


			'module-itemcam-lister-master button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master2 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master3 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master4 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master5 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master6 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master7 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master8 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
			'module-itemcam-lister-master9 button[action=copyAction]'			: { click : me.copyAction   }, /* 자재복사 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-itemcam-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-itemcam-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master')[0]},
		listermaster2	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master2')[0]},
		listermaster3	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master3')[0]},
		listermaster4	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master4')[0]},
		listermaster5	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master5')[0]},
		listermaster6	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master6')[0]},
		listermaster7	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master7')[0]},
		listermaster8	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master8')[0]},
		listermaster9	: function () { return Ext.ComponentQuery.query('module-itemcam-lister-master9')[0]},
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			dvcd, lister
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(tindex == 0){
			lister = me.pocket.listermaster();
			dvcd = 1;
		}else if(tindex == 1){
			lister = me.pocket.listermaster2();
			dvcd = 2;
		}else if(tindex == 2){
			lister = me.pocket.listermaster3();
			dvcd = 3;
		}else if(tindex == 3){
			lister = me.pocket.listermaster4();
			dvcd = 4;
		}else if(tindex == 4){
			lister = me.pocket.listermaster5();
			dvcd = 5;
		}else if(tindex == 5){
			lister = me.pocket.listermaster7();
			dvcd = 7;
		}else if(tindex == 6){
			lister = me.pocket.listermaster8();
			dvcd = 8;
		}else if(tindex == 7){
			lister = me.pocket.listermaster9();
			dvcd = 9;
		}else if(tindex == 8){							//기타
			lister = me.pocket.listermaster6();
			dvcd = 6;
		}

		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				listermaster.getSelectionModel().select(0);
			} else {}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id, dvcd : dvcd}) );
		mask.hide();
	},

	updateAction : function() {
		var	me		= this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			chk		= 0, store
		;
		if(tindex == 0){
			store = me.pocket.listermaster().getStore();
		}else if(tindex == 1){
			store = me.pocket.listermaster2().getStore();
		}else if(tindex == 2){
			store = me.pocket.listermaster3().getStore();
		}else if(tindex == 3){
			store = me.pocket.listermaster4().getStore();
		}else if(tindex == 4){
			store = me.pocket.listermaster5().getStore();
		}else if(tindex == 5){
			store = me.pocket.listermaster7().getStore();
		}else if(tindex == 6){
			store = me.pocket.listermaster8().getStore();
		}else if(tindex == 7){
			store = me.pocket.listermaster9().getStore();
		}else if(tindex == 8){
			store = me.pocket.listermaster6().getStore();
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		store.each(function(record){
			if(record.get('brnd_bacd')=='' || record.get('brnd_bacd') == null){
				Ext.Msg.alert('알림','브랜드가 선택되지 않은 가공정보가 있습니다. 확인해주세요.');
				chk = 1;
				console.log(record.get('brnd_bacd'))
				return;
			}
			if(record.get('item_idcd')=='' || record.get('item_idcd') == null){
				Ext.Msg.alert('알림','자재ID가 선택되지 않은 가공정보가 있습니다. 확인해주세요.');
				chk = 1;
				return;
			}
		});
		if(chk!=1){
			store.sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){}
			}, {synchro : _global.objects.synchro} );
		}
		mask.hide();
	},

	cancelAction : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister
		;
		if(tindex == 0){
			lister = me.pocket.listermaster();
		}else if(tindex == 1){
			lister = me.pocket.listermaster2();
		}else if(tindex == 2){
			lister = me.pocket.listermaster3();
		}else if(tindex == 3){
			lister = me.pocket.listermaster4();
		}else if(tindex == 4){
			lister = me.pocket.listermaster5();
		}else if(tindex == 5){
			lister = me.pocket.listermaster7();
		}else if(tindex == 6){
			lister = me.pocket.listermaster8();
		}else if(tindex == 7){
			lister = me.pocket.listermaster9();
		}else if(tindex == 8){
			lister = me.pocket.listermaster6();
		}
		lister.getStore().reload();
	},

	//엑셀
	exportAction : function(self) {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister
		;
		if(tindex == 0){
			lister = me.pocket.listermaster();
		}else if(tindex == 1){
			lister = me.pocket.listermaster2();
		}else if(tindex == 2){
			lister = me.pocket.listermaster3();
		}else if(tindex == 3){
			lister = me.pocket.listermaster4();
		}else if(tindex == 4){
			lister = me.pocket.listermaster5();
		}else if(tindex == 5){
			lister = me.pocket.listermaster7();
		}else if(tindex == 6){
			lister = me.pocket.listermaster8();
		}else if(tindex == 7){
			lister = me.pocket.listermaster9();
		}else if(tindex == 8){
			lister = me.pocket.listermaster6();
		}
		lister.writer({enableLoadMask:true});
	},

	copyAction:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister
		;
		if(tindex == 0){
			lister = me.pocket.listermaster();
		}else if(tindex == 1){
			lister = me.pocket.listermaster2();
		}else if(tindex == 2){
			lister = me.pocket.listermaster3();
		}else if(tindex == 3){
			lister = me.pocket.listermaster4();
		}else if(tindex == 4){
			lister = me.pocket.listermaster5();
		}else if(tindex == 5){
			lister = me.pocket.listermaster7();
		}else if(tindex == 6){
			lister = me.pocket.listermaster8();
		}else if(tindex == 7){
			lister = me.pocket.listermaster9();
		}else if(tindex == 8){
			lister = me.pocket.listermaster6();
		}
		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 자재 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-hantop-item-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#item_idcd')[0].setValue(records[0].data.item_idcd);
		var numb2 = Ext.ComponentQuery.query('#brnd_name')[0].setValue(records[0].data.brnd_name);
		var numb2 = Ext.ComponentQuery.query('#brnd_bacd')[0].setValue(records[0].data.brnd_bacd);
	},

});
