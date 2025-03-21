Ext.define('module.custom.iypkg.eis.cvicmonitring.CvicMonitring', { extend:'Axt.app.Controller',

	requires : [

	],
	models:[
		'module.custom.iypkg.eis.cvicmonitring.model.CvicMonitringMaster'
	],
	stores:[
		'module.custom.iypkg.eis.cvicmonitring.store.CvicMonitringMaster'
	],
	views: [
		'module.custom.iypkg.eis.cvicmonitring.view.CvicMonitringLayout',
		'module.custom.iypkg.eis.cvicmonitring.view.CvicMonitringSearch',
		'module.custom.iypkg.eis.cvicmonitring.view.CvicMonitringMaster'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cvicmonitring-layout button[action=selectAction]' : { click : me.selectAction },	// 조회

		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout 		 : function () { return Ext.ComponentQuery.query('module-cvicmonitring-layout')[0] },
		search 		 : function () { return Ext.ComponentQuery.query('module-cvicmonitring-search')[0] },
		listermaster : function () { return Ext.ComponentQuery.query('module-cvicmonitring-lister-master')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
					console.log(listermaster.getSelectionModel().getSelection());
				}
				else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( {stor_id : _global.stor_id}) );
	},
});
