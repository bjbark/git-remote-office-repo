Ext.define('module.prod.order.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.LottPopupSjflv',
	],

	models:[
		'module.prod.order.workentry.model.WorkEntry',
		'module.prod.order.workentry.model.WorkEntryLister1',
		'module.prod.order.workentry.model.WorkEntryLister2',
		'module.prod.order.workentry.model.WorkEntryLister3',
		'module.prod.order.workentry.model.WorkEntryLister4',
		'module.prod.order.workentry.model.WorkEntryPopup1'
	],
	stores:[
		'module.prod.order.workentry.store.WorkEntryLister1',
		'module.prod.order.workentry.store.WorkEntryLister2',
		'module.prod.order.workentry.store.WorkEntryLister3',
		'module.prod.order.workentry.store.WorkEntryLister4',
		'module.prod.order.workentry.store.WorkEntry',
		'module.prod.order.workentry.store.WorkEntryPopup1',
		'module.prod.order.workentry.store.WorkEntryListerSjungProductHistory',
		'module.prod.order.workentry.store.WorkEntryListerSjungProductDaily',
	],
	views:
	[
		'module.prod.order.workentry.view.WorkEntryLayout',
		'module.prod.order.workentry.view.WorkEntrySearch',
		'module.prod.order.workentry.view.WorkEntryListerMaster',
		'module.prod.order.workentry.view.WorkEntryEditor',
		'module.prod.order.workentry.view.WorkEntryLister1',
		'module.prod.order.workentry.view.WorkEntryLister2',
		'module.prod.order.workentry.view.WorkEntryLister3',
		'module.prod.order.workentry.view.WorkEntryLister4',
		'module.prod.order.workentry.view.WorkEntryPopup1',
		'module.prod.order.workentry.view.WorkEntryListerSjung',
		'module.prod.order.workentry.view.WorkEntryListerSjungProductDaily',
		'module.prod.order.workentry.view.WorkEntryListerSjungProductHistory',
		'module.prod.order.workentry.view.WorkEntryStartPopup',
		'module.prod.order.workentry.view.WorkEntryEndPopup',
		'module.prod.order.workentry.view.WorkEntryMtrlPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-workentry-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-workentry-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-workentry-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-workentry-lister1 button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-workentry-lister1 button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-workentry-lister  button[action=exportAction]' : { click : me.exportAction },	// master엑셀
			'module-workentry-lister1 button[action=exportAction]' : { click : me.exportAction },	// lister1엑셀
			'module-workentry-lister2 button[action=exportAction]' : { click : me.exportAction },	// lister2엑셀
			'module-workentry-lister3 button[action=exportAction]' : { click : me.exportAction },	// lister3엑셀
			'module-workentry-lister4 button[action=exportAction]' : { click : me.exportAction },	// lister4엑셀
			'module-workentry-lister  button[action=deleteAction]' : { click : me.deleteAction },	// 삭제

			// 삼정 생산관리
			'module-workentry-lister-sjung button[action=facilConnAction]'     : { click : me.facilConnAction     },	// 설비연계
			'module-workentry-lister-sjung button[action=labelAction]'         : { click : me.labelAction         },	// 라벨발행
			'module-workentry-lister-sjung button[action=testReportAction]'    : { click : me.testReportAction    },	// 시험성적서 발행
			'module-workentry-lister-sjung button[action=prodStandardAction]'  : { click : me.prodStandardAction  },	// 제품표준서 발행
			'module-workentry-lister-sjung button[action=specificationAction]' : { click : me.specificationAction },	// specification

			// 삼정 생산 실적
			'module-workentry-lister-sjung-daily button[action=exportAction]' : { click : me.exportAction },	// lister4엑셀
			// 삼정 생산일보
			'module-workentry-lister-sjung-history button[action=exportAction]' : { click : me.exportAction },	// lister4엑셀
			// lister event
			'module-workentry-lister' : {
				selectionchange   : me.selectLister,												// 메뉴 선택시 이벤트
			}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout  : function () { return Ext.ComponentQuery.query('module-workentry-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-workentry-search')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-workentry-lister')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-workentry-lister1')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-workentry-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-workentry-lister3')[0] },
		lister4 : function () { return Ext.ComponentQuery.query('module-workentry-lister4')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-workentry-editor')[0] },
		upload  : function () { return Ext.ComponentQuery.query('module-workentry-upload')[0] },

		listerSjung        : function () { return Ext.ComponentQuery.query('module-workentry-lister-sjung')[0] },
		listerSjungHistory : function () { return Ext.ComponentQuery.query('module-workentry-lister-sjung-history')[0] },
		listerSjungDaily   : function () { return Ext.ComponentQuery.query('module-workentry-lister-sjung-daily')[0] },
		},


	//조회
	selectAction:function()
		{
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister(),
			lister3 = me.pocket.lister(),
			lister4 = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(_global.hq_id.toUpperCase() == 'N1000SJUNG' && tindex == '0'){
			lister = me.pocket.listerSjung()
		}else if(_global.hq_id.toUpperCase() == 'N1000SJUNG' && tindex == '1'){
			lister2 = me.pocket.listerSjungDaily()
		}else if(_global.hq_id.toUpperCase() == 'N1000SJUNG' && tindex == '2'){
			lister2 = me.pocket.listerSjungDaily()
		}


		if(param.fr_dt == null || param.fr_dt <= param.to_dt || param.fr_dt2 <= param.to_dt2){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
//					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , mes_system_type:_global.options.mes_system_type}) );
		}else{
			Ext.Msg.alert("알림", '지시일자와 납기일자를 확인해주세요');
		}

	},

	//선택
	selectLister:function( grid, record ){
		if(record[0] == null){
			return;
		}else{
			var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			record = lister.getSelectionModel().getSelection()[0]
			;
			record.data.prod_qntt=0;										//생산수량 0만들기
			editor.selectRecord({ lister : lister, record : record }, me);
			lister1.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
			lister2.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}

					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
			lister3.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}

					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
			lister4.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}

					}, scope : me
			}, { invc_numb : record.get('invc_numb') });

		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			mrecord		= mrecord ? record[0] : lister.getSelectionModel().getSelection()[0],
			editor = me.pocket.editor()
		;
		var dssedate = mrecord.data.dsse_date;
		editor.modifyRecord({
			caller	: me,
			callback: function( results) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}
			}
		});
	},

	updateAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					 { results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true,  });},
						failure : function(operation){ results.feedback({success : false,  });},
						callback: function(operation){ results.callback({});}
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
//					editor.collapse(false);
					switch (operation) {
					case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record );
					break;
				}
				}
			}
		});
	},

	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	labelAction: function(){
		var me = this,
		search	= me.pocket.search(),
		param   = search.getValues(),
		jrf	    = 'sjflv_label2.jrf',
		resId   = _global.hq_id.toUpperCase(),
		lister	= me.pocket.lister(),
		listerSjung	= me.pocket.listerSjung(),
		select = me.pocket.lister().getSelectionModel().getSelection(),
		select2 = me.pocket.listerSjung().getSelectionModel().getSelection()
		;
		var item_idcd;

		if(resId == 'N1000SJUNG'){
			item_idcd = select2[0].get('item_idcd');
			jrf = 'sjung_label.jrf';
		}else{
			item_idcd = lister[0].get('item_idcd');
		}

		var arg =	'_param~'+item_idcd+'~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
		});
	},

	prodStandardAction:function() {
		var me = this,
			jrf = 'Sjflv_itemspec.jrf',
			resId = _global.hq_id.toUpperCase(),
			param = me.pocket.search().getValues(),
			lister = me.pocket.lister2(),
			listerSjung	= me.pocket.listerSjung(),
			select = lister.getSelectionModel().getSelection()[0],
			select2 = me.pocket.listerSjung().getSelectionModel().getSelection(),
			add='off'
		;
		var item_idcd;

		var revs_numb = '1';

		if(resId == 'N1000SJUNG'){
			item_idcd = select2[0].get('item_idcd');
		}else{
			item_idcd = lister[0].get('item_idcd');
		}

		var arg =	'item_idcd~'+item_idcd+'~add~'+add+'~revs_numb~'+revs_numb+'~';
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'print','width=1400,height=800'),
		});

	},

	// specificaiton
	specificationAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			listerSjung	= me.pocket.listerSjung(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			select2 = me.pocket.listerSjung().getSelectionModel().getSelection(),
			record = lister.getSelectionModel().getSelection(),
			jrf = 'Sjflv_Specification.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var a = "";

		if(resId == 'N1000SJUNG'){
			for(var i =0; i< select2.length ; i++){
				if(i==0){
					a+= "[";
				}
					a+= '{\'item_idcd\':\''+select2[i].get('item_idcd')+'\'}';
				if(i != select2.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
		}else{
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a+= "[";
				}
					a+= '{\'item_idcd\':\''+record[i].get('item_idcd')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
		}

		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},

	//엑셀
	exportAction : function(record){
		var value = record.itemId;

		console.log(value);
		if(value == 'master'){
			this.pocket.lister().writer({enableLoadMask:true});
		}else if(value == 'lister1'){
			this.pocket.lister1().writer({enableLoadMask:true});
		}else if(value == 'lister2'){
			this.pocket.lister2().writer({enableLoadMask:true});
		}else if(value == 'lister3'){
			this.pocket.lister3().writer({enableLoadMask:true});
		}else if(value == 'lister4'){
			this.pocket.lister4().writer({enableLoadMask:true});
		}else if(value == 'listerSjung'){
			this.pocket.listerSjung().writer({enableLoadMask:true});
		}else if(value == 'listerSjungHistory'){
			this.pocket.listerSjungHistory().writer({enableLoadMask:true});
		}else if(value == 'listerSjungDaily'){
			this.pocket.listerSjungDaily().writer({enableLoadMask:true});
		}

	}
});
