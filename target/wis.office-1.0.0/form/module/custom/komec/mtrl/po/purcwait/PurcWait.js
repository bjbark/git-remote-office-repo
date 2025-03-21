Ext.define('module.custom.komec.mtrl.po.purcwait.PurcWait', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrHjsysPopup',
		'lookup.popup.view.OrdrHjsysPopup2',
	],
	models	: [
		'module.custom.komec.mtrl.po.purcwait.model.PurcWait'
	],
	stores	: [
		'module.custom.komec.mtrl.po.purcwait.store.PurcWait',
	],
	views	: [
		'module.custom.komec.mtrl.po.purcwait.view.PurcWaitLayout',
		'module.custom.komec.mtrl.po.purcwait.view.PurcWaitLister',
		'module.custom.komec.mtrl.po.purcwait.view.PurcWaitLabelPopup',
		'module.custom.komec.mtrl.po.purcwait.view.PurcWaitSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-komec-purcwait-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			'module-komec-purcwait-layout #mainpanel'					: { tabchange : me.selectAction },
			// lister event
			'module-komec-purcwait-lister button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			'module-komec-purcwait-lister button[action=updateAction]'	: { click : me.updateAction },	// 저장
			'module-komec-purcwait-lister button[action=labelAction]'	: { click : me.labelAction },	// 라벨발행

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-komec-purcwait-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-komec-purcwait-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-komec-purcwait-lister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	
	updateAction:function(){		
		var	me = this,
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,			
			chk
		;		
		
		/*for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.divs_qntt == 0){
				chk = 1;				
				break;
			}
		}*/
		
		if(changes != 0){
			/*if(chk == 1) {
				Ext.Msg.alert("알림","라벨수량을 1개 이상 입력해주십시오.");
				return;
			}	*/		
			
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });			
				mask.show();			
				store.sync({
					success : function(operation){ },
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
						store.reload();
					}
				});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},
	
	labelAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			records = lister.getSelectionModel().getSelection(),			
			resId = _global.hq_id.toUpperCase(),
			chk
		;				
		
		if(!records || records.length<1){
			Ext.Msg.alert("알림","라벨발행할 수주목록을 선택해주십시오.");
			return;
		}
		
		for (var i = 0; i < records.length; i++) {
			if(records[i].get('divs_qntt') == 0){
				chk = 1;
				break;
			}
		}
		
		if(chk != 1 ) {
			var me = this
			resource.loadPopup({
				widget : 'module-komec-purcwait-label-popup'
			});		
		} else {
			Ext.Msg.alert("알림","라벨 수량이 0인 항목은 출력할 수 없습니다.");			
		}
	},
	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
});