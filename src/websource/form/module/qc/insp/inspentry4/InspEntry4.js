Ext.define('module.qc.insp.inspentry4.InspEntry4', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.OrdrPopup'
	],

	models:[
		'module.qc.insp.inspentry4.model.InspEntry4Master',
		'module.qc.insp.inspentry4.model.InspEntry4Lister1'
	],
	stores:[
		'module.qc.insp.inspentry4.store.InspEntry4Master',
		'module.qc.insp.inspentry4.store.InspEntry4Lister1'
	],
	views:
	[
		'module.qc.insp.inspentry4.view.InspEntry4Layout',
		'module.qc.insp.inspentry4.view.InspEntry4Search',
		'module.qc.insp.inspentry4.view.InspEntry4Master',
		'module.qc.insp.inspentry4.view.InspEntry4Lister1',
		'module.qc.insp.inspentry4.view.InspEntry4Popup',
		'module.qc.insp.inspentry4.view.InspEntry4Popup2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inspentry4-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			// editer event
//			'module-inspentry4-editor button[action=updateAction]'	: { click : me.updateAction },	// 저장
//			'module-inspentry4-editor button[action=cancelAction]'	: { click : me.cancelAction },	// 취소
			// lister event
			'module-inspentry4-lister1 button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-inspentry4-lister1 button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-inspentry4-lister1 button[action=printAction]'	: { click : me.printAction },	// 신규
			'module-inspentry4-lister button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
//			'module-inspentry4-lister button[action=passAction]'	: { click : me.passAction },	// 합격처리
			'module-inspentry4-lister button[action=writeAction]'	: { click : me.writeAction },	// 합격처리
			'module-inspentry4-lister button[action=testReportAction]'    : { click : me.testReportAction    },	// 시험성적서 발행
			'module-inspentry4-lister button[action=prodStandardAction]'  : { click : me.prodStandardAction  },	// 제품표준서 발행
			'module-inspentry4-lister1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-inspentry4-lister button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			// lister event
			'module-inspentry4-lister' : {
				selectionchange   : me.selectLister,												// 메뉴 선택시 이벤트
				sjungInspection   : me.sjungInspection,
				sjungAddInbound   : me.sjungAddInbound
			},
		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-inspentry4-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspentry4-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-inspentry4-lister')[0] },
		lister1: function () { return Ext.ComponentQuery.query('module-inspentry4-lister1')[0] },
		popup  : function () { return Ext.ComponentQuery.query('module-inspentry4-popup')[0] },
	},

	// [삼정, 삼정향료] 입고등록
	sjungAddInbound: function() {
		var me = this,
		master = me.pocket.master();
		
		if (master.getSelectionModel().getSelection()[0].get('judt_dvcd') == "") {
			Ext.Msg.alert('알림', '입고 등록 전에 검사실적 등록이 완료되어야 합니다.');
			return false;
		}
		if (master.getSelectionModel().getSelection()[0].get('istt_yorn') == "1") {
			Ext.Msg.alert('알림', '이미 입고 등록이 완료되었습니다.');
			return false;
		}

		resource.loadPopup({
			widget : 'module-inspentry4-popup',
			params : {
				master: master
			},
		});
	},

	// [삼정, 삼정향료] 검사실적등록
	sjungInspection: function() {
		var me = this,
		lister = me.pocket.master(),
		selected = lister.getSelectionModel().getSelection()[0];

		if (selected.get('judt_dvcd')) {
			Ext.Msg.alert('알림', '해당 데이터는 이미 등록 완료되었습니다.');
			return false;
		}

		if (!selected) {
			Ext.Msg.alert('알림', '등록할 데이터를 선택해주세요.');
			return false;
		}

		var popup = resource.loadPopup({
			widget	: 'module-inspentry4-popup2',
			params	: selected,
			master	: lister
		});
	},

	//조회
	selectAction:function() {
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues()
		;

		if(param.fr_dt == null || param.fr_dt <= param.to_dt || param.fr_dt2 <= param.to_dt2){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			master.select({
				callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
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
	},

//	//수정
//	modifyAction:function() {
//		var me = this,
//			master = me.pocket.lister(),
//			mrecord		= mrecord ? record[0] : master.getSelectionModel().getSelection()[0]
//		;
//		editor.modifyRecord({
//			caller	: me,
//			callback: function( results) {
//				if (results.success){
//					results.feedback( {success : true, visible : true } );
//				}
//			}
//		});
//	},
//
//	updateAction:function() {
//		var me = this,
//			master = me.pocket.lister(),
//			editor = me.pocket.editor(),
//			store  = lister.getStore()
//		;
//		editor.updateRecord({
//			store  : store,
//			action : Const.EDITOR.DEFAULT,
//			before : function(results, record) {
//				if (results.success) {
//					 { results.feedback({success : true }); }
//				}
//			},
//			callback : function(results, record ) {
//				if (results.success) {
//					store.sync({
//						success : function(operation){ results.feedback({success : true,  });},
//						failure : function(operation){ results.feedback({success : false,  });},
//						callback: function(operation){ results.callback({});}
//					} );
//				}
//			},
//			finished : function(results, record, operation){
//				if (results.success){
////					editor.collapse(false);
//					switch (operation) {
//					case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record );
//					break;
//				}
//				}
//			}
//		});
//	},
//
//	//취소
//	cancelAction:function() {
//		var me = this, editor = me.pocket.editor();
//		editor.getForm().reset();
//	},
//
//	//삭제
//	deleteAction:function() {
//		var me = this, editor = me.pocket.editor();
//		editor.deleteRecord({
//			lister		: me.pocket.lister(),
//			callback	: function(results, record, store) {
//				store.sync({
//					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
//					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
//					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
//				});
//			}
//		}, me);
//	},

	// 합격처리 팝업
	writeAction:function(field) {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			master = me.pocket.master(),
			popup  = me.pocket.popup(),
			search = me.pocket.search(),
			params = search.getValues(),
			pass   = select[0].data.pass_yorn,
			istt   = select[0].data.istt_yorn
		;

		// 삼정, 삼정향료 입고등록 처리
		if (_global.hq_id.toUpperCase()=='N1000SJUNG' || _global.hq_id.toUpperCase()=='N1000SJFLV') {
			master.fireEvent('sjungAddInbound');
			return false;
		}

		Ext.util.Cookies.get('wrhs_idcd', field.itemId);

		if(field.itemId=='action1' && pass=='1'){
			Ext.Msg.alert("알림","합격처리가 완료된 품목입니다.");
			return;
		}else if(field.itemId=='action2' && istt=='1'){
			Ext.Msg.alert("알림","입고등록이 완료된 품목입니다.");
			return;
		}


		if (select.length == 0) {
			Ext.Msg.alert("알림","출고내역을 선택해주십시오.");
		}else{
			var me = this
			resource.loadPopup({
				widget : 'module-inspentry4-popup',
				param : {
					wrhs_idcd : params.wrhs_idcd,
					itemId : field.itemId
				},
			});
		}return;
	},

	prodStandardAction:function() {
		var me = this,
			jrf = 'Sjflv_itemspec.jrf',
			resId = _global.hq_id.toUpperCase(),
			param = me.pocket.search().getValues(),
			lister = me.pocket.master(),
			select = lister.getSelectionModel().getSelection()[0],
			add='off'
		;
		var item_idcd;

		var revs_numb = '1';

		item_idcd = select.data.item_idcd;

		var arg =	'item_idcd~'+item_idcd+'~add~'+add+'~revs_numb~'+revs_numb+'~';
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'print','width=1400,height=800'),
		});

	},

	// specificaiton
	testReportAction:function() {
		var me = this,
			lister = me.pocket.master(),
			select = me.pocket.master().getSelectionModel().getSelection(),
			record = lister.getSelectionModel().getSelection(),
			jrf = 'sjflv_product_test_report2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
//		var a = "";

//		for(var i =0; i< record.length ; i++){
//			if(i==0){
//				a+= "[";
//			}
//				a+= '{\'item_idcd\':\''+record[i].get('item_idcd')+'\'}';
//			if(i != record.length -1){
//				a+=",";
//			}else{
//				a+="]";
//			}
//		}
//		var _param = '_param~{\'records\':'+a+'}~';
//		var arg = _param;
		var arg =	'pdsd_numb~'+record[0].data.pdsd_numb+'~invc_numb~'+record[0].data.invc_numb+'~acpt_numb~'+record[0].data.acpt_numb+'~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},

	//합격처리 확인시
//	passAction:function() {
//		var me = this,
//			select = me.pocket.master().getSelectionModel().getSelection(),
//			master = me.pocket.master(),
//			popup  = me.pocket.popup(),
//			search = me.pocket.search(),
//			params = search.getValues()
//		;
//		console.log(params);
//		if (select.length == 0) {
//			Ext.Msg.alert("알림","출고내역을 선택해주십시오.");
//		}else{
//			Ext.Msg.confirm("확인", "합격처리를 하시겠습니까?", function(button) {
//				if (button == 'yes') {
//					Ext.each(select, function(record) {
//						Ext.Ajax.request({
//							url		: _global.location.http() + '/qc/insp/inspentry4/set/pass.do',
//							params	: {
//								token : _global.token_id,
//								param : JSON.stringify({
//									invc_numb		: select[0].data.invc_numb,
//									invc_date		: select[0].data.invc_date,
//									stor_id			: _global.stor_id,
//									hqof_idcd		: _global.hqof_idcd
//								})
//
//							},
//							async	: false,
//							method	: 'POST',
//							success	: function(response, request) {
//								var result = Ext.decode(response.responseText);
//								if	(!result.success ){
//									Ext.Msg.error(result.message );
//									return;
//								} else {
//								}
//							},
//							failure : function(result, request) {
//							},
//							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//							}
//						});
//					})
//				}
//			});
//		}
//	},


	//엑셀
	exportAction : function(record){
		var value = record.itemId;
		if(value == 'master'){
			this.pocket.master().writer({enableLoadMask:true});
		}else if(value == 'lister1'){
			this.pocket.lister1().writer({enableLoadMask:true});
		}
//		else if(value == 'lister2'){
//			console.log('lister2')
//			this.pocket.lister2().writer({enableLoadMask:true});
//		}else if(value == 'lister3'){
//			console.log('lister3')
//			this.pocket.lister3().writer({enableLoadMask:true});
//		}else if(value == 'lister4'){
//			console.log('lister4')
//			this.pocket.lister4().writer({enableLoadMask:true});
//		}

	}
});
