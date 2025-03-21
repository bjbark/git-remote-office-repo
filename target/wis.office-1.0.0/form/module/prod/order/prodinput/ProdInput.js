Ext.define('module.prod.order.prodinput.ProdInput', { extend:'Axt.app.Controller',

	models:[
		'module.prod.order.prodinput.model.ProdInputDetail',
		'module.prod.order.prodinput.model.ProdInputMaster'
	],
	stores:[

		'module.prod.order.prodinput.store.ProdInputDetail',
		'module.prod.order.prodinput.store.ProdInputDetail1',
		'module.prod.order.prodinput.store.ProdInputDetail2',
		'module.prod.order.prodinput.store.ProdInputMaster',
		'module.prod.order.prodinput.store.ProdInputMaster1',
		'module.prod.order.prodinput.store.ProdInputMaster2'
	],
	views: [
		'module.prod.order.prodinput.view.ProdInputLayout',
		'module.prod.order.prodinput.view.ProdInputSearch',
		'module.prod.order.prodinput.view.ProdInputListerDetail',
		'module.prod.order.prodinput.view.ProdInputListerDetail1',
		'module.prod.order.prodinput.view.ProdInputListerDetail2',
		'module.prod.order.prodinput.view.ProdInputListerMaster',
		'module.prod.order.prodinput.view.ProdInputListerMaster1',
		'module.prod.order.prodinput.view.ProdInputListerMaster2'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodinput-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer master event
			'module-prodinput-lister-master button[action=exportAction]'  : { click : me.exportAction1},// 엑셀
			'module-prodinput-lister-master1 button[action=exportAction]' : { click : me.exportAction2},// 엑셀
			// lister detail event
			'module-prodinput-lister-detail button[action=exportAction]'  : { click : me.exportAction3},// 엑셀
			'module-prodinput-lister-detail1 button[action=exportAction]' : { click : me.exportAction4},// 엑셀
			// lister event
			'module-prodinput-lister-master' : {
				selectionchange: me.selectDetail	// 메뉴 선택시 이벤트
			},
			'module-prodinput-lister-Detail' : {
				itemdblclick : me.selectDetail3 ,
				selectionchange : me.attachRecord
			},
			'module-prodinput-lister-master1' :{
				itemdblclick : me.selectMaster1
			},
			'module-prodinput-lister-detail1' :{
				itemdblclick : me.selectDetail1
			},

			'module-prodinput-layout #mainpanel'	: { tabchange : me.selectAction },
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout			: function () { return Ext.ComponentQuery.query('module-prodinput-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-prodinput-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-prodinput-lister-master')[0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-prodinput-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-prodinput-lister-master2')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-prodinput-lister-detail')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-prodinput-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-prodinput-lister-detail2')[0] }
	},


	//조회
		selectAction:function() {
			var me = this,
				listermaster  = me.pocket.listermaster(),
				listermaster1 = me.pocket.listermaster1(),
				listermaster2 = me.pocket.listermaster2(),
				listerdetail  = me.pocket.listerdetail(),
				listerdetail1 = me.pocket.listerdetail1(),
				listerdetail2 = me.pocket.listerdetail2(),
				search = me.pocket.search(),
				param = search.getValues(),
				tpanel = me.pocket.layout().down('#mainpanel')
			;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
				listermaster = me.pocket.listermaster(),
				listermaster1 = me.pocket.listermaster1(),
				listerdetail1 = me.pocket.listerdetail1(),

				listermaster.select({
					callback:function(records, operation, success) {
						if (success) {
//							listerdetail.getSelectionModel().select(0);
						} else { me.pocket.editor().getForm().reset(true);
					}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );

				listermaster1.select({
					callback:function(records, operation, success) {
						if (success) {
//							listermaster2.getSelectionModel().select(0);
						} else { me.pocket.editor().getForm().reset(true);
					}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );

				listerdetail1.select({
					callback:function(records, operation, success) {
						if (success) {
//							listerdetail2.getSelectionModel().select(0);
						} else { me.pocket.editor().getForm().reset(true);
					}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			},

	//선택
	selectDetail : function(grid, record) {

		var me = this,
			detail	= me.pocket.listerdetail(),
			param	= me.pocket.search().getValues()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, Ext.merge( param, {stor_id : _global.stor_id , cstm_name : record[0].get('cstm_name'), item_name : record[0].get('item_name') , trst_qntt : record[0].get('trst_qntt') , summ_qntt : record[0].get('summ_qntt')}) );
		}
	},
	selectMaster1 : function(grid, record) {

		var me = this,
			listermaster1	= me.pocket.listermaster1(),
			listermaster2	= me.pocket.listermaster2(),
			param	= me.pocket.search().getValues(),
			panel = listermaster2.down('form')
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
				panel.down('[name=cstm_name]').setValue(record.data.cstm_name);
				panel.down('[name=trst_qntt]').setValue(record.data.trst_qntt);
				panel.down('[name=summ_qntt]').setValue(record.data.summ_qntt);
				panel.down('[name=ttsm_amnt]').setValue(record.data.ttsm_amnt);
			mask.hide();
		}
	},
	selectDetail1 : function(grid, record) {

		var me = this,
			listerdetail1	= me.pocket.listerdetail1(),
			listerdetail2	= me.pocket.listerdetail2(),
			param	= me.pocket.search().getValues(),
			panel = listerdetail2.down('form')
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
				panel.down('[name=cstm_name]').setValue(record.data.cstm_name);
				panel.down('[name=trst_qntt]').setValue(record.data.trst_qntt);
				panel.down('[name=summ_qntt]').setValue(record.data.summ_qntt);
				panel.down('[name=ttsm_amnt]').setValue(record.data.ttsm_amnt);
			mask.hide();
		}
	},

	//엑셀
	exportAction1 : function()  {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},
	exportAction2: function() {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportAction3: function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	},
	exportAction4: function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},

});
