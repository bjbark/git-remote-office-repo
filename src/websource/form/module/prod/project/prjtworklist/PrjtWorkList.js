Ext.define('module.prod.project.prjtworklist.PrjtWorkList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'module.common.view.project.ProjectPayLister',
		'module.common.view.project.ProjectPaySearch',
		'module.common.view.project.ProjectFinder'
	],

	models	: [
		'module.prod.project.prjtworklist.model.PrjtWorkListDetail1',
		'module.prod.project.prjtworklist.model.PrjtWorkListDetail2'
	],
	stores	: [
		'module.prod.project.prjtworklist.store.PrjtWorkListDetail1',
		'module.prod.project.prjtworklist.store.PrjtWorkListDetail2'
	],
	views	: [
		'module.prod.project.prjtworklist.view.PrjtWorkListLayout',
		'module.prod.project.prjtworklist.view.PrjtWorkListSearch',
		'module.prod.project.prjtworklist.view.PrjtWorkListListerDetail1',
		'module.prod.project.prjtworklist.view.PrjtWorkListListerDetail2',
		'module.prod.project.prjtworklist.view.PrjtWorkListFinder'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtworklist-layout button[action=selectAction]'			: { click : me.selectAction  },	// 조회
			'module-prjtworklist-lister-detail1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			'module-prjtworklist-lister-detail2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-prjtworklist-layout #mainpanel' : {
				tabchange : me.selectAction
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-prjtworklist-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-prjtworklist-search')[0] },
		listerdetail1: function () { return Ext.ComponentQuery.query('module-prjtworklist-lister-detail1')[0] },
		listerdetail2: function () { return Ext.ComponentQuery.query('module-prjtworklist-lister-detail2')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-prjtworklist-finder')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
			lister = undefined,
			pjod_idcd = search.down('[name=pjod_idcd]').getValue()
		;
		if(pjod_idcd==null ||pjod_idcd == ''){
			Ext.Msg.alert("알림",Language.get('acpt_numb', '금형코드'	)+"를 반드시 입력하여주십시오.");
		}else{
			if(tindex==0){
				lister = listerdetail1;
			}else if(tindex == 1){
				lister = listerdetail2;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	}
});