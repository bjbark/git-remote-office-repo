Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.PurcIsttWork1', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup2',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1',
		'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1Master',
		'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1Bundle',
		'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1Detail'
	],
	stores	: [
		'module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1',
		'module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1Master',
		'module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1Bundle',
		'module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1Detail'
	],
	views	: [
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Layout',
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1ListerMaster',
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1ListerDetail',
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Lister',
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Search',
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Popup',
		'module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1ListerSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-purcisttwork1-layout #mainpanel'							: { tabchange : me.mainTabChange },
			'module-purcisttwork1-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			// lister master event
			'module-purcisttwork1-lister-master button[action=deleteAction]'	: { click : me.deleteAction},		// 삭제
			'module-purcisttwork1-lister-master button[action=exportAction]'	: { click : me.exportAction1},		// 엑셀
			'module-purcisttwork1-lister-master button[action=PrintAction]'		: { click : me.printAction},		// 수입검사필증발행
			// lister detail event
			'module-purcisttwork1-lister-detail button[action=exportAction]'	: { click : me.exportAction2},		// 엑셀
			// lister event
			'module-purcisttwork1-lister button[action=bundlePopup]'		: { click : me.bundlePopup},		// 번들팝업
			'module-purcisttwork1-lister button[action=updateAction]'		: { click : me.updateAction	},		// 저장
			'module-purcisttwork1-lister button[action=cancelAction]'		: { click : me.cancelAction	},		// 취소
			//lister serch
			'module-purcisttwork1-lister-search button[action=selectAction2]': { click : me.selectAction2},		// 조회
			//listermaster
			'module-purcisttwork1-lister-master' : {
				itemdblclick	: me.selectDetail ,
				selectionchange	: me.attachRecord
			},
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-purcisttwork1-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-purcisttwork1-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-purcisttwork1-lister') [0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-purcisttwork1-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-purcisttwork1-lister-detail')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-purcisttwork1-lister-search')[0] }
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var  me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;
		switch (index) {
			case 0: {
				me.selectAction();
			};
			case 1: {
				me.pocket.search().down('[name=detailSelect]').collapse();
			};

			default :

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
		if(tindex==0){
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
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
		}else{
			Ext.Msg.alert("알림","입고등록의 추가를 클릭 해 주십시오.");
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

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			listerdetail = me.pocket.listerdetail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listerdetail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
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
						lister.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	updateAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_invc_numb = '',
			new_invc_numb2 = '',
			store2	= Ext.ComponentQuery.query('module-purcisttwork1-lister') [0].getStore(),
			record	= undefined,
			total	= 0,
			invc_numb, line_seqn
		;
		for(var i=0;i<changes;i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt == null ||lister.getStore().getUpdatedRecords()[i].data.istt_qntt==''){
				Ext.Msg.alert("알림","입고수량을 반드시 입력하십시오.");
				return;
			}
		};
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			for(var i=0;i<changes;i++){
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
				lister.getStore().getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;

			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.loadData([],false);
					tpanel = me.pocket.layout().down('#mainpanel');
					tpanel.items.indexOf(tpanel.setActiveTab(0));
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
		lister.getStore().removeAll();
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

	// 수입검사필증발행
	printAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			record = listermaster.getSelectionModel().getSelection(),
			jrf = 'kitec_insp.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster.getSelectionModel().getSelection();
		if(!records || records.length<1) {
			Ext.Msg.alert("알림", "입고리스트 목록중 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'lott_numb\':\''+record[i].get('lott_numb')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},

	bundlePopup : function() { // 번들팝업
		var me = this;

		resource.loadPopup({
			widget : 'module-purcisttwork1-popup',
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