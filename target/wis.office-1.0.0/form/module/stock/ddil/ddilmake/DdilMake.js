Ext.define('module.stock.ddil.ddilmake.DdilMake', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WrhsZonePopup'
	],
	models	: [
		'module.stock.ddil.ddilmake.model.DdilMake1',
		'module.stock.ddil.ddilmake.model.DdilMake2'
	],
	stores	: [
		'module.stock.ddil.ddilmake.store.DdilMake1',
		'module.stock.ddil.ddilmake.store.DdilMake2'
	],
	views	: [
		'module.stock.ddil.ddilmake.view.DdilMakeLayout',
		'module.stock.ddil.ddilmake.view.DdilMakeLister1',
		'module.stock.ddil.ddilmake.view.DdilMakeLister2',
		'module.stock.ddil.ddilmake.view.DdilMakeSearch',
		'module.stock.ddil.ddilmake.view.DdilMakeComfirmPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-ddilmake-layout #mainpanel'					 : { tabchange : me.selectAction },
			'module-ddilmake-layout button[action=selectAction]' : { click : me.selectAction	},	// 조회
			// lister1 event
			'module-ddilmake-lister1 button[action=exportAction]': { click : me.exportAction1	},	// 엑셀
			'module-ddilmake-lister1 button[action=writeAction]' : { click : me.writeAction		},	// 실사대장 작성
			// lister2 event

			'module-ddilmake-lister2 button[action=okAction]'    : { click : me.okAction		},	// 결과등록
			'module-ddilmake-lister2 button[action=updateAction]': { click : me.updateAction	},	// 저장
			'module-ddilmake-lister2 button[action=cancelAction]': { click : me.cancelAction	},	// 취소
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-ddilmake-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-ddilmake-search') [0] },
		lister1		: function () { return Ext.ComponentQuery.query('module-ddilmake-lister1')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-ddilmake-lister2')[0] },
		popup		: function () { return Ext.ComponentQuery.query('module-ddilmake-comfirm-popup')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			lister = undefined,
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(param.invc_date == '' || param.invc_date == null){
			Ext.Msg.alert("알림","조사일자를 입력하여 주시기 바랍니다.");
			return;
		} else if(param.wrhs_idcd == '' || param.wrhs_idcd == null){
			Ext.Msg.alert("알림","창고를 선택하여 주시기 바랍니다.");
			return;
		} else {
			if(tindex == 0){
				lister = lister1;
			}else if(tindex == 1){
				lister = lister2;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select;
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}) );
		}
	},

	updateAction : function() {
		var me = this,
			lister2  = me.pocket.lister2(),
			changes  = lister2.getStore().getUpdatedRecords().length,
			change   = lister2.getStore().data.items,
			length   = lister2.getStore().data.items.length,
			remove   = lister2.getStore().removed.length	//삭제유무
		;
		if(length == 0){
			var modify = 'Y';
				item_idcd = ' ';
		}else {
			var modify   = change[length-1].get('modify'),		//수정유무
				item_idcd= change[length-1].get('item_idcd');	//품목유무
		}
		if(modify == 'Y' && item_idcd== ''){
			Ext.Msg.alert("알림","품목을 반드시 입력해주십시오.");
		}else{
			if(changes == 0){
				if (modify != 'Y'&& remove == 0) {
					Ext.Msg.alert("알림","변경된 사항이 없습니다.");
				}else{
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					var store = lister2.getStore();
					lister2.getStore().sync({
						success : function(operation){ },
						failure : function(operation){ },
						callback: function(operation){
							mask.hide();
						}
					});
				}
			}else {
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();
				var store = lister2.getStore();
				lister2.getStore().sync({
					success : function(operation){ },
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
					}
				});
			}
		}
	},

	writeAction : function() {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			select	= me.pocket.lister1().getSelectionModel().getSelection()[0],
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc_date == '' || param.invc_date == null){
			Ext.Msg.alert("알림","조사일자를 입력하여 주시기 바랍니다.");
			return;
		}else if(param.wrhs_idcd == '' || param.wrhs_idcd == null){
			Ext.Msg.alert("알림","창고를 선택하여 주시기 바랍니다.");
			return;
		}else {
			Ext.Msg.confirm("확인", "실사대장을 작성 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/ddil/ddilmake/set/write.do',
						params		: {
							token	: _global.token_id,
							param	: JSON.stringify({
								stor_id			: _global.stor_id,
								invc1_date		: param.invc_date,
								invc2_date		: param.invc_date,
								wrhs_idcd		: param.wrhs_idcd,
								stok_type_dvcd	: param.stok_type_dvcd,
								mes_system_type	: _global.options.mes_system_type
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							lister2.getStore().load();
							Ext.Msg.alert("알림","작성이 완료되었습니다.");
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister1().getStore().loadData([],true);
						}
					});
				}
			});
		}
	},

	cancelAction : function() {
		var me	= this,
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			changes = lister2.getStore().getUpdatedRecords().length,
			change   = lister2.getStore().data.items,
			length   = lister2.getStore().data.items.length,
			remove   = lister2.getStore().removed.length,
			modify   = change[length-1].get('modify')
		;
		if(changes == 0){
			if (modify != 'Y' && remove == 0) {
				Ext.Msg.alert("알림","변경된 사항이 없습니다.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.SELECT.mask });
				mask.show();
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.SELECT.mask });
			mask.show();
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	// 결과등록
	okAction : function() {
		var me = this,
			lister2	= me.pocket.lister2(),
			records	= lister2.getStore(),
			values	= me.pocket.search().getValues()
		;
		console.log();
		if (records.data.length<1) {
			Ext.Msg.alert("알림", "재고실사 조회 및 실사대장 등록 후 결과등록이 가능합니다.");
			return;
		}else{
			if(values.invc_date == '' || values.invc_date == null){
				Ext.Msg.alert("알림","조사일자를 입력하여 주시기 바랍니다.");
				return;
			}else{
				resource.loadPopup({
					widget : 'module-ddilmake-comfirm-popup',
					params : {
						invc_date : values.invc_date,
					}
				});
			}
		}
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	}
});