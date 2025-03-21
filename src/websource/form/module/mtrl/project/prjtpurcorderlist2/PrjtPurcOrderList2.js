Ext.define('module.mtrl.project.prjtpurcorderlist2.PrjtPurcOrderList2', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.PjodPopup'

	],
	models	: [
		'module.mtrl.project.prjtpurcorderlist2.model.PrjtPurcOrderList2',
	],
	stores	: [
		'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2Master',
		'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2ListerDetail',
		'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2Lister2',
		'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2Lister3'

	],
	views	: [
		'module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2Layout',
		'module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2ListerMaster',
		'module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2ListerDetail',
		'module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2Lister2',
		'module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2Lister3',
		'module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtpurcorderlist2-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			'module-prjtpurcorderlist2-layout #mainpanel'						: { tabchange : me.selectAction },
			// lister master event
			'module-prjtpurcorderlist2-lister-master button[action=exportAction]': { click : me.exportAction},		// 엑셀
			// lister event
			'module-prjtpurcorderlist2-lister3 button[action=exportAction]'		: { click : me.exportAction	},		// 엑셀
			// lister2 event
			'module-prjtpurcorderlist2-lister2 button[action=exportAction]'		: { click : me.exportAction	},		// 엑셀
			// detail event
			'module-prjtpurcorderlist2-lister-detail button[action=exportAction]'	: { click : me.exportAction	},		// 엑셀
			'module-prjtpurcorderlist2-lister-detail button[action=updateAction]'	: { click : me.updateAction	},		// 저장
			'module-prjtpurcorderlist2-lister-detail button[action=deleteAction]'	: { click : me.deleteAction	},		// 저장
			//lister serch
			'module-prjtpurcorderlist2-lister-search button[action=selectAction2]': { click : me.selectAction2},		// 조회
			//listermaster
			'module-prjtpurcorderlist2-lister-master' : {
				itemdblclick : me.selectLister ,
				selectionchange : me.attachRecord
			},
			'module-prjtpurcorderlist2-lister3' : {
				itemdblclick : me.selectLister ,
				selectionchange : me.attachRecord
			},
			'module-prjtpurcorderlist2-lister2' : {
				itemdblclick : me.selectLister ,
				selectionchange : me.attachRecord
			}

		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-search') [0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-lister2')[0] },
		lister3		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-lister3')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-lister-detail')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist2-lister-search')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(param.invc_date1>param.invc_date2){
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if ( tindex == 0 ) {
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if ( tindex == 1 ) {
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 2){
			lister3.select({
				callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	//선택
	selectLister:function( grid, record ){
		if(record == null){
			return;
		}else{
			var me = this,
				listerdetail = me.pocket.listerdetail(),
				prnt_idcd ='',
				cstm_idcd = '',
				item_idcd = '',
				tpanel = me.pocket.layout().down('#mainpanel'),
				tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
				search  = me.pocket.search(),
				param   = search.getValues()
			;
			if(tindex==0){
				prnt_idcd = record.get('prnt_idcd');
			}else if( tindex==1){
				cstm_idcd = record.get('cstm_idcd');
			}else if( tindex==2){
				item_idcd = record.get('item_idcd');
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
			listerdetail.select({
				 callback : function(records, operation, success) {
						if (success) {
							mask.hide();
						} else {}
					}, scope : me
			},Ext.merge( param,{ prnt_idcd : prnt_idcd , cstm_idcd2 : cstm_idcd , item_idcd2 : item_idcd}));
		}
	},

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail = me.pocket.listerdetail()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			listermaster = me.pocket.listermaster(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			tindex		= tabPanel.items.indexOf(newCard)
		;
		listermaster.getStore().clearData();
		listermaster.getStore().loadData([],false);

		if(tindex == 0){
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 1){
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 2){
			lister3.select({
				callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},
	//TODO 업로드
	updateAction:function(){
		var me		= this,
			detail	= me.pocket.listerdetail(),
			master	= me.pocket.listermaster(),
			store	= detail.getStore(),
			masterStore	= master.getStore(),
			lister2Store	= me.pocket.lister2().getStore(),
			lister3Store	= me.pocket.lister3().getStore(),
			update	= store.getUpdatedRecords(),
			chk		= 0,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		for (var i = 0; i < update.length; i++) {
			var publ_date = update[i].get('publ_date');
			var expr_date = update[i].get('expr_date');
			var stot_dvcd = update[i].get('stot_dvcd');
			if(publ_date == "" || publ_date == null || publ_date == undefined){
				Ext.Msg.alert("알림","발행일자를 선택해주세요.");
				chk = 1;
				return;
			}
			if(expr_date == "" || expr_date == null || expr_date == undefined){
				Ext.Msg.alert("알림","만기일자를 선택해주세요.");
				chk = 1;
				return;
			}
			if(stot_dvcd == "" || stot_dvcd == null || stot_dvcd == undefined){
				Ext.Msg.alert("알림","결제구분을 선택해주세요.");
				chk = 1;
				return;
			}
		}
		if(chk){
			return;
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					if(tindex == 0 ){
						masterStore.reload();
					}else if(tindex==1){
						lister2Store.reload();
					}else if(tindex==2){
						lister3Store.reload();
					}
					mask.hide();
				}
			});
		}
	},
	//TODO 삭제
	deleteAction:function(){
		var me		= this,
			detail	= me.pocket.listerdetail(),
			records	= detail.getSelectionModel().getSelection();
			store	= detail.getStore(),
			chk		= 0;
		;
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					store.remove (records);
				}
			}
		});
	},
	// TODO 엑셀
	exportAction : function(field) {
		var me = this,
			lister
		;
		if(field.itemId == 'master'){
			lister = me.pocket.listermaster();
		}else if(field.itemId =='detail'){
			lister = me.pocket.listerdetail();
		}else if(field.itemId =='lister2'){
			lister = me.pocket.lister2();
		}else if(field.itemId =='lister3'){
			lister = me.pocket.lister3();
		}
		lister.writer({enableLoadMask:true});
	},
});