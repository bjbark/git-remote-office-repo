Ext.define('module.stock.close.dailystockwork.DailyStockWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'
	],
	models	: [
		'module.stock.close.dailystockwork.model.DailyStockWork'
	],
	stores	: [
		'module.stock.close.dailystockwork.store.DailyStockWork'
	],
	views	: [
		'module.stock.close.dailystockwork.view.DailyStockWorkLayout',
		'module.stock.close.dailystockwork.view.DailyStockWorkLister',
		'module.stock.close.dailystockwork.view.DailyStockWorkSearch',
		'module.stock.close.dailystockwork.view.DailyStockWorkWritePopup',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// lister event
			'module-dailystockwork-lister button[action=writeAction]'  : { click : me.writeAction	},	// 재고현황작성
			'module-dailystockwork-lister button[action=updateAction]' : { click : me.updateAction	},	// 저장
			'module-dailystockwork-lister button[action=cancelAction]' : { click : me.cancelAction	},	// 취소
			'module-dailystockwork-lister button[action=deleteAction]' : { click : me.deleteAction	},	// 삭제
			'module-dailystockwork-lister button[action=insertAction]' : { click : me.insertAction	},	// 재고 입력
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout	: function () { return Ext.ComponentQuery.query('module-dailystockwork-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-dailystockwork-search') [0] },
		lister	: function () { return Ext.ComponentQuery.query('module-dailystockwork-lister')[0] },
		popup	: function () { return Ext.ComponentQuery.query('module-dailystockwork-write-popup')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			wkct_idcd = search.getValues('[name=wkct_idcd]')
		;
		if(wkct_idcd!=''){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select;
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			Ext.Msg.alert('알림','공정을 선택해주세요.');
		}
	},

	// 재고현황 작성
	writeAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			popup  = me.pocket.popup(),
			search = me.pocket.search(),
			params = search.getValues()
		;
		console.log(params);
		Ext.util.Cookies.get('wkct_idcd')

		if(params.wkct_name==''){
			Ext.Msg.show({ title: '알림', msg: '공정을 반드시 검색해주셔야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		}else{
			var err_msg = "";
			var records = lister.getSelectionModel().getSelection();
			var me = this
			resource.loadPopup({
				widget : 'module-dailystockwork-write-popup',
				param : {
					wkct_idcd : params.wkct_name
				},
			});
			//var numb = Ext.ComponentQuery.query('#wkct_idcd')[0].setValue(wkct_idcd);
		}return;
	},

	// 삭제
	deleteAction : function(){
		var me = this
			lister = me.pocket.lister(),
			store = lister.getStore(),
			search = Ext.ComponentQuery.query('module-dailystockwork-search')[0],
			invc_date = search.down('[name=invc_date]').getValue()
			select = lister.getSelectionModel().getSelection()[0]
		;

		if(select){
			Ext.Msg.confirm("확인","삭제하시겠습니까?",  function(button) {
				if(button === 'yes'){
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });

					mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/close/dailystockwork/delete.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								wkct_idcd		: select.data.wkct_idcd,
								invc_date		: Ext.Date.format(invc_date,'Ymd'),
								cstm_idcd		: select.data.cstm_idcd,
								item_idcd		: select.data.item_idcd,
							})
						},
						success : function(response, request) {
							store.load();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							mask.hide();
						}
					});

				}
			});
		}else{
			Ext.Msg.alert("알림","삭제하려는 재고현황을 선택하여 주시기 바랍니다.");
		}
	}
});