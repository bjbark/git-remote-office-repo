Ext.define('module.custom.sjflv.eis.sjdashboard.SjdashBoard', { extend : 'Axt.app.Controller',
	requires: [
		 'module.common.view.SearchBar'
		,'module.common.view.SearchRowStatus'
		,'Axt.popup.view.ZipcodeSearch'
		,'Axt.popup.view.FileUpload',
	],
	models:[
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister1',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister2',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister3',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardProdLister1',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardProdLister2',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister1',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister2',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister3',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister4',
		'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardNotice',
	],
	stores:
	[
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardOrderLister1',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardOrderLister2',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardOrderLister3',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardProdLister1',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardProdLister2',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister1',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister2',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister3',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister4',
	 	'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardNotice',
	],
	views:[
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardSearch',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardLayout',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderLister1',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderLister2',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderLister3',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardProdLister1',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardProdLister2',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister1',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister2',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister3',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister4',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardEditor',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderEditor',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardNotice',
		'module.custom.sjflv.eis.sjdashboard.view.SjdashBoardNoticePopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.selectAction();
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-sjdashboard-layout button[action=selectAction]'		: { click : me.selectAction } ,
			'module-sjdashboard-layout #order_tab'						: { tabchange : me.orderChange } ,
			'module-sjdashboard-mtrl-lister4 button[action=exportAction]' : { click : me.exportAction },
			'module-sjdashboard-notice' : {
				itemdblclick: me.selectLister
			},
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search        : function () { return Ext.ComponentQuery.query('module-sjdashboard-search')[0] },
		layout        : function () { return Ext.ComponentQuery.query('module-sjdashboard-layout')[0] },
		notice        : function () { return Ext.ComponentQuery.query('module-sjdashboard-notice')[0] },
		popup         : function () { return Ext.ComponentQuery.query('module-sjdashboard-notice-popup')[0] },
		orderlister1  : function () { return Ext.ComponentQuery.query('module-sjdashboard-order-lister1')[0] },
		orderlister2  : function () { return Ext.ComponentQuery.query('module-sjdashboard-order-lister2')[0] },
		orderlister3  : function () { return Ext.ComponentQuery.query('module-sjdashboard-order-lister3')[0] },
		prodlister1   : function () { return Ext.ComponentQuery.query('module-sjdashboard-prod-lister1')[0] },
		prodlister2   : function () { return Ext.ComponentQuery.query('module-sjdashboard-prod-lister2')[0] },
		mtrllister1   : function () { return Ext.ComponentQuery.query('module-sjdashboard-mtrl-lister1')[0] },
		mtrllister2   : function () { return Ext.ComponentQuery.query('module-sjdashboard-mtrl-lister2')[0] },
		mtrllister3   : function () { return Ext.ComponentQuery.query('module-sjdashboard-mtrl-lister3')[0] },
		mtrllister4   : function () { return Ext.ComponentQuery.query('module-sjdashboard-mtrl-lister4')[0] },
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			orderlister1 = me.pocket.orderlister1(),
			prodlister1 = me.pocket.prodlister1(),
			prodlister2 = me.pocket.prodlister2(),
			mtrllister1 = me.pocket.mtrllister1(),
			mtrllister2 = me.pocket.mtrllister2(),
			mtrllister3 = me.pocket.mtrllister3(),
			mtrllister4 = me.pocket.mtrllister4(),
			notice = me.pocket.notice(),
			search = me.pocket.search()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		orderlister1.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		}, Ext.merge( search.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
		prodlister1.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		}, Ext.merge( search.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
		prodlister2.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		}, Ext.merge({ hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp , rtil_ddln_date:'90' } ));
		notice.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		},Ext.merge( search.getValues(), {stor_id : _global.stor_id  , empy_idcd : _global.login_pk }) )
		mtrllister1.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		},Ext.merge({stor_id : _global.stor_id  , empy_idcd : _global.login_pk }) )
		mtrllister2.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		},Ext.merge({stor_id : _global.stor_id  , empy_idcd : _global.login_pk , rtil_ddln_date:'90' }) )
		mtrllister3.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		},Ext.merge( {stor_id : _global.stor_id  , empy_idcd : _global.login_pk }) )
		mtrllister4.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
			}, scope:me
		},Ext.merge( {stor_id : _global.stor_id  , empy_idcd : _global.login_pk , invc_date : new Date().toISOString().slice(0, 10).replace(/-/g, '')}) )
		mask.hide();

	},
	orderChange:function(callbackFn) {
		var me = this,
			lister,
			tpanel = me.pocket.layout().down('#order_tab'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==0){
			lister = me.pocket.orderlister1();
		}else if(tindex==1){
			lister = me.pocket.orderlister2();
		}else if(tindex==2){
			lister = me.pocket.orderlister3();
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		lister.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge({ hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
	;
	},
	//팝업선택
	selectLister : function(grid, record) {
		var me = this,
			listermaster	= me.pocket.notice(),
			popup			= me.pocket.popup(),
			records		= listermaster.getSelectionModel().getSelection()[0]
		;
		resource.loadPopup({
			widget : 'module-sjdashboard-notice-popup',
			params : {
				invc_numb	:records.get('invc_numb'),
				pswd		:records.get('pswd'),
				ansr_yorn	:records.get('ansr_yorn'),
				emgc_yorn	:records.get('emgc_yorn'),
				scrt_yorn	:records.get('scrt_yorn'),
				ntce_cont	:records.get('ntce_cont'),
				ntce_eddt	:records.get('ntce_eddt'),
				ntce_stdt	:records.get('ntce_stdt'),
				dwup_empy_name	:records.get('dwup_empy_name'),
				sbsd_ttle	:records.get('sbsd_ttle'),
				ansr_cont	:records.get('ansr_cont'),
				ntce_ttle	:records.get('ntce_ttle'),
				dwup_date	:records.get('dwup_date'),
				user_memo	:records.get('user_memo'),
				_set		:'update'
			}
		});
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.mtrllister4().writer({enableLoadMask:true});
	}
});

