Ext.define('module.custom.kitec.prod.prodplanv3.ProdPlanV3', { extend:'Axt.app.Controller',
	requires:[
		''
	],
	models	: [
		'module.custom.kitec.prod.prodplanv3.model.ProdPlanV3'
	],
	stores	: [
		'module.custom.kitec.prod.prodplanv3.store.ProdPlanV3'
	],
	views	: [
		'module.custom.kitec.prod.prodplanv3.view.ProdPlanV3Layout',
		'module.custom.kitec.prod.prodplanv3.view.ProdPlanV3Lister',
		'module.custom.kitec.prod.prodplanv3.view.ProdPlanV3Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodplanv3-layout button[action=selectAction]'			: { click : me.selectAction		},	// 조회
			// lister event
			'module-prodplanv3-lister button[action=ProdPlanAction]'		: { click : me.ProdPlanAction	},	// 생산계획이관
			'module-prodplanv3-lister button[action=ProdTotalAction]'		: { click : me.ProdTotalAction	},	// 실적집계
			'module-prodplanv3-lister button[action=exportAction]'			: { click : me.exportAction		},	/* 엑셀 */
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodplanv3-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodplanv3-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-prodplanv3-lister')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister		= me.pocket.lister()
			search		= me.pocket.search(),
			param		= search.getValues()
		;
		if(param.plan_yymm==''|| param.plan_yymm == null){
			Ext.Msg.alert('알림','계획년월을 선택해주세요.');
		}else{
			if(param.plan_degr==''|| param.plan_degr==null){
				Ext.Msg.alert('알림','차수를 입력해주세요.');
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
		}
	},


	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});