Ext.define('module.custom.kitec.prod.prodplan.ProdPlan', { extend:'Axt.app.Controller',

	requires:[
		'module.custom.kitec.prod.prodplan.view.ProdPlanPopup',
		'lookup.popup.view.WkctCvicPopup',
		'lookup.popup.view.ItemPopup',
	],

	models	: [
		'module.custom.kitec.prod.prodplan.model.ProdPlan',
		'module.custom.kitec.prod.prodplan.model.ProdPlan2',
	],
	stores	: [
		'module.custom.kitec.prod.prodplan.store.ProdPlan',
		'module.custom.kitec.prod.prodplan.store.ProdPlan2',
	],
	views	: [
		'module.custom.kitec.prod.prodplan.view.ProdPlanLayout',
		'module.custom.kitec.prod.prodplan.view.ProdPlanLister',
		'module.custom.kitec.prod.prodplan.view.ProdPlanLister2',
		'module.custom.kitec.prod.prodplan.view.ProdPlanSearch',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodplan-layout #mainpanel'							: { tabchange : me.selectAction		},
			'module-prodplan-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			'module-prodplan-lister' : {
				selectionchange : me.attachRecord
			},

			'module-prodplan-lister button[action=insertAction]'		: { click : me.insertAction	},		// 추가

			'module-prodplan-lister2 button[action=modifyAction]'		: { click : me.modifyAction	},		// 수정
			'module-prodplan-lister2 button[action=deleteAction]'		: { click : me.deleteAction},		// 삭제

			'module-prodplan-lister button[action=exportAction]'		: { click : me.exportAction1},		// 엑셀
			'module-prodplan-lister2 button[action=exportAction]'		: { click : me.exportAction2},		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodplan-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodplan-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-prodplan-lister')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-prodplan-lister2')[0] },
		popup		: function () { return Ext.ComponentQuery.query('module-prodplan-popup')[0] },
	},


	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2= me.pocket.lister2(),
			search = me.pocket.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==0){
			search.down('[name=invc_date1]').show();
			search.down('[name=invc_date2]').show();
			search.down('[name=invc_date3]').hide();
			search.down('[name=invc_date4]').hide();

			if(param.invc_date1>param.invc_date2){
				Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id}));
			}
		}else if(tindex==1){
			search.down('[name=invc_date1]').hide();
			search.down('[name=invc_date2]').hide();
			search.down('[name=invc_date3]').show();
			search.down('[name=invc_date4]').show();

			if(param.invc_date3>param.invc_date4){
				Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id}));
			}
		}
	},

	//선택
	attachRecord:function( smodel, record ){
		var	me	= this,
			lister= smodel ? smodel.view.ownerCt : me.pocket.lister(),
			record= record ? record[0] : lister.getSelectionModel().getSelection()[0],
			store = lister.getStore()
			selection = lister.getSelectionModel().getSelection()[0]
		;
		store.each(function(findrecord){
			if(findrecord.get('cvic_idcd') == selection.data.cvic_idcd && findrecord.get('seqn') == selection.data.seqn){
				lister.getSelectionModel().select(findrecord.index, true);
			}
		});
	},

	//추가
	insertAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			max, invc_numb
		;

		resource.loadPopup({
			widget : 'module-prodplan-popup',
			params	: {
				invc_numb : invc_numb,
				lott_numb : max,
			},
		});
	},

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister2().getSelectionModel().getSelection()[0],
			popup  = me.pocket.popup()
		;

		resource.loadPopup({
			widget	: 'module-prodplan-popup',
			params	: {
				select : select
			},
		});

	},

	deleteAction:function() {
		var me = this,
			lister = me.pocket.lister2(),
			store  = lister.getStore(),
			records = lister.getSelectionModel().getSelection()
		;
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/kitec/prod/prodplan/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							pror_numb	: records[0].get('pror_numb')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
						store.reload();
					}
				});
			}
		});
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	},

});