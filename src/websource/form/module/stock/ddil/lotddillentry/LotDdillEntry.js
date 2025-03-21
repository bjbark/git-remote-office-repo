Ext.define('module.stock.ddil.lotddillentry.LotDdillEntry', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup'
	],
	models	: [
		'module.stock.ddil.lotddillentry.model.LotDdillEntry1',
		'module.stock.ddil.lotddillentry.model.LotDdillEntry2'
	],
	stores	: [
		'module.stock.ddil.lotddillentry.store.LotDdillEntry1',
		'module.stock.ddil.lotddillentry.store.LotDdillEntry2'
	],
	views	: [
		'module.stock.ddil.lotddillentry.view.LotDdillEntryLayout',
		'module.stock.ddil.lotddillentry.view.LotDdillEntryLister1',
		'module.stock.ddil.lotddillentry.view.LotDdillEntryLister2',
		'module.stock.ddil.lotddillentry.view.LotDdillEntrySearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-lotddillentry-layout button[action=selectAction]' : { click : me.selectAction	},		// 조회
			// lister1 event
			'module-lotddillentry-lister1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-lotddillentry-lister1 button[action=writeAction]' : { click : me.writeAction	},		// 실사대장 작성
			'module-lotddillentry-lister2 button[action=okAction]'    : { click : me.okAction		},		// 결과등록
			// lister2 event
			'module-lotddillentry-lister2 button[action=updateAction]': { click : me.updateAction	},		// 저장
			'module-lotddillentry-lister2 button[action=cancelAction]': { click : me.cancelAction	},		// 취소
			'module-lotddillentry-layout #mainpanel'				  : { tabchange : me.mainTabChange },		// 탭이동
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout	: function () { return Ext.ComponentQuery.query('module-lotddillentry-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-lotddillentry-search') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-lotddillentry-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-lotddillentry-lister2')[0] }
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
		if(param.invc_date==''){
			Ext.Msg.alert("알림","조사일자를 입력해주십시오.");
//		}else if(param.wrhs_idcd == ''){
//			Ext.Msg.alert("알림","창고를 입력해주십시오.");
		}else{
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
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},
	mainTabChange : function(tabPanel, newCard, oldCard){
		var me		= this,
			tindex	= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			search	= me.pocket.search(),
			param	= search.getValues(),
			lister	= me.pocket.lister2()
		;
		if(tindex==1){
			if(param.invc_date!=''){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}else{
				tabPanel.setActiveTab(0);
				Ext.Msg.alert('알림','조사일자를 선택해주세요');
			}
		}

	},
	updateAction : function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			changes = lister2.getStore().getUpdatedRecords().length,
			change   = lister2.getStore().data.items,
			length   = lister2.getStore().data.items.length,
			modify   = change[length-1].get('modify'),		//수정유무
			item_idcd= change[length-1].get('item_idcd'),	//품목유무
			remove   = lister2.getStore().removed.length	//삭제유무
		;
		if(modify == 'Y' && item_idcd== ''){
			Ext.Msg.alert("알림","품목을 반드시 입력해주십시오.");
		}else{
			if(changes == 0){
				if (modify != 'Y' && remove == 0) {
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
			modify   = change[length-1].get('modify'),
			remove   = lister2.getStore().removed.length
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

	writeAction : function() {
		var me = this,
			lister1	= me.pocket.lister1(),
			select	= me.pocket.lister1().getSelectionModel().getSelection()[0],
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc_date){
			Ext.Msg.confirm("확인", "실사대장을 작성 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/ddil/lotddillentry/set/write.do',
						params		: {
							token	: _global.token_id,
							param	: JSON.stringify({
								stor_id		: _global.stor_id,
								invc_date	: param.invc_date,
								crte_idcd	: _global.login_pk
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
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
		}else{
			Ext.Msg.alert('알림','조사일자를 선택해주세요');
		}
	},
	okAction : function() {
		var me = this,
			lister1		= me.pocket.lister1(),
			lister2		= me.pocket.lister2(),
			tabPanel	= me.pocket.layout().down('#mainpanel')
			records		= lister2.getStore(),
			values		= me.pocket.search().getValues()
		;
		if (records.data.length<1) {
			Ext.Msg.alert("알림", "재고실사 조회 및 실사대장 등록 후 결과등록이 가능합니다.");
			return;
		}else{
			if(values.invc_date == '' || values.invc_date == null){
				Ext.Msg.alert("알림","조사일자를 입력하여 주시기 바랍니다.");
				return;
			}else{
				Ext.Msg.confirm("확인", "결과를 등록하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/stock/ddil/lotddillentry/set/write.do',
							params		: {
								token	: _global.token_id,
								param	: JSON.stringify({
									stor_id		: _global.stor_id,
									invc_date	: values.invc_date,
									crte_idcd	: _global.login_pk
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								lister1.getStore().reload();
								tabPanel.setActiveTab(0);
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
		}
	},
	// 엑셀
	exportAction : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	}
});