Ext.define('module.qc.anal.insplist2.InspList2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',

	],

	models:[
			'module.qc.anal.insplist2.model.InspList2Lister',
			'module.qc.anal.insplist2.model.InspList2Lister2',
			'module.qc.anal.insplist2.model.InspList2Lister3',
			'module.qc.anal.insplist2.model.InspList2Lister4'
	],

	stores:[
			'module.qc.anal.insplist2.store.InspList2Lister',
			'module.qc.anal.insplist2.store.InspList2Lister2',
			'module.qc.anal.insplist2.store.InspList2Lister3',
			'module.qc.anal.insplist2.store.InspList2Lister4'
	],

	views : [
			'module.qc.anal.insplist2.view.InspList2Layout',
			/* 현황 */
			'module.qc.anal.insplist2.view.InspList2Search',
			'module.qc.anal.insplist2.view.InspList2Lister',
			'module.qc.anal.insplist2.view.InspList2Lister2',
			'module.qc.anal.insplist2.view.InspList2Lister2_1',
			'module.qc.anal.insplist2.view.InspList2Lister3',
			'module.qc.anal.insplist2.view.InspList2Lister3_1',
			'module.qc.anal.insplist2.view.InspList2Lister4',
			'module.qc.anal.insplist2.view.InspList2Lister4_1'
			/* 작업 */
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-insplist2-layout button[action=selectAction]' : { click : me.selectAction		},		// 조회
			//'module-insplist2-layout #mainpanel'				  : { tabchange : me.mainTabChange	},
			//'module-insplist2-layout #mainpanel'				  : { tabchange : me.selectAction	},		// 검색창
			// lister event
			'module-insplist2-lister button[action=exportAction]' : { click : me.exportAction		},		// 엑셀
			//'module-insplist2-lister button[action=writeAction]' : { click : me.writeAction		},		// 생산지시서
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-insplist2-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-insplist2-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-insplist2-lister')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-insplist2-lister2')[0] },
		lister3		: function () { return Ext.ComponentQuery.query('module-insplist2-lister3')[0] },
		lister4		: function () { return Ext.ComponentQuery.query('module-insplist2-lister4')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister  = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			search  = me.pocket.search(),
			param	= search.getValues(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;

//		if(param.invc1_date==''||param.invc1_date==''){
//			Ext.Msg.alert("알림", "기간을 입력해주십시오.");
//		}else if(param.invc1_date > param.invc1_date){
//			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
//		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			if(tindex == 0){
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
			}else if(tindex == 1){
				mask.show();
				//lister = lister3;
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
				lister3.select({
					callback:function(records, operation, success) {
						if (success) {
							lister3.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
				lister4.select({
					callback:function(records, operation, success) {
						if (success) {
							lister4.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
			}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},



	});



