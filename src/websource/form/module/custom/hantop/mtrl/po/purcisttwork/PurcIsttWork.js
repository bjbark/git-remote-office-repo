Ext.define('module.custom.hantop.mtrl.po.purcisttwork.PurcIsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.hantop.mtrl.po.purcisttwork.model.PurcIsttWork',
		'module.custom.hantop.mtrl.po.purcisttwork.model.PurcIsttWorkMaster',
		'module.custom.hantop.mtrl.po.purcisttwork.model.PurcIsttWorkDetail'
	],
	stores	: [
		'module.custom.hantop.mtrl.po.purcisttwork.store.PurcIsttWork',
		'module.custom.hantop.mtrl.po.purcisttwork.store.PurcIsttWorkMaster',
		'module.custom.hantop.mtrl.po.purcisttwork.store.PurcIsttWorkDetail'
	],
	views	: [
		'module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkLayout',
		'module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkListerMaster',
		'module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkListerDetail',
		'module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkLister',
		'module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkSearch',
		'module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkListerSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-purcisttwork-layout #mainpanel'							: { tabchange : me.mainTabChange },
			'module-purcisttwork-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			// lister master event
			'module-purcisttwork-lister-master button[action=deleteAction]'	: { click : me.deleteAction},		// 삭제
			'module-purcisttwork-lister-master button[action=exportAction]'	: { click : me.exportAction1},		// 엑셀
			// lister detail event
			'module-purcisttwork-lister-detail button[action=exportAction]'	: { click : me.exportAction2},		// 엑셀
			// lister event
			'module-purcisttwork-lister button[action=updateAction]'		: { click : me.updateAction	},		// 저장
			'module-purcisttwork-lister button[action=cancelAction]'		: { click : me.cancelAction	},		// 취소
			//lister serch
			'module-purcisttwork-lister-search button[action=selectAction2]': { click : me.selectAction2},		// 조회
			//listermaster
			'module-purcisttwork-lister-master' : {
				selectionchange	: me.attachRecord
			},
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-purcisttwork-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-purcisttwork-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister-detail')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister-search')[0] }
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var  me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;

		if(index == 0){
			me.pocket.search().down('[name=collapsed]').collapse();
		}else if (index == 1){
			me.pocket.search().down('[name=collapsed]').expand();
		}

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
		if(tindex==1){
			if(param.invc_date1>param.invc_date2){
				Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				listermaster.select({
					callback:function(records, operation, success) {
						if (success) {
							listermaster.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id}));
			}
		}else if(tindex==0){
			Ext.Msg.alert("알림","입고등록의 조회를 클릭 해 주십시오.");
		}
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
			}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id}) );
		}
	},

	updateAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_invc_numb = '',
			new_invc_numb2 = '',
			new_line_seqn,
			search = me.pocket.listersearch(),
			param  = search.getValues()
		;
		for(var i=0;i<changes;i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt == null ||lister.getStore().getUpdatedRecords()[i].data.istt_qntt==''){
				Ext.Msg.alert("알림","입고수량을 반드시 입력하십시오.");
				return;
			}
			if(param.wrhs_idcd == null ||param.wrhs_idcd==''){
				Ext.Msg.alert("알림","창고를 반드시 선택해주세요..");
				return;
			}
		};
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var x = 1;	//순번
			Ext.Ajax.request({
				url : _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'purc_istt_mast'
					})
				},
				async	: false,
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					new_invc_numb = result.records[0].seq;
				}
			});
			for(var i=0;i<changes;i++){
				lister.getStore().getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
				lister.getStore().getUpdatedRecords()[i].data.new_line_seqn = x++;
				lister.getStore().getUpdatedRecords()[i].data.invc_date = param.invc_date;
				lister.getStore().getUpdatedRecords()[i].data.wrhs_idcd = param.wrhs_idcd;

			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
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
	deleteAction : function() {
		var me	= this,
			lister	= me.pocket.listermaster(),
			records	= lister.getSelectionModel().getSelection(),
			store	= lister.getStore(),
			chk		= 0,
			msg		= ''
		;
		for (var i = 0; i < records.length; i++) {
			if(records[i].get('publ_date') || records[i].get('expr_date')){
				chk = 1;
				msg+= records[i].get('invc_numb')+" ( "+(i+1)+"번 )</br>";
			}
		}
		if(chk){
			Ext.Msg.alert('알림','입고번호</br>'+msg+'은(는) 매입처리되어 삭제할 수 없습니다.');
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					store.remove (records);
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					store.sync({
						success : function(operation){ },
						failure : function(operation){ },
						callback: function(operation){
							mask.hide();
							store.reload();
						}
					});
				}
			}
		});
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