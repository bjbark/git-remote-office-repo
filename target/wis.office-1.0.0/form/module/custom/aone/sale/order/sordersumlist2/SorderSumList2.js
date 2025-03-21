Ext.define('module.custom.aone.sale.order.sordersumlist2.SorderSumList2', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WrhsPopup',
	],
	models	: [
		'module.custom.aone.sale.order.sordersumlist2.model.SorderSumList2',
		'module.custom.aone.sale.order.sordersumlist2.model.SorderSumList2Master',
	],
	stores	: [
		'module.custom.aone.sale.order.sordersumlist2.store.SorderSumList2',
		'module.custom.aone.sale.order.sordersumlist2.store.SorderSumList2Master',
	],
	views	: [
		'module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Layout',
		'module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Lister',
		'module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Lister2',
		'module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Lister3',
		'module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Lister4',
		'module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sordersumlist2-layout #mainpanel'							: { tabchange : me.mainTabChange },
			'module-sordersumlist2-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			// lister master event
			'module-sordersumlist2-lister-master button[action=deleteAction]'	: { click : me.deleteAction},		// 삭제
			'module-sordersumlist2-lister-master button[action=exportAction]'	: { click : me.exportAction1},		// 엑셀
			'module-sordersumlist2-lister-master button[action=labelAction]'	: { click : me.labelAction},		// 삼정라벨발행
			// lister detail event
			'module-sordersumlist2-lister-detail button[action=exportAction]'	: { click : me.exportAction2},		// 엑셀
			// lister event
			'module-sordersumlist2-lister button[action=updateAction]'		: { click : me.updateAction	},		// 저장
			'module-sordersumlist2-lister button[action=cancelAction]'		: { click : me.cancelAction	},		// 취소
			//lister serch
			'module-sordersumlist2-lister-search button[action=selectAction2]': { click : me.selectAction2},		// 조회
			//listermaster
			'module-sordersumlist2-lister-master' : {
				selectionchange	: me.attachRecord
			},
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-sordersumlist2-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-sordersumlist2-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-sordersumlist2-lister')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-sordersumlist2-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-sordersumlist2-lister-detail')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-sordersumlist2-lister-search')[0] },
		labelpopup  : function () { return Ext.ComponentQuery.query('module-sordersumlist2-label-popup')[0] }
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var  me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;

		switch (index) {
			case 1: {
				me.selectAction();
			};
			default : {
			}
		};
	},

	//조회
	selectAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
//		if(tindex==1){
//			if(param.invc_date1>param.invc_date2){
//				Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
//			}else{
//				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
//				mask.show();
//				listermaster.select({
//					callback:function(records, operation, success) {
//						if (success) {
//							listermaster.getSelectionModel().select(0);
//						} else { }
//						mask.hide();
//					}, scope:me
//				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id,mes_system_type:_global.options.mes_system_type}));
//			}
//		}else if(tindex==0){
//			Ext.Msg.alert("알림","입고등록의 조회를 클릭 해 주십시오.");
//		}
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.listersearch(),
			param  = search.getValues()
		;
		if(param.deli_date1>param.deli_date2 || param.invc_date1>param.invc_date2){
			Ext.Msg.alert("알림","일자를 다시입력해 주십시오.");
		}else{
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id,mes_system_type:_global.options.mes_system_type}) );
		}
	},

	cancelAction : function() {
		var me	= this,
		lister  = me.pocket.lister(),
		search  = me.pocket.search(),
		param   = search.getValues(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));

	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});