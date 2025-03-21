Ext.define('module.custom.hantop.prod.labelprint1.labelPrint1', { extend : 'Axt.app.Controller',
	requires: [
	],
	models:[
	],
	stores:
	[

	],
	views:[
		'module.custom.hantop.prod.labelprint1.view.labelPrint1Search',
		'module.custom.hantop.prod.labelprint1.view.labelPrint1Layout',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
//		this.selectAction();
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-labelprint1-layout button[action=selectAction]' : { click : me.selectAction } ,
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-labelprint1-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-labelprint1-layout')[0] },
	},

	/**
	 * 메뉴조회
	 */
	selectAction:function(){
		var me = this,
		search  = me.pocket.search(),
		param   = search.getValues(),
		jrf = 'Csc_Label.jrf',
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";


		if(param.brcd == '' || param.brcd ==null){

			return;
		}else{
			var brcd =  search.down('[name=brcd]').getValue();
			var arg =	'brcd~'+brcd+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
			mask.hide();
		}

	},
});

