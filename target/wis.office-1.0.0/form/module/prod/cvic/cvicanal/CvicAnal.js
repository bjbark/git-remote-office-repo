Ext.define('module.prod.cvic.cvicanal.CvicAnal', { extend:'Axt.app.Controller',

	models	: [
		'module.prod.cvic.cvicanal.model.CvicAnal',
		'module.prod.cvic.cvicanal.model.CvicAnal2',
		'module.prod.cvic.cvicanal.model.CvicAnal3'
	],
	stores	: [
		'module.prod.cvic.cvicanal.store.CvicChart1',
		'module.prod.cvic.cvicanal.store.CvicChart2',
		'module.prod.cvic.cvicanal.store.CvicChart3',
		'module.prod.cvic.cvicanal.store.CvicChart4',
		'module.prod.cvic.cvicanal.store.CvicChart5',
		'module.prod.cvic.cvicanal.store.CvicAnal1',
		'module.prod.cvic.cvicanal.store.CvicAnal2'
	],
	views	: [
		'module.prod.cvic.cvicanal.view.CvicAnalLayout',
		'module.prod.cvic.cvicanal.view.CvicAnalLister1',
		'module.prod.cvic.cvicanal.view.CvicAnalLister2',
		'module.prod.cvic.cvicanal.view.CvicAnalSearch',
		'module.prod.cvic.cvicanal.view.CvicAnalChart11',
		'module.prod.cvic.cvicanal.view.CvicAnalChart12',
		'module.prod.cvic.cvicanal.view.CvicAnalChart21',
		'module.prod.cvic.cvicanal.view.CvicAnalChart22',
		'module.prod.cvic.cvicanal.view.CvicAnalChart31',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cvicanal-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			// lister1 event
			'module-cvicanal-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-cvicanal-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
			'module-cvicanal-layout #mainpanel'					  : { tabchange : me.selectAction  }

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-cvicanal-layout')  [0] },
		search	: function () { return Ext.ComponentQuery.query('module-cvicanal-search')  [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-cvicanal-lister1') [0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-cvicanal-lister2') [0] },
		chart11	: function () { return Ext.ComponentQuery.query('module-cvicanal-chart1') [0] },
		chart12	: function () { return Ext.ComponentQuery.query('module-cvicanal-chart2') [0] },
		chart21	: function () { return Ext.ComponentQuery.query('module-cvicanal-chart21') [0] },
		chart22	: function () { return Ext.ComponentQuery.query('module-cvicanal-chart22') [0] },
		chart31	: function () { return Ext.ComponentQuery.query('module-cvicanal-chart31') [0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			chartStore = Ext.getStore('module.prod.cvic.cvicanal.store.CvicChart1'),
			chartStore2 = Ext.getStore('module.prod.cvic.cvicanal.store.CvicChart2'),
			chartStore3 = Ext.getStore('module.prod.cvic.cvicanal.store.CvicChart3'),
			chartStore4 = Ext.getStore('module.prod.cvic.cvicanal.store.CvicChart4'),
			chartStore5 = Ext.getStore('module.prod.cvic.cvicanal.store.CvicChart5'),
			chk = 1,
			store1 = '',
			store2 = '',
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==0){
			chk=1;
			store1 = chartStore;
			store2 = chartStore2;
		}else if(tindex==1){
			chk=2;
			store1 = chartStore3;
			store2 = chartStore4;
		}else if(tindex==2){
			store1 = chartStore5
		}
		if(param.fr_dt==''||param.to_dt=='') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}
		else if(param.fr_dt>param.to_dt) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}
		else{
			if(tindex==2){
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
				store1.load({
					params : {
						param:JSON.stringify({chk : chk,fr_dt : param.fr_dt,to_dt:param.to_dt})
					},
					callback : function(records,operation,success){
					}
				})
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
							lister1.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
				store1.load({
					params : {
						param:JSON.stringify({chk : chk,fr_dt : param.fr_dt,to_dt:param.to_dt})
					},
					callback : function(records,operation,success){
					}
				})
				store2.load({
					params : {
						param:JSON.stringify({chk : chk,fr_dt : param.fr_dt,to_dt:param.to_dt})
					},
					callback : function(records,operation,success){
					}
				})
				mask.hide();
			}
		}
	},
	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});