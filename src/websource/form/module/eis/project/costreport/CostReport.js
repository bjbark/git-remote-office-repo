Ext.define('module.eis.project.costreport.CostReport', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.UserPopup'
	],

	models	: [
		'module.eis.project.costreport.model.CostReportMaster1',
		'module.eis.project.costreport.model.CostReportMaster2',
		'module.eis.project.costreport.model.CostReportMaster3'
	],
	stores	: [
		'module.eis.project.costreport.store.CostReportMaster1',
		'module.eis.project.costreport.store.CostReportMaster2',
		'module.eis.project.costreport.store.CostReportMaster3'
	],
	views	: [
		'module.eis.project.costreport.view.CostReportLayout',
		'module.eis.project.costreport.view.CostReportSearch',
		'module.eis.project.costreport.view.CostReportListerMaster1',
		'module.eis.project.costreport.view.CostReportListerMaster2',
		'module.eis.project.costreport.view.CostReportListerMaster3',
		'module.eis.project.costreport.view.CostReportFinder'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-costreport-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-costreport-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister master1 event
			'module-costreport-lister-master1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			// lister master1 event
			'module-costreport-lister-master2 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-costreport-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-costreport-search')[0] },
		listermaster1: function () { return Ext.ComponentQuery.query('module-costreport-lister-master1')[0] },
		listermaster2: function () { return Ext.ComponentQuery.query('module-costreport-lister-master2')[0] },
		listermaster3: function () { return Ext.ComponentQuery.query('module-costreport-lister-master3')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-costreport-finder')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			listermaster2 = me.pocket.listermaster2(),
			listermaster3 = me.pocket.listermaster3(),
			finder = me.pocket.finder(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(finder.getValues().pjod_idcd==''||finder.getValues().pjod_idcd==null){
			Ext.Msg.alert("알림",Language.get('pjod_idcd', '금형번호')+"를 반드시 선택해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			if(tindex == 0){
				lister = listermaster1;
			}else if(tindex == 1){
				lister = listermaster2;
			}else if(tindex == 2){
				lister = listermaster3;
			}
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id,pjod_idcd : finder.getValues().pjod_idcd}) );
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	}
});